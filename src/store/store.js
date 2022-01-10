

import { createStore } from "vuex" 
//import axios from "axios";

const store = createStore({
   state:{
      name: "Vue",
      isLogged: false,
      token: '',
      email:'',
      banner:null,
      products:null,
      eachProduct: null,
      eachProductImages:null,
      category:null,
   },
   mutations:{
      login(state,payload) {
         return state.isLogged = payload.message;
      },
      token(state,payload) {
         return state.token = payload.token
      },
      email(state,payload) {
         return state.email = payload.email
      },
      banner(state,payload) {
         return state.banner = payload.banner
      },
      products(state,payload) {
         return state.products = payload.products
      },
      eachProduct(state,payload) {
         return state.eachProduct = payload.eachProduct
      },
      eachProductImages(state,payload) {
         return state.eachProductImages = payload.eachProductImages
      },
      category(state,payload) {
         return state.category = payload.category
      }
      
   },
   actions:{
      login(countext,payload) {
         countext.commit('login',payload)
      },
      token(countext,payload) {
         countext.commit('token',payload)
      },
      email(countext,payload) {
         countext.commit('email',payload)
      },
      banner(countext,payload) {
         countext.commit('banner',payload)
      },
      products(countext,payload) {
         countext.commit('products',payload)
      },
      eachProduct(countext,payload) {
         countext.commit('eachProduct',payload)
      },
      eachProductImages(countext,payload) {
         countext.commit('eachProductImages',payload)
      },
      category(countext,payload) {
         countext.commit('category',payload)
      },
   }
})

export default store