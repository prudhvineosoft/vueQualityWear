<template>
  <div>
    <section id="cart_items">
      <div class="container">
        <div class="breadcrumbs">
          <ol class="breadcrumb">
            <li><a href="#">Home</a></li>
            <li class="active">Shopping Cart</li>
          </ol>
        </div>
        <div class="table-responsive cart_info">
          <table class="table table-condensed">
            <thead>
              <tr class="cart_menu">
                <td class="image">Item</td>
                <td class="description"></td>
                <td class="price">Price</td>
                <td class="quantity">Add to cart</td>
                <td class="total">Remove</td>
                <td></td>
              </tr>
            </thead>
            <tbody>
              <tr class="cart-menu" v-for="cart in details" :key="cart.id">
                <td class="cart_product">
                  <img :src="server + cart.image_path" alt="" width="100" />
                </td>
                <td class="cart_description">
                  <h4>
                    <a href="">{{ cart.product_name }}</a>
                  </h4>
                  <p>Web ID: {{ cart.product_id }}</p>
                </td>
                <td class="cart_price">
                  <p>{{ cart.product_price }}</p>
                </td>
                <td>
                  <button
                    class="cart_quantity_delete btn btn-warning"
                    @click="addItem(cart.pro_id)"
                  >
                    Add to cart
                  </button>
                </td>
                <td class="cart_delete">
                  <button
                    class="cart_quantity_delete btn btn-danger"
                    @click="delItem(cart.id)"
                  >
                    Remove
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </section>
    <!--/#cart_items-->
  </div>
  <!--/#do_action-->
</template>

<script>
import { getWishlist, deletewishlist } from "@/common/Service.js";

export default {
  name: "Wishlist",
  data() {
    return {
      details: "",
      num: 0,
      uid: localStorage.getItem("uid"),
      server: "http://127.0.0.1:8000/uploads/",
    };
  },
  methods: {
    addItem(id) {
      this.$router.push(`/productdetails/${id}`);
    },
    delItem(id) {
      deletewishlist(id).then((res) => {
        if (res.data.err == 0) {
          this.$toast.success(res.data.message);
        }
        this.getData();
      });
    },
    getData() {
      getWishlist(this.uid).then((res) => {
        this.details = res.data.items;
      });
    },
  },
  mounted: function mounted() {
    this.getData();
  },
};
</script>
<style>
</style>