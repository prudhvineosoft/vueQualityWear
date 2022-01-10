<template>
  <section>
    <Slider />
    <section>
      <div class="container">
        <div class="row">
          <Sidebar />
          <products :category="c_name" />
        </div>
      </div>
    </section>
  </section>
</template>

<script>
import Slider from "./includes/Slider.vue";
import Sidebar from "./includes/Sidebar.vue";
import Products from "./Products.vue";
export default {
  name: "Main",
  components: {
    Slider,
    Sidebar,
    Products,
  },
  data() {
    return {
      c_name: null,
    };
  },
  watch: {
    $route(to) {
      this.c_name = to.params.catName;
    },
  },
  created() {
    this.c_name = this.$route.params.catName;
  },
};
</script>

<style>
</style>