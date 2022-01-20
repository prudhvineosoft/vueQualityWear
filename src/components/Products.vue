<template>
  <section>
    <div class="col-sm-9 padding-right">
      <div class="features_items">
        <!--features_items-->

        <h2 class="title text-center">Features Items</h2>
        <div
          class="col-sm-4"
          v-for="product in filterProducts"
          :key="product.id"
        >
          <productsChild :each="product" />
        </div>
      </div>
      <!--features_items-->

      <!--/category-tab-->

      <div class="recommended_items">
        <!--recommended_items-->
        <h2 class="title text-center">recommended items</h2>

        <div
          id="recommended-item-carousel"
          class="carousel slide"
          data-ride="carousel"
        >
          <div class="carousel-inner">
            <div class="item active">
              <div class="col-sm-4">
                <div class="product-image-wrapper">
                  <div class="single-products">
                    <div class="productinfo text-center">
                      <img src="images/home/recommend1.jpg" alt="" />
                      <h2>$56</h2>
                      <p>Easy Polo Black Edition</p>
                      <a href="#" class="btn btn-default add-to-cart"
                        ><i class="fa fa-shopping-cart"></i>Add to cart</a
                      >
                    </div>
                  </div>
                </div>
              </div>
              <div class="col-sm-4">
                <div class="product-image-wrapper">
                  <div class="single-products">
                    <div class="productinfo text-center">
                      <img src="images/home/recommend2.jpg" alt="" />
                      <h2>$56</h2>
                      <p>Easy Polo Black Edition</p>
                      <a href="#" class="btn btn-default add-to-cart"
                        ><i class="fa fa-shopping-cart"></i>Add to cart</a
                      >
                    </div>
                  </div>
                </div>
              </div>
              <div class="col-sm-4">
                <div class="product-image-wrapper">
                  <div class="single-products">
                    <div class="productinfo text-center">
                      <img src="images/home/recommend3.jpg" alt="" />
                      <h2>$56</h2>
                      <p>Easy Polo Black Edition</p>
                      <a href="#" class="btn btn-default add-to-cart"
                        ><i class="fa fa-shopping-cart"></i>Add to cart</a
                      >
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="item">
              <div class="col-sm-4">
                <div class="product-image-wrapper">
                  <div class="single-products">
                    <div class="productinfo text-center">
                      <img src="images/home/recommend1.jpg" alt="" />
                      <h2>$56</h2>
                      <p>Easy Polo Black Edition</p>
                      <a href="#" class="btn btn-default add-to-cart"
                        ><i class="fa fa-shopping-cart"></i>Add to cart</a
                      >
                    </div>
                  </div>
                </div>
              </div>
              <div class="col-sm-4">
                <div class="product-image-wrapper">
                  <div class="single-products">
                    <div class="productinfo text-center">
                      <img src="images/home/recommend2.jpg" alt="" />
                      <h2>$56</h2>
                      <p>Easy Polo Black Edition</p>
                      <a href="#" class="btn btn-default add-to-cart"
                        ><i class="fa fa-shopping-cart"></i>Add to cart</a
                      >
                    </div>
                  </div>
                </div>
              </div>
              <div class="col-sm-4">
                <div class="product-image-wrapper">
                  <div class="single-products">
                    <div class="productinfo text-center">
                      <img src="images/home/recommend3.jpg" alt="" />
                      <h2>$56</h2>
                      <p>Easy Polo Black Edition</p>
                      <a href="#" class="btn btn-default add-to-cart"
                        ><i class="fa fa-shopping-cart"></i>Add to cart</a
                      >
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <a
            class="left recommended-item-control"
            href="#recommended-item-carousel"
            data-slide="prev"
          >
            <i class="fa fa-angle-left"></i>
          </a>
          <a
            class="right recommended-item-control"
            href="#recommended-item-carousel"
            data-slide="next"
          >
            <i class="fa fa-angle-right"></i>
          </a>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { mapState } from "vuex";
//import axios from "axios";
import { getProductsData } from "@/common/Service";
import ProductsChild from "./ProductsChild.vue";
//import { mapActions } from "vuex";
import store from "../store/store";
import * as type from "../store/types";
export default {
  components: { ProductsChild },
  name: "Products",
  props: ["category"],
  data() {
    return {
      //category: this.each,
      ProductsArray: null,
      server: "http://127.0.0.1:8000/uploads/",
    };
  },
  computed: mapState({
    products: (state) => state.products,
    //category: (state) => state.category,
    filterProducts: function () {
      return this.filterProductsByCategory(this.ProductsArray);
    },
  }),
  mounted: function mounted() {
    this.getData();
  },
  methods: {
    getData() {
      getProductsData().then((res) => {
        this.ProductsArray = res.data.productsData;
        store.dispatch({
          type: type.Products,
          products: res.data.productsData,
        });
      });
    },
    filterProductsByCategory: function (products) {
      if (products == undefined) {
        this.getData();
      } else if (this.category == "all") {
        return this.products;
      } else {
        return this.category
          ? products.filter((product) => !product.c_name.indexOf(this.category))
          : products;
      }
    },
  },
};
</script>

<style>
</style>