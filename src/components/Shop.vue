<template>
  <section>
    <Slider />
    <section>
      <div class="container">
        <div class="row">
          <Sidebar />
          <Products />
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
};
</script>

<style>
</style>