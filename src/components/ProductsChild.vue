<template>
  <div class="product-image-wrapper box">
    <div class="single-products">
      <div class="productinfo text-center">
        <router-link id="box" :to="{ path: `/productDetails/${eachData.id}` }">
          <img :src="server + images" alt="" class="p-image" />
          <h2>{{ eachData.price }}</h2>
          <p>{{ eachData.name }}</p>
        </router-link>
        <button
          @click="addToCart(eachData.id)"
          class="btn btn-default add-to-cart"
        >
          <i class="fa fa-shopping-cart"></i>Add to cart
        </button>
        <button @click="addToWishlist()" class="bg-transparent">
          <h2><i class="far fa-heart text-danger"></i></h2>
        </button>
      </div>
    </div>
  </div>

  <router-view></router-view>
</template>

<script>
import { mapState } from "vuex";
//import axios from "axios";
import { postwishlist } from "@/common/Service";
//import { mapActions } from "vuex";
// import store from "../store/store";
// import * as type from "../store/types";
export default {
  name: "Products Child",
  props: ["each"],
  data() {
    return {
      eachData: this.each,
      images: this.each.product_images[0].img_path,
      server: "http://127.0.0.1:8000/uploads/",
    };
  },
  computed: mapState({
    isLogin: (state) => state.isLogged,
    token: (state) => state.token,
    email: (state) => state.email,
    inCart() {
      return this.$store.getters.inCart;
    },
    numInCart() {
      return this.inCart.length;
    },
  }),
  // mounted: function mounted() {
  //   this.getData();
  // },
  methods: {
    // getData() {
    //   getProductImagessData(this.each.id).then((res) => {
    //     this.images = res.data.images[0].img_path;
    //   });
    // },
    // upsert(array, item) {
    //   const i = array.findIndex((_item) => _item.pid === item.pid);
    //   if (i > -1) {
    //     let data = array[i];
    //     data.quantity += 1;
    //   } else array.push(item);
    // },
    addToCart(id) {
      if (localStorage.getItem("myCart") != undefined) {
        let arr = JSON.parse(localStorage.getItem("myCart"));
        let obj = { pid: id, quantity: 1 };
        const i = arr.findIndex((_item) => _item.pid === obj.pid);
        if (i > -1) {
          let data = arr[i];
          data.quantity += 1;
          localStorage.setItem("myCart", JSON.stringify(arr));
          this.$toast.success("Quantity Updated");
        } else {
          arr.push(obj);
          localStorage.setItem("myCart", JSON.stringify(arr));
          this.$store.dispatch("addToCart", arr);
          this.$toast.success("Item Added");
        }
      } else {
        let arr = [];
        let obj = { pid: id, quantity: 1 };
        arr.push(obj);
        localStorage.setItem("myCart", JSON.stringify(arr));
        this.$store.dispatch("addToCart", arr);
        this.$toast.success("Item Added");
      }
    },
    addToWishlist() {
      let wishlistData = {
        user_email: this.email,
        pro_id: this.each.id,
        product_id: this.each.code,
        product_name: this.each.name,
        product_price: this.each.price,
        image_path: this.images,
      };
      postwishlist(wishlistData).then((res) => {
        console.log(res.data);
        if (res.data.err == 0) {
          this.$toast.success(res.data.message);
        } else {
          this.$toast.error(res.data.message);
        }
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
  height: 100px;
}
.p-c {
  background-color: orange;
}
</style>