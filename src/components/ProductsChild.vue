<template>
  <router-link id="box" :to="{ path: `/productDetails/${eachData.id}` }">
    <div class="product-image-wrapper box">
      <div class="single-products">
        <div class="productinfo text-center">
          <img :src="server + images" alt="" class="p-image" />
          <h2>{{ eachData.price }}</h2>
          <p>{{ eachData.name }}</p>
          <a href="#" class="btn btn-default add-to-cart"
            ><i class="fa fa-shopping-cart"></i>Add to cart</a
          >
        </div>
        <div class="product-overlay p-o">
          <h1><i class="far fa-heart wishlist"></i></h1>
          <div class="overlay-content p-c">
            <h2>{{ eachData.price }}</h2>
            <p>{{ eachData.name }}</p>
            <a href="#" class="btn btn-default add-to-cart"
              ><i class="fa fa-shopping-cart"></i>Add to cart</a
            >
          </div>
        </div>
      </div>
    </div>
  </router-link>
  <router-view></router-view>
</template>

<script>
//import { mapState } from "vuex";
//import axios from "axios";
import { getProductImagessData } from "@/common/Service";
//import { mapActions } from "vuex";
// import store from "../store/store";
// import * as type from "../store/types";
export default {
  name: "Products Child",
  props: ["each"],
  data() {
    return {
      eachData: this.each,
      images: null,
      server: "http://127.0.0.1:8000/uploads/",
    };
  },
  mounted: function mounted() {
    this.getData();
  },
  methods: {
    getData() {
      getProductImagessData(this.each.id).then((res) => {
        this.images = res.data.images[0].img_path;
      });
    },
  },
};
</script>

<style>
.p-image {
  height: 250px;
}
.box {
  height: 420px;
  width: 100%;
  box-shadow: rgba(50, 50, 93, 0.25) 0px 50px 100px -20px,
    rgba(0, 0, 0, 0.3) 0px 30px 60px -30px,
    rgba(10, 37, 64, 0.35) 0px -2px 6px 0px inset;
  padding: 10px;
  border-radius: 10px;
}
.choose {
  margin-bottom: 10px;
}
.wishlist {
  font-size: 25px;
  color: red;
}
.p-o {
  background-color: transparent;
}
.p-c {
  background-color: orange;
}
</style>