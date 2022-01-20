<template>
  <div class="container" v-if="data != null">
    <h1 class="text-center">{{ this.data.title }}</h1>
    <p>{{ this.data.description }}</p>
  </div>
</template>

<script>
import { getcmsbyId } from "@/common/Service";
export default {
  data() {
    return {
      cms: null,
      data: null,
    };
  },
  mounted() {
    this.getData();
  },
  watch: {
    $route(to) {
      this.cms = to.params.id;
    },
  },
  created() {
    this.cms = this.$route.params.id;
  },
  methods: {
    getData() {
      getcmsbyId(this.cms).then((res) => {
        this.data = res.data.cms;
      });
    },
  },
};
</script>

<style>
</style>