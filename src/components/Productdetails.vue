<template>
  <div class="container product-details">
    <div class="product-details p-details">
      <!--product-details-->
      <div class="col-sm-5">
        <div class="view-product">
          <div id="slider-carousel" class="carousel slide" data-ride="carousel">
            <ol class="carousel-indicators">
              <li
                v-for="(banner, index) in product_images"
                v-bind:key="index"
                data-target="#slider-carousel"
                :data-slide-to="index"
                v-bind:class="index == 0 ? 'active' : ''"
              ></li>
            </ol>

            <div class="carousel-inner">
              <div
                v-for="(banner, index) in product_images"
                v-bind:key="index"
                v-bind:class="index == 0 ? 'item active' : 'item'"
              >
                <div class="c-container">
                  <img :src="server + banner.img_path" class="corosal" alt="" />
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
        </div>
      </div>
      <div class="col-sm-7">
        <div class="product-information">
          <!--/product-information-->
          <img src="images/product-details/new.jpg" class="newarrival" alt="" />
          <h2>{{ name }}</h2>
          <p>{{ description }}</p>
          <img src="images/product-details/rating.png" alt="" />
          <span>
            <span class="ml-3">{{ price }}/-</span>
            <label>Quantity:</label>
            <input type="number" value="1" />
            <button
              type="button ml-3"
              @click="addToCart(eachProduct.id)"
              class="btn btn-fefault cart"
            >
              <i class="fa fa-shopping-cart"></i>
              Add to cart
            </button>
          </span>
          <h4>stock - {{ quantity }} - left</h4>
          <p><b>Availability:</b> In Stock</p>
          <p><b>Condition:</b> New</p>

          <a href=""
            ><img
              src="images/product-details/share.png"
              class="share img-responsive"
              alt=""
          /></a>
        </div>
        <!--/product-information-->
      </div>
    </div>
  </div>
</template>

<script>
import { getProductImagessData } from "@/common/Service";
import store from "../store/store";
import * as type from "../store/types";
import { mapState } from "vuex";
export default {
  data() {
    return {
      cname: null,
      name: null,
      description: null,
      price: null,
      quantity: null,
      id: null,
      product_images: null,
      server: "http://127.0.0.1:8000/uploads/",
    };
  },
  computed: mapState({
    eachProduct: (state) => state.eachProduct,
    eachProductImages: (state) => state.eachProductImages,
  }),
  mounted: function mounted() {
    this.getData();
  },
  methods: {
    getData() {
      getProductImagessData(this.cname).then((res) => {
        (this.name = res.data.productData.name),
          (this.description = res.data.productData.description),
          (this.price = res.data.productData.price),
          (this.quantity = res.data.productData.quantity),
          (this.quantity = res.data.productData.id),
          (this.product_images = res.data.productData.product_images);
        store.dispatch({
          type: type.EachProduct,
          eachProduct: res.data.productData,
        });
        store.dispatch({
          type: type.EachProductImages,
          eachProductImages: res.data.images,
        });
      });
    },
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
  },
  watch: {
    $route(to) {
      this.cname = to.params.id;
    },
  },
  created() {
    this.cname = this.$route.params.id;
  },
};
</script>

<style>
.ml-3 {
  margin-left: 30px;
}
.product-details {
  display: flex;
  justify-content: center;
}
</style>