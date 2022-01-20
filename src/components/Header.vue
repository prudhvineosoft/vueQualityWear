<template>
  <header id="header">
    <!--header-->
    <div class="header_top">
      <!--header_top-->
      <div class="container">
        <div class="row">
          <div class="col-sm-6">
            <div class="contactinfo">
              <ul class="nav nav-pills">
                <li>
                  <a href="#"><i class="fa fa-phone"></i> +2 95 01 88 821</a>
                </li>
                <li>
                  <a href="#"><i class="fa fa-envelope"></i> info@domain.com</a>
                </li>
              </ul>
            </div>
          </div>
          <div class="col-sm-6">
            <div class="social-icons pull-right">
              <ul class="nav navbar-nav row">
                <li>
                  <a href="#"><i class="fa fa-facebook"></i></a>
                </li>
                <li>
                  <a href="#"><i class="fa fa-twitter"></i></a>
                </li>
                <li>
                  <a href="#"><i class="fa fa-linkedin"></i></a>
                </li>
                <li>
                  <a href="#"><i class="fa fa-dribbble"></i></a>
                </li>
                <li>
                  <a href="#"><i class="fa fa-google-plus"></i></a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!--/header_top-->

    <div class="header-middle">
      <!--header-middle-->
      <div class="container">
        <div class="row">
          <div class="col-sm-5">
            <div class="logo pull-left">
              <a href="index.html"
                ><img
                  src="../../../../QualityWear/public/images/logo.png"
                  width="35"
                  alt=""
                /><span class="logo-heading">Quality Wear</span></a
              >
            </div>
          </div>
          <div class="col-sm-7">
            <div class="shop-menu pull-right">
              <ul class="nav navbar-nav">
                <li>
                  <router-link to="/account"
                    ><i class="fa fa-user"></i> Account</router-link
                  >
                </li>

                <li></li>
                <li v-if="numInCart > 0">
                  <router-link to="/cart"
                    ><i class="fa fa-shopping-cart"></i> Cart
                    {{ numInCart }}</router-link
                  >
                </li>
                <li v-if="numInCart == 0">
                  <router-link to="/wishlist"
                    ><i class="far fa-heart text-danger"></i> Wishlist
                  </router-link>
                </li>
                <li v-if="numInCart == 0">
                  <router-link to="/cart"
                    ><i class="fa fa-shopping-cart"></i> Cart
                  </router-link>
                </li>

                <li v-if="isLogin"></li>
                <li class="dropdown" v-if="isLogin">
                  <a href="#"
                    >{{ this.email }}<i class="fa fa-angle-down"></i
                  ></a>
                  <ul role="menu" class="sub-menu">
                    <li>
                      <button class="bg-transparent" @click="logout()">
                        <i class="fa fa-lock"></i> Logout
                      </button>
                    </li>
                  </ul>
                </li>
                <li v-else>
                  <router-link to="/login">
                    <i class="fa fa-lock"></i>Login</router-link
                  >
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!--/header-middle-->

    <div class="header-bottom">
      <!--header-bottom-->
      <div class="container">
        <div class="row">
          <div class="col-sm-9">
            <div class="navbar-header">
              <button
                type="button"
                class="navbar-toggle"
                data-toggle="collapse"
                data-target=".navbar-collapse"
              >
                <span class="sr-only">Toggle navigation</span>
                <span class="icon-bar"></span>
                <span class="icon-bar"></span>
                <span class="icon-bar"></span>
              </button>
            </div>
            <div class="mainmenu pull-left">
              <ul class="nav navbar-nav collapse navbar-collapse">
                <li><router-link to="/">Home </router-link></li>
                <li class="dropdown">
                  <a href="#">Shop<i class="fa fa-angle-down"></i></a>
                  <ul role="menu" class="sub-menu">
                    <li><router-link to="/shop">Products</router-link></li>
                    <li>
                      <router-link to="/Productdetails"
                        >Product details</router-link
                      >
                    </li>
                    <li><router-link to="/cart">Cart</router-link></li>
                    <li v-if="isLogin">
                      <button @click="logout()">
                        <i class="fa fa-lock"></i> Logout
                      </button>
                    </li>
                    <li v-else>
                      <router-link to="/login"
                        ><i class="fa fa-lock"></i> Login</router-link
                      >
                    </li>
                  </ul>
                </li>
                <li class="dropdown">
                  <a>Pages<i class="fa fa-angle-down"></i></a>
                  <ul role="menu" class="sub-menu">
                    <li v-for="each in cms" :key="each.id">
                      <router-link :to="{ path: `/cms/${each.id}` }">{{
                        each.title
                      }}</router-link>
                    </li>
                  </ul>
                </li>
                <li><router-link to="/404">404</router-link></li>
                <li><router-link to="/contact">contact-us </router-link></li>
              </ul>
            </div>
          </div>
          <div class="col-sm-3">
            <div class="search_box pull-right">
              <input type="text" placeholder="Search" />
            </div>
          </div>
        </div>
      </div>
    </div>

    <!--/header-bottom-->
  </header>
</template>

<script>
import { mapState } from "vuex";
import { getcms } from "@/common/Service";
import store from "../store/store";
import * as type from "../store/types";
export default {
  name: "Header",
  data() {
    return {
      cms: null,
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
    logout() {
      confirm("Are you sure to Logout");
      // const config = {
      //   headers: { Authorization: `Bearer ${this.token}` },
      // };

      // const bodyParameters = {
      //   key: "value",
      // };
      this.$router.push("/");
      this.$toast.success("Logout successful");
      localStorage.removeItem("id_token");
      localStorage.removeItem("uid");
      store.dispatch({
        type: type.Login,
        message: false,
      });
      store.dispatch({
        type: type.Token,
        message: "",
      });
      store.dispatch({
        type: type.Email,
        message: "",
      });
      // console.log(config);
      // userLogout(bodyParameters, config)
      //   .then((res) => {
      //     console.log(res.data);

      //   })
      //   .catch((err) => {
      //     console.log("SOmething Wrong " + err);
      //   });
    },
    checking() {
      store.dispatch({
        type: type.Token,
        token: localStorage.getItem("id_token"),
      });
      store.dispatch({
        type: type.Email,
        email: localStorage.getItem("uid"),
      });
      if ("id_token" in localStorage) {
        if (localStorage.getItem("id_token") == "") {
          store.dispatch({
            type: type.Login,
            message: false,
          });
        } else {
          store.dispatch({
            type: type.Login,
            message: true,
          });
        }
      } else {
        store.dispatch({
          type: type.Login,
          message: false,
        });
      }
    },
    pages() {
      getcms().then((res) => {
        this.cms = res.data.cms;
      });
    },
  },
  mounted: function mounted() {
    this.checking();
    this.pages();
  },
};
</script>

<style>
.bg-transparent {
  background-color: transparent;
  border: none;
  color: white;
}
.logo-heading {
  font-family: "Nunito", sans-serif;
  color: rgb(206, 169, 22);
  font-weight: bold;
  margin-left: 10px;
  font-size: 20px;
}
</style>