<template>
  <div class="container">
    <h1 class="text-center">Account</h1>
    <!-- user details -->
    <div class="row">
      <div class="col-sm-4 account-box">
        <div class="row" v-if="userData != null">
          <div class="col-sm-12">.</div>
          <div class="col-sm-6"><h4>Name :</h4></div>
          <div class="col-sm-6">
            <h4>{{ userData.name }}</h4>
          </div>
          <div class="col-sm-6"><h4>Email :</h4></div>
          <div class="col-sm-6">
            <h4>{{ userData.email }}</h4>
          </div>
          <div class="col-sm-6"><h4>User ID :</h4></div>
          <div class="col-sm-6">
            <h4>{{ userData.id }}</h4>
          </div>
        </div>
        <div class="col-sm-12">
          <button
            type="button"
            class="btn btn-primary"
            data-toggle="modal"
            data-target=".bs-example-modal-sm"
          >
            Edit Password
          </button>
        </div>
        <div
          class="modal fade bs-example-modal-sm"
          tabindex="-1"
          role="dialog"
          aria-labelledby="myLargeModalLabel"
        >
          <div class="modal-dialog modal-sm" role="document">
            <div class="modal-content">
              <form
                @submit.prevent="changePassword"
                class="address-form fom-control"
              >
                <button
                  type="button"
                  class="close"
                  data-dismiss="modal"
                  aria-label="Close"
                >
                  <span aria-hidden="true">&times;</span>
                </button>
                <div class="form-group">
                  <label for="street">Previous Password</label>
                  <input
                    type="text"
                    class="form-control"
                    name="ppassword"
                    placeholder="previous password"
                    v-model="password.ppassword"
                    required
                  />
                </div>
                <div class="form-group">
                  <label for="street">New Password</label>
                  <input
                    type="text"
                    class="form-control"
                    name="password"
                    placeholder="new password"
                    v-model="password.npassword"
                    required
                  />
                </div>
                <div class="form-group">
                  <label for="street">Conform New Password</label>
                  <input
                    type="text"
                    class="form-control"
                    name="copassword"
                    placeholder="Confirm password"
                    v-model="password.copassword"
                    required
                  />
                </div>
                <button type="submit" class="btn btn-warning">Submit</button>
              </form>
            </div>
          </div>
        </div>
      </div>

      <!-- user Address -->
      <div class="col-sm-6 spacing">
        <h3>Addresses</h3>
        <div class="row">
          <div
            class=""
            v-for="eachAddress in userAddress"
            :key="eachAddress.id"
          >
            <div class="col-sm-9 address-box">
              <h5>
                {{ eachAddress.name }} , {{ eachAddress.street }} ,
                {{ eachAddress.city }} , {{ eachAddress.landmark }} , State:-
                {{ eachAddress.state }} , Pincode:- {{ eachAddress.pin }} ,
                phone:- {{ eachAddress.phone }}
              </h5>
            </div>
            <div class="address-box col-sm-2 ml-1">
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
            </div>
          </div>
          <!-- <button type="submit" class="btn btn-default update">
            Add Address
          </button> -->
          <div class="col-sm-12">
            <button
              type="button"
              class="btn btn-primary address-box"
              data-toggle="modal"
              data-target=".bs-example-modal-md"
              id="myModel"
            >
              Add Address
            </button>
          </div>

          <div
            class="modal fade bs-example-modal-md"
            tabindex="-1"
            role="dialog"
            aria-labelledby="myLargeModalLabel"
          >
            <div class="modal-dialog modal-md" role="document">
              <div class="modal-content">
                <form @submit.prevent="postAddress" class="address-form">
                  <button
                    type="button"
                    class="close"
                    data-dismiss="modal"
                    aria-label="Close"
                  >
                    <span aria-hidden="true">&times;</span>
                  </button>
                  <div class="form-group">
                    <label for="street">Name</label>
                    <input
                      type="text"
                      class="form-control"
                      name="name"
                      placeholder="name"
                      v-model="state.name"
                    />
                    <label class="text-danger" v-if="v$.name.$error">
                      {{ v$.name.$errors[0].$message }}
                    </label>
                  </div>
                  <div class="form-group">
                    <label for="street">Street</label>
                    <input
                      type="text"
                      class="form-control"
                      name="street"
                      placeholder="street"
                      v-model="state.street"
                    />
                    <label class="text-danger" v-if="v$.street.$error">
                      {{ v$.street.$errors[0].$message }}
                    </label>
                  </div>

                  <div class="form-group">
                    <label for="street">LandMark</label>
                    <input
                      type="text"
                      class="form-control"
                      name="landmark"
                      placeholder="LandMark"
                      v-model="state.landmark"
                    />
                    <label class="text-danger" v-if="v$.landmark.$error">
                      {{ v$.landmark.$errors[0].$message }}
                    </label>
                  </div>
                  <div class="row">
                    <div class="col-sm-6">
                      <div class="form-group">
                        <label for="street">City</label>
                        <input
                          type="text"
                          class="form-control"
                          name="city"
                          placeholder="City"
                          v-model="state.city"
                        />
                        <label class="text-danger" v-if="v$.city.$error">
                          {{ v$.city.$errors[0].$message }}
                        </label>
                      </div>
                    </div>
                    <div class="col-sm-6">
                      <div class="form-group">
                        <label for="street">State</label>
                        <input
                          type="text"
                          class="form-control"
                          name="state"
                          placeholder="State"
                          v-model="state.state"
                        />
                        <label class="text-danger" v-if="v$.state.$error">
                          {{ v$.state.$errors[0].$message }}
                        </label>
                      </div>
                    </div>
                  </div>
                  <div class="row">
                    <div class="col-sm-6">
                      <div class="form-group">
                        <label for="street">PinCode</label>
                        <input
                          type="text"
                          class="form-control"
                          name="pin"
                          placeholder="PinCode"
                          v-model="state.pin"
                        />
                        <label class="text-danger" v-if="v$.pin.$error">
                          {{ v$.pin.$errors[0].$message }}
                        </label>
                      </div>
                    </div>
                    <div class="col-sm-6">
                      <div class="form-group">
                        <label for="street">phone Number</label>
                        <input
                          type="text"
                          class="form-control"
                          name="phone"
                          placeholder="phone Number"
                          v-model="state.phone"
                        />
                        <label class="text-danger" v-if="v$.phone.$error">
                          {{ v$.phone.$errors[0].$message }}
                        </label>
                      </div>
                    </div>
                  </div>
                  <button type="submit" class="btn btn-warning">Submit</button>
                </form>
              </div>
            </div>
          </div>
          <div
            class="modal fade bs-example-modal-lg"
            tabindex="-1"
            role="dialog"
            aria-labelledby="myLargeModalLabel"
          >
            <div class="modal-dialog modal-lg" role="document">
              <div class="modal-content">
                <form @submit.prevent="UpdateAddress()" class="address-form">
                  <button
                    type="button"
                    class="close"
                    data-dismiss="modal"
                    aria-label="Close"
                  >
                    <span aria-hidden="true">&times;</span>
                  </button>
                  <div class="form-group">
                    <label for="street">Name</label>
                    <input
                      type="text"
                      class="form-control"
                      name="name"
                      placeholder="name"
                      v-model="editAddr.name"
                    />
                  </div>
                  <div class="form-group">
                    <label for="street">Street</label>
                    <input
                      type="text"
                      class="form-control"
                      name="street"
                      placeholder="street"
                      v-model="editAddr.street"
                    />
                  </div>

                  <div class="form-group">
                    <label for="street">LandMark</label>
                    <input
                      type="text"
                      class="form-control"
                      name="landmark"
                      placeholder="LandMark"
                      v-model="editAddr.landmark"
                    />
                  </div>
                  <div class="row">
                    <div class="col-sm-6">
                      <div class="form-group">
                        <label for="street">City</label>
                        <input
                          type="text"
                          class="form-control"
                          name="city"
                          placeholder="City"
                          v-model="editAddr.city"
                        />
                      </div>
                    </div>
                    <div class="col-sm-6">
                      <div class="form-group">
                        <label for="street">State</label>
                        <input
                          type="text"
                          class="form-control"
                          name="state"
                          placeholder="State"
                          v-model="editAddr.state"
                        />
                      </div>
                    </div>
                  </div>
                  <div class="row">
                    <div class="col-sm-6">
                      <div class="form-group">
                        <label for="street">PinCode</label>
                        <input
                          type="text"
                          class="form-control"
                          name="pin"
                          placeholder="PinCode"
                          v-model="editAddr.pin"
                        />
                      </div>
                    </div>
                    <div class="col-sm-6">
                      <div class="form-group">
                        <label for="street">phone Number</label>
                        <input
                          type="text"
                          class="form-control"
                          name="phone"
                          placeholder="phone Number"
                          v-model="editAddr.phone"
                        />
                      </div>
                    </div>
                  </div>
                  <input type="hidden" name="addr_id" v-model="editAddr.id" />
                  <button type="submit" class="btn btn-warning">Submit</button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- user Orders -->
      <div class="col-sm-12 table-box">
        <h3>Orders</h3>
        <table class="table table-hover">
          <thead>
            <tr>
              <th>S-no</th>
              <th>Name</th>
              <th>Cost</th>
              <th>Status</th>
              <th>Updated on</th>
              <th>Purchase On</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(orders, index) in userOrders" :key="orders.id">
              <td>{{ index + 1 }}</td>
              <td>{{ orders.product_details.name }}</td>
              <td>{{ orders.product_details.price }}</td>
              <td
                class="text-gray text-weight-bolder"
                v-if="orders.o_status == undefined"
              >
                Pending
              </td>
              <td class="text-success" v-if="orders.o_status == 'accepted'">
                Accepted
              </td>
              <td class="text-danger" v-if="orders.o_status == 'rejected'">
                Rejected
              </td>
              <td>{{ orders.updated_at }}</td>
              <td>{{ orders.created_at }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import {
  showUserData,
  addUserAddressData,
  userAddressData,
  editUserAddressData,
  userAddressDelete,
  getPassword,
} from "@/common/Service";
import { mapState } from "vuex";
import useValidate from "@vuelidate/core";
import { required, minLength, maxLength, numeric } from "@vuelidate/validators";
import { reactive } from "vue";
export default {
  name: "Account",
  data() {
    return {
      userData: null,
      userAddress: null,
      userOrders: null,
      editAddr: {
        street: null,
        city: null,
        name: null,
        pin: null,
        state: null,
        landmark: null,
        phone: null,
        id: null,
        user_id: null,
      },
      password: {
        ppassword: null,
        npassword: null,
        copassword: null,
      },
    };
  },
  setup() {
    const state = reactive({
      street: null,
      city: null,
      name: null,
      pin: null,
      state: null,
      landmark: null,
      phone: null,
    });
    const rules = reactive({
      name: { required },
      city: { required },
      state: { required },
      street: { required },
      landmark: { required },
      phone: {
        required,
        numeric,
        minLength: minLength(10),
        maxLength: maxLength(10),
      },
      pin: {
        required,
        numeric,
        minLength: minLength(6),
        maxLength: maxLength(6),
      },
    });
    const v$ = useValidate(rules, state);
    return { state, v$ };
  },
  computed: mapState({
    isLogin: (state) => state.isLogged,
    token: (state) => state.token,
    email: (state) => state.email,
  }),

  methods: {
    getData() {
      showUserData(this.email, "hai", this.token)
        .then((res) => {
          console.log(res.data);
          this.userData = res.data.allUserData;
          this.userAddress = res.data.allUserData.address;
          this.userOrders = res.data.orderData;
        })
        .catch((err) => {
          console.log("SOmething Wrong " + err);
        });
    },
    postAddress() {
      this.v$.$validate();
      if (!this.v$.$error) {
        let addressData = {
          street: this.state.street,
          city: this.state.city,
          name: this.state.name,
          pin: this.state.pin,
          state: this.state.state,
          landmark: this.state.landmark,
          phone: this.state.phone,
          user_id: this.userData.id,
        };

        // let addressData = this.state;
        console.log(addressData);
        addUserAddressData(addressData)
          .then((res) => {
            console.log(res.data);
            if (res.data.err == 0) {
              this.$toast.success(res.data.message);
              // var myModal = document.getElementById("myModel");
              // myModal.click();
              this.getData();
            } else {
              this.$toast.error("validation error");
            }
          })
          .catch((err) => {
            console.log("SOmething Wrong " + err);
          });
      }
    },
    editAddress(id) {
      userAddressData(id).then((res) => {
        console.log(res.data);
        if (res.data.err == 0) {
          this.editAddr.street = res.data.addrData.street;
          this.editAddr.city = res.data.addrData.city;
          this.editAddr.name = res.data.addrData.name;
          this.editAddr.pin = res.data.addrData.pin;
          this.editAddr.state = res.data.addrData.state;
          this.editAddr.landmark = res.data.addrData.landmark;
          this.editAddr.phone = res.data.addrData.phone;
          this.editAddr.id = res.data.addrData.id;
          this.editAddr.user_id = this.userData.id;
        }
      });
    },
    UpdateAddress() {
      let addr_id = this.editAddr.id;
      console.log(this.editAddr);
      editUserAddressData(addr_id, this.editAddr).then((res) => {
        console.log(res.data);
        if (res.data.err == 0) {
          this.$toast.success(res.data.message);
          this.getData();
        } else {
          this.$toast.error(res.data.message);
        }
      });
    },
    deleteAddress(id) {
      userAddressDelete(id).then((res) => {
        if (res.data.err == 0) {
          this.$toast.success(res.data.message);
          this.getData();
        } else {
          this.$toast.error(res.data.message);
        }
      });
    },
    changePassword() {
      getPassword(this.email).then((res) => {
        console.log(res.data);
      });
    },
  },
  created() {
    this.getData();
  },
};
</script>

<style>
.address-form {
  margin: 30px;
}
.placing {
  flex-direction: column;
  display: flex;
  align-items: flex-end;
}
.spacing {
  margin-left: 100px;
}
.address-box {
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
}
.account-box {
  margin-top: 60px;
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
}
.table-box {
  margin-top: 20px;
  margin-bottom: 20px;
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
}
.d-flex {
  display: flex;
  justify-content: space-around;
}
.ml-1 {
  margin-left: 5px;
}
</style>