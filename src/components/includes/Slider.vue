<template>
  <section class="container sliders">
    <div id="slider-carousel" class="carousel slide" data-ride="carousel">
      <ol class="carousel-indicators">
        <li
          v-for="(banner, index) in bannersArray"
          v-bind:key="index"
          data-target="#slider-carousel"
          :data-slide-to="index"
          v-bind:class="index == 0 ? 'active' : ''"
        ></li>
      </ol>

      <div class="carousel-inner">
        <div
          v-for="(banner, index) in bannersArray"
          v-bind:key="index"
          v-bind:class="index == 0 ? 'item active' : 'item'"
        >
          <div class="c-container">
            <img :src="server + banner.b_img_path" class="corosal" alt="" />
          </div>
        </div>
      </div>

      <a
        href="#slider-carousel"
        class="left control-carousel hidden-xs c-control c-height"
        data-slide="prev"
      >
        <i class="fa fa-angle-left"></i>
      </a>
      <a
        href="#slider-carousel"
        class="right control-carousel hidden-xs"
        data-slide="next"
      >
        <i class="fa fa-angle-right"></i>
      </a>
    </div>
  </section>
</template>

<script>
//import { mapState } from "vuex";
//import axios from "axios";
import { getBannersData } from "@/common/Service";
//import { mapActions } from "vuex";
// import store from "../store/store";
// import * as type from "../store/types";
export default {
  name: "Slider",
  data() {
    return {
      bannersArray: null,
      server: "http://127.0.0.1:8000/uploads/",
    };
  },
  mounted: function mounted() {
    this.getData();
  },
  methods: {
    getData() {
      getBannersData().then((res) => {
        this.bannersArray = res.data.bannerData;
      });
    },
  },
};
</script>

<style>
.corosal {
  width: 100%;
}
.item {
  padding-left: 0px;
}
.c-container {
  width: 100%;
}
.sliders {
  margin-bottom: 40px;
}
</style>