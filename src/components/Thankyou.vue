<template>
  <div class="bg-success">
    <div class="container">
      <div class="adjust">
        <div>
          <h1>Order Placed</h1>
          <h5>Your order is on the way</h5>
          <router-link to="/account" class="btn btn-success"
            >Go to orders</router-link
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  computed: mapState({
    inCart() {
      return [];
    },
    numInCart() {
      return 0;
    },
  }),
  created() {
    this.numInCart;
  },
};
</script>

<style>
.bg-success {
  background-image: url("../assets/6447.jpg");
  background-repeat: no-repeat;

  height: 60vh;
}
.adjust {
  display: flex;
  justify-content: center;
}
</style>