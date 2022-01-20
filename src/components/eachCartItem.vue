<template>
  <td class="cart_product">
    <img :src="server + image" width="120" alt="" />
  </td>
  <td class="cart_description">
    <h4>{{ name }}</h4>
  </td>
  <td class="cart_price">
    <p>{{ price }}</p>
  </td>
  <td class="cart_quantity">
    <div class="cart_quantity_button">
      <a class="cart_quantity_down" @click="addQty()">
        <i class="fa fa-plus btn btn-warning" aria-hidden="true"></i>
      </a>
      <input
        class="cart_quantity_input input-size"
        type="number"
        name="quantity"
        v-model="applied_quantity"
        autocomplete="off"
        size="1"
        min="1"
        :max="quantity"
      />
      <a class="cart_quantity_down" @click="subQty(pid)">
        <i class="fa fa-minus btn btn-warning" aria-hidden="true"></i>
      </a>
    </div>
  </td>
  <td class="cart_total">
    <p class="cart_total_price">{{ price * applied_quantity }}</p>
  </td>
  <td class="cart_delete">
    <a class="cart_quantity_delete" @click="delItem()"
      ><i class="fa fa-times"></i
    ></a>
  </td>
</template>

<script>
import { mapState } from "vuex";
import { userCartDelete } from "@/common/Service";
export default {
  //props: ["data"],

  props: {
    method: { type: Function },
    data: Object,
  },
  data() {
    return {
      pid: this.data.pid,
      name: this.data.name,
      price: this.data.price,
      quantity: this.data.quantity,
      image: this.data.image,
      applied_quantity: this.data.applied_quantity,
      total: this.data.price * this.data.applied_quantity,
      server: "http://127.0.0.1:8000/uploads/",
      cartId: this.data.cartId,
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
  methods: {
    addQty() {
      if (this.applied_quantity < this.quantity) {
        this.applied_quantity += 1;
        let arr = JSON.parse(localStorage.getItem("myCart"));
        let obj = { pid: this.pid, quantity: 1 };
        const i = arr.findIndex((_item) => _item.pid === obj.pid);
        if (i > -1) {
          let data = arr[i];
          data.quantity += 1;
          localStorage.setItem("myCart", JSON.stringify(arr));
          this.method();
          this.$toast.success("Quantity Updated");
        }
      }
    },
    subQty() {
      if (this.applied_quantity > 1) {
        this.applied_quantity -= 1;
        let arr = JSON.parse(localStorage.getItem("myCart"));
        let obj = { pid: this.pid, quantity: 1 };
        const i = arr.findIndex((_item) => _item.pid === obj.pid);
        if (i > -1) {
          let data = arr[i];
          data.quantity -= 1;
          localStorage.setItem("myCart", JSON.stringify(arr));
          this.method();
          this.$toast.success("Quantity Updated");
          console.log(this.alldata);
        }
      }
    },
    delItem() {
      if (localStorage.getItem("myCart") != undefined) {
        let arr = JSON.parse(localStorage.getItem("myCart"));
        let obj = { pid: this.data.pid, quantity: 1 };
        const i = arr.findIndex((_item) => _item.pid === obj.pid);
        if (i > -1) {
          let data = arr[i];
          arr.splice(data, 1);
          localStorage.setItem("myCart", JSON.stringify(arr));
          this.$store.dispatch("remItem", arr);
          this.method();
          this.$toast.success("Item Deleted");

          userCartDelete(this.cartId);
        }
      }
    },
  },
};
</script>

<style>
</style>