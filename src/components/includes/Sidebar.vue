<template>
  <div class="col-sm-3">
    <div class="left-sidebar">
      <h2>Category</h2>
      <div class="panel-group category-products" id="accordian">
        <!--category-productsr-->
        <div class="panel panel-default">
          <div class="panel-heading category">
            <h4 class="panel-title">
              <router-link
                id="box"
                :to="{ path: `/category/` }"
                class="sidebar-link"
              >
                All Products
              </router-link>
            </h4>
          </div>
        </div>

        <div
          class="panel panel-default"
          v-for="category in categoryArray"
          :key="category.id"
        >
          <div class="panel-heading category">
            <h4 class="panel-title">
              <router-link
                id="box"
                :to="{ path: `/category/${category.c_name}` }"
                class="sidebar-link"
              >
                {{ category.c_name }}
              </router-link>
            </h4>
          </div>
        </div>
      </div>
      <!--/category-products-->

      <!--/brands_products-->

      <div class="shipping text-center">
        <!--shipping-->
        <img src="images/home/shipping.jpg" alt="" />
      </div>
      <!--/shipping-->
    </div>
  </div>
</template>
<script>
import { mapState } from "vuex";
//import axios from "axios";
import { getCategoryData } from "@/common/Service";
//import { mapActions } from "vuex";
import store from "../../store/store";
import * as type from "../../store/types";
export default {
  name: "Sidebar",
  data() {
    return {
      categoryArray: null,
      server: "http://127.0.0.1:8000/uploads/",
    };
  },
  computed: mapState({
    category: (state) => state.category,
  }),
  mounted: function mounted() {
    this.getData();
  },

  methods: {
    getData() {
      getCategoryData().then((res) => {
        this.categoryArray = res.data.categoryData;
      });
    },
    changeproducts(category_name) {
      store.dispatch({
        type: type.Category,
        category: category_name,
      });
    },
  },
};
</script>

<style>
.category {
  background-color: rgba(102, 153, 136, 0.212) !important ;
}
.sidebar-link {
  background-color: transparent;
  border: none;
}
</style>