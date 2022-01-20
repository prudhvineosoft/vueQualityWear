<template>
  <div class="container">
    <section id="cart_items">
      <div class="col-sm-6">
        <div class="row">
          <div class="col-sm-12">
            <h3 class="text-center">Total Bill</h3>
            <div class="total_area">
              <ul class="box-shadow p-3">
                <li class="box-shadow">
                  Cart Sub Total <span>{{ cartFinalData.subtotal }} /-</span>
                </li>
                <li
                  class="box-shadow"
                  v-if="cartFinalData.couponAmmount == null"
                >
                  coupon <span>0 /-</span>
                </li>
                <li
                  class="box-shadow"
                  v-if="cartFinalData.couponAmmount != null"
                >
                  coupon <span>{{ cartFinalData.couponAmmount }} /-</span>
                </li>
                <li class="box-shadow">Shipping Cost <span>Free .</span></li>
                <li class="box-shadow">
                  Total <span>{{ cartFinalData.fullTotal }} /-</span>
                </li>
              </ul>
            </div>
          </div>
          <div class="col-12">
            <h3 class="text-center">Select Payment method</h3>
            <div class="box-shadow">
              <div class="p-3">
                <label class="btn btn-primary active" for="yes">
                  <input type="radio" id="yes" value="COD" v-model="picked" />
                  Cash on Delivary</label
                >
                <label class="btn btn-primary" for="no">
                  <input type="radio" id="no" value="Online" v-model="picked" />
                  Online</label
                >
              </div>
            </div>
            <label class="text-danger ml-3" v-if="PaymentCheck">
              please Seletc Payment Method
            </label>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col-sm-6">
          <h3 class="text-center">Addresses</h3>
          <div class="box-shadow p-3">
            <div class="row">
              <div
                class=""
                v-for="eachAddress in userAddress"
                :key="eachAddress.id"
              >
                <input
                  type="radio"
                  :id="eachAddress.id"
                  :value="eachAddress.id"
                  v-model="addressId"
                />
                <label :for="eachAddress.id">
                  <div class="col-sm-12 address-box">
                    <h5>
                      {{ eachAddress.name }} , {{ eachAddress.street }} ,
                      {{ eachAddress.city }} , {{ eachAddress.landmark }} ,
                      State:- {{ eachAddress.state }} , Pincode:-
                      {{ eachAddress.pin }} , phone:- {{ eachAddress.phone }}
                    </h5>
                  </div>
                </label>
                <!-- <div class="address-box col-sm-2 ml-1">
                <h4 class="d-flex">
                  <button
                    class="bg-transparent"
                    type="button"
                    data-toggle="modal"
                    data-target=".bs-example-modal-lg"
                    id="myModel"
                    @click="editAddress(eachAddress.id)"
                  >
                    <i class="far fa-edit text-primary"></i>
                  </button>
                  <button
                    class="bg-transparent"
                    @click="deleteAddress(eachAddress.id)"
                  >
                    <i class="fas fa-trash text-danger"></i>
                  </button>
                </h4>
              </div> -->
              </div>

              <!-- <button type="submit" class="btn btn-default update">
            Add Address
          </button> -->
            </div>
          </div>
        </div>
        <label class="text-danger ml-3" v-if="addressCheck">
          please Seletc Address
        </label>
      </div>
      <div class="row text-center">
        <a class="btn btn-default check_out" @click="place">Place Order</a>
      </div>
      <div class="" v-if="cartFinalData.cartData != null">
        <h3 class="">Items</h3>
        <div class="table-responsive cart_info">
          <table class="table table-condensed">
            <thead>
              <tr class="cart_menu">
                <td class="image">Item</td>
                <td class="description">name</td>
                <td class="price">Price</td>
                <td class="quantity">Quantity</td>
                <td class="total">Total</td>
              </tr>
            </thead>
            <tbody>
              <tr v-for="data in cartFinalData.cartData" :key="data.id">
                <td class="cart_product">
                  <img :src="server + data.image" width="120" alt="" />
                </td>
                <td class="cart_description">
                  <h4>{{ data.name }}</h4>
                </td>
                <td class="cart_price">
                  <p>{{ data.price }}</p>
                </td>
                <td class="cart_quantity">
                  <h4>{{ data.applied_quantity }}</h4>
                </td>
                <td class="cart_total">
                  <p class="cart_total_price">
                    {{ data.price * data.applied_quantity }}
                  </p>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </section>
  </div>
  <!--/#cart_items-->
</template>

<script>
import { showUserData, makeOrder } from "@/common/Service";
import { mapState } from "vuex";

export default {
  name: "Checkout",
  data() {
    return {
      server: "http://127.0.0.1:8000/uploads/",
      userAddress: null,
      userData: null,
      picked: null,
      addressId: null,
      addressCheck: false,
      PaymentCheck: false,
    };
  },
  computed: mapState({
    isLogin: (state) => state.isLogged,
    token: (state) => state.token,
    email: (state) => state.email,
    cartFinalData: (state) => state.cartFinalData,
    productsData: (state) => state.productsData,
    inCart() {
      return this.$store.getters.inCart;
    },
    numInCart() {
      return 0;
    },
  }),
  created() {
    window.onbeforeunload = function () {
      return "Are you really want to perform the action?";
    };
  },
  mounted() {
    this.getData();
  },
  methods: {
    getData() {
      showUserData(this.email, "hai", this.token)
        .then((res) => {
          console.log(res.data);
          this.userData = res.data.udUser;
          this.userAddress = res.data.udAddress;
        })
        .catch((err) => {
          console.log("SOmething Wrong " + err);
        });
    },
    place() {
      if (this.addressId != null) {
        this.addressCheck = false;
        if (this.picked != null) {
          this.PaymentCheck = false;
          this.addressCheck = false;
          let random = parseInt(Math.random() * 1000000000, 10);
          this.cartFinalData.cartData.forEach((element) => {
            let sendOrderDetails = {
              user_id: this.email,
              order_id: random,
              product_id: element.pid,
              payment_method: this.picked,
              address_id: this.addressId,
              coupon_code: this.cartFinalData.selectedCouponName,
              order_total: this.cartFinalData.fullTotal,
            };
            console.log(sendOrderDetails);
            makeOrder(sendOrderDetails).then((res) => {
              console.log(res.data);
              if (res.data.err == 0) {
                this.$toast.success("success");
                localStorage.removeItem("myCart");
                this.$router.push("/success");
                this.$store.dispatch("remItem", 0);
              }
            });
          });
        } else {
          this.PaymentCheck = true;
          this.$toast.warning("please select Payment");
        }
      } else {
        this.addressCheck = true;
        this.$toast.warning("please select Address");
      }
    },
  },
};
</script>

<style>
.box-shadow {
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
}
.p-3 {
  padding: 30px;
}
.active {
  background-color: rgb(32, 185, 83) !important;
}
</style>