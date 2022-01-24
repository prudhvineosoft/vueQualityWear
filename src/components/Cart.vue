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
                <td class="description">name</td>
                <td class="price">Price</td>
                <td class="quantity">Quantity</td>
                <td class="total">Total</td>
                <td></td>
              </tr>
            </thead>
            <tbody>
              <tr v-for="data in productsData" :key="data.id">
                <each-cart-item :data="data" :method="getData" />
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </section>
    <!--/#cart_items-->

    <section id="do_action">
      <div class="container">
        <div class="heading">
          <h3>What would you like to do next?</h3>
          <p>
            Choose if you have a discount code or reward points you want to use
            or would like to estimate your delivery cost.
          </p>
        </div>
        <div class="row">
          <div class="col-sm-6">
            <div class="chose_area">
              <ul class="user_option">
                <li>
                  <input type="checkbox" v-model="checked" />
                  <label>Use Coupon Code</label>
                </li>
              </ul>
              <div v-if="checked">
                <select
                  class="form-control select"
                  v-model="selectedCoupon"
                  required
                  @change="changeLocation"
                >
                  <option selected>Choose Coupon</option>
                  <option
                    v-for="coupon in availableCoupons"
                    :key="coupon.id"
                    v-bind:value="coupon.id"
                  >
                    {{ coupon.code }}
                  </option>
                </select>
              </div>
              <a class="btn btn-default check_out" @click="addingCoupon()"
                >Continue</a
              >
            </div>
          </div>
          <div class="col-sm-6">
            <div class="total_area">
              <ul>
                <li>
                  Cart Sub Total <span>{{ this.subtotal }}</span>
                </li>
                <li v-if="couponAmmount == null">coupon <span>0 /-</span></li>
                <li v-if="couponAmmount != null">
                  coupon <span>{{ this.couponAmmount }} /-</span>
                </li>
                <li>Shipping Cost <span>Free</span></li>
                <li>
                  Total <span>{{ this.fullTotal }}</span>
                </li>
              </ul>
              <a class="btn btn-default check_out" @click="checkout"
                >Check Out</a
              >
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
  <!--/#do_action-->
</template>

<script>
import { getProductsDataById, coupon } from "@/common/Service";
import { mapState } from "vuex";
import EachCartItem from "./eachCartItem.vue";
import store from "../store/store";
import * as type from "../store/types";
export default {
  name: "Cart",
  components: { EachCartItem },
  data() {
    return {
      productsData: [],
      subtotal: null,
      server: "http://127.0.0.1:8000/uploads/",
      checked: false,
      availableCoupons: [],
      selectedCoupon: null,
      selectedCouponName: null,
      couponAmmount: null,
      fullTotal: null,
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
      return this.productsData.length;
    },
  }),
  mounted() {
    this.getData();
  },
  methods: {
    getData() {
      this.productsData = [];
      let dataFromlocal = JSON.parse(localStorage.getItem("myCart"));
      if (dataFromlocal != undefined) {
        dataFromlocal.forEach((element) => {
          getProductsDataById(element.pid).then((res) => {
            let productData = {
              pid: element.pid,
              name: res.data.productData.name,
              price: res.data.productData.price,
              quantity: res.data.productData.quantity,
              image: res.data.productData.product_images[0].img_path,
              applied_quantity: element.quantity,
              cartId: res.data.productData.id,
              total: res.data.productData.price * element.quantity,
            };
            this.productsData.push(productData);
            this.total();
          });
        });
      }
      // if (this.isLogin) {
      //   let dataFromlocal = JSON.parse(localStorage.getItem("myCart"));
      //   if (dataFromlocal != undefined) {
      //     dataFromlocal.forEach((element) => {
      //       userCartData(16).then((res) => {
      //         const arr = res.data.cartData;
      //         let obj = {
      //           product_id: element.pid,
      //           user_id: 20,
      //           quantity: element.quantity,
      //         };
      //         const i = arr.findIndex(
      //           (_item) => _item.product_id === obj.product_id
      //         );
      //         if (i > -1) {
      //           //let data = arr[i];
      //           let uq = { quantity: element.quantity };
      //           editUserCartData(res.data.cartData[i].id, uq);
      //         } else {
      //           addUserCartData(obj);
      //         }
      //       });
      //     });
      //   } else {
      //     console.log("no data");
      //   }
      // }
      store.dispatch({
        type: type.CartFinalData,
        cartFinalData: {
          cartData: this.productsData,
          couponAmmount: this.couponAmmount,
          fullTotal: this.fullTotal,
          subtotal: this.subtotal,
          selectedCouponName: this.selectedCouponName,
        },
      });
      this.getCoupon();
      this.selectedCoupon = null;
      this.couponAmmount = null;
    },
    total() {
      let fulltotal = 0;
      this.productsData.forEach((each) => {
        fulltotal += each.total;
      });
      this.subtotal = fulltotal;
      this.fullTotal = fulltotal;
      console.log(fulltotal);
    },
    checkout() {
      store.dispatch({
        type: type.CartFinalData,
        cartFinalData: {
          cartData: this.productsData,
          couponAmmount: this.couponAmmount,
          fullTotal: this.fullTotal,
          subtotal: this.subtotal,
          selectedCouponName: this.selectedCouponName,
        },
      });
      this.$router.push("/checkout");
    },
    getCoupon() {
      this.availableCoupons = [];
      coupon().then((res) => {
        console.log(res.data);
        let couponData = res.data.couponData;
        couponData.forEach((element) => {
          if (element.cart_value < this.subtotal) {
            this.availableCoupons.push(element);
          }
        });
      });
    },
    addingCoupon() {
      this.availableCoupons.forEach((each) => {
        if (each.id == this.selectedCoupon) {
          this.selectedCouponName = each.code;
          if (each.type == "percent") {
            let couponAmmount = Math.round((each.value / 100) * this.subtotal);
            this.couponAmmount = couponAmmount;
            this.fullTotal = this.fullTotal - this.couponAmmount;
          } else {
            let couponAmmount = each.value;
            this.couponAmmount = Math.round(couponAmmount);
            this.fullTotal = this.fullTotal - this.couponAmmount;
          }
        }
      });
    },
  },
};
</script>

<style>
.input-size {
  width: 50px;
}
.description {
  width: 300px !important;
}
.select {
  width: 200px;
  margin-left: 40px;
}
</style>