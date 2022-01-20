

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
      inCart:JSON.parse(localStorage.getItem('myCart'))?JSON.parse(localStorage.getItem('myCart')):[],
      cartFinalData:null
   },
   getters:{
      inCart: state => state.inCart
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
      },
      ADD_TO_CART(state,id){ state.inCart.push(id)},
      DEL_ITEM(state, id) { state.inCart.splice(id, 1) },
      cartFinalData(state,payload) {
         return state.cartFinalData = payload.cartFinalData
      },
      
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
      addToCart(context,id) { context.commit('ADD_TO_CART',id)},
      remItem(context, id) { context.commit('DEL_ITEM', id) },
      cartFinalData(countext,payload) {
         countext.commit('cartFinalData',payload)
      },
   }
})

export default store