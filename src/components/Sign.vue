
<template>
  <!--form-->
  <div class="login">
    <div class="row mt-5 mb-5">
      <div class="col-sm-8 col-sm-offset-1">
        <div class="signup-form">
          <!--sign up form-->
          <h2>New User Signup!</h2>
          <form @submit.prevent="postSignup">
            <label class="text-danger">
              {{ errorc }}
            </label>
            <label class="text-danger" v-if="v$.nameSignup.$error">
              {{ v$.nameSignup.$errors[0].$message }}
            </label>
            <input
              type="text"
              name="nameSignup"
              placeholder="Name"
              v-model="state.nameSignup"
            />
            <label class="text-danger" v-if="v$.emailSignup.$error">
              {{ v$.emailSignup.$errors[0].$message }}
            </label>
            <input
              type="text"
              name="emailSignup"
              placeholder="Email Address"
              v-model="state.emailSignup"
            />
            <label class="text-danger" v-if="v$.passwordSignup.$error">
              {{ v$.passwordSignup.$errors[0].$message }}
            </label>
            <input
              type="password"
              name="passwordSignup"
              placeholder="Password"
              v-model="state.passwordSignup"
            />
            <h5>
              Already You have Account
              <span><router-link to="/login">Click Hear</router-link></span>
            </h5>
            <button type="submit" class="btn btn-warning">Signup</button>
          </form>
        </div>
        <!--/sign up form-->
      </div>
      <div class="col-sm-3">
        <img
          src="../../../../QualityWear/public/images/logo.png"
          width="300"
          alt=""
        />
      </div>
    </div>
  </div>
</template>

<script>
import { userRegister } from "@/common/Service";
import { mapState } from "vuex";
// import store from "../store/store";

import useValidate from "@vuelidate/core";
import { required, email, minLength } from "@vuelidate/validators";
import { reactive } from "vue";

export default {
  name: "Sign",
  data() {
    return {
      errorc: "",
    };
  },
  setup() {
    const state = reactive({
      nameSignup: null,
      emailSignup: null,
      passwordSignup: null,
    });
    const rules = reactive({
      nameSignup: { required },
      emailSignup: { required, email },
      passwordSignup: { required, minLength: minLength(6) },
    });
    const v$ = useValidate(rules, state);
    return { state, v$ };
  },
  computed: mapState({
    isLogin: (state) => state.isLogged,
  }),
  mounted: function mounted() {
    // this.saveData();
  },

  methods: {
    postSignup() {
      this.v$.$validate();
      if (!this.v$.$error) {
        let data = {
          name: this.state.nameSignup,
          email: this.state.emailSignup,
          password: this.state.passwordSignup,
        };
        userRegister(data).then((res) => {
          console.log(res.data);
          if (res.data.err == 0) {
            this.$router.push("/login");
            this.$toast.success("Register Success");
          } else {
            this.errorc = res.data.error.email[0];
            this.$toast.error(res.data.error.email[0]);
          }
        });
      }
    },
  },
};
</script>

<style>
.login {
  display: flex;
  justify-content: center;
  margin: 30px;
}
</style>