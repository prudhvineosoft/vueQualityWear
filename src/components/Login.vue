
<template>
  <!--form-->
  <div class="login">
    <div class="row">
      <div class="col-sm-8 col-sm-offset-1">
        <div class="login-form">
          <!--login form-->
          <h2>Login to your account</h2>
          <form @submit.prevent="postLogin">
            <label class="text-danger" v-if="v$.emailLogin.$error">
              {{ v$.emailLogin.$errors[0].$message }}
            </label>
            <label class="text-danger">
              {{ error }}
            </label>
            <input
              type="email"
              name="emailLogin"
              placeholder="Email Address"
              v-model="state.emailLogin"
            />
            <label class="text-danger" v-if="v$.passwordLogin.$error">
              {{ v$.passwordLogin.$errors[0].$message }}
            </label>
            <input
              type="password"
              name="passwordLogin"
              placeholder="Email Password"
              v-model="state.passwordLogin"
            />

            <span>
              <input type="checkbox" class="checkbox" />
              Keep me signed in
            </span>

            <h5>
              New User Signup!
              <span><router-link to="/signup">Click Hear</router-link></span>
            </h5>

            <button type="submit" class="btn btn-default">Login</button>
          </form>
        </div>
        <!--/login form-->
      </div>
      <div class="col-sm-3">
        <img src="images/my/logo.png" width="300" alt="" />
      </div>
    </div>
  </div>
  <!-- <Sign /> -->
</template>

<script>
import { userLogin } from "@/common/Service";
import { saveToken } from "@/common/Jwttoken";
import { mapState } from "vuex";
import store from "../store/store";
import * as type from "../store/types";

import useValidate from "@vuelidate/core";
import { required, email } from "@vuelidate/validators";
import { reactive, computed } from "vue";

export default {
  name: "Login",
  components: {
    // Sign,
  },
  data() {
    return {
      error: "",
    };
  },
  setup() {
    const state = reactive({
      emailLogin: null,
      passwordLogin: null,
    });

    const rules = computed(() => {
      return {
        emailLogin: { required, email },
        passwordLogin: { required },
      };
    });

    const v$ = useValidate(rules, state);

    return { state, v$ };
  },

  computed: mapState({
    isLogin: (state) => state.isLogged,
    email: (state) => state.email,
  }),
  mounted: function mounted() {
    // this.saveData();
  },

  methods: {
    postLogin() {
      this.v$.$validate();
      if (!this.v$.$error) {
        let formData = {
          email: this.state.emailLogin,
          password: this.state.passwordLogin,
        };
        console.log(formData);
        userLogin(formData)
          .then((res) => {
            console.log(res.data);
            if (res.data.error == 0) {
              saveToken(res.data.token);
              this.$toast.success(`${res.data.email} Login successful`);
              localStorage.setItem("uid", res.data.email);
              store.dispatch({
                type: type.Login,
                message: true,
              });
              store.dispatch({
                type: type.Token,
                token: res.data.token,
              });
              store.dispatch({
                type: type.Email,
                email: res.data.email,
              });
              this.$router.push("/");
              // alert(res.data.email);
            }
            if (res.data.err == 1) {
              this.error = "The Input fields does not match our records";
              this.$toast.error(res.data.error);
            }
          })
          .catch((err) => {
            console.log("SOmething Wrong " + err);
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