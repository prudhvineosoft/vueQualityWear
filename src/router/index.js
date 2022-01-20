import { createWebHistory, createRouter } from "vue-router";


import Main from '../components/Main.vue'
import Contact from '../components/Contact.vue';
import Login from '../components/Login.vue';
import Blogsingle from '../components/Blogsingle.vue'
import Blog from '../components/Blog.vue'
import Cart from '../components/Cart.vue'
import Error from '../components/Error.vue'
import Shop from '../components/Shop.vue'
import Productdetails from '../components/Productdetails.vue'
import Checkout from '../components/Checkout.vue'
import Sign from '../components/Sign.vue'
import Account from '../components/Account.vue'
import Thankyou from '../components/Thankyou.vue'
import Wishlist from '../components/Wishlist.vue'
import CMS from '../components/CMS.vue'
function myGaurd(to,from,next){
    let isAuthenticated = false;
    if(localStorage.getItem('uid')) {
      isAuthenticated = true;
    }else{
      isAuthenticated = false;
    }
    if(isAuthenticated) {
      next();
    }else {
        next('/login');
        alert('login required')
    }
    
  }

const routes = [
    {
        path: '/',
        name: 'Main',
        component: Main
    },
    {
        path: '/contact',
        name: 'Contact',
        component: Contact
    },
    {
        path: '/login',
        name: 'Login',
        component: Login
    },
    {
        path: '/signup',
        name: 'Sign',
        component: Sign
    },
    {
        path: '/blogsingle',
        name: 'Blogsingle',
        component: Blogsingle
    },
    {
        path: '/blog',
        name: 'Blog',
        component: Blog
    },
    {
        path: '/account',
        name: 'account',
        beforeEnter:myGaurd,
        component: Account
    },
    {
        path: '/wishlist',
        name: 'wishlist',
        beforeEnter:myGaurd,
        component: Wishlist
    },
    {
        path: '/cart',
        name: 'Cart',
        component: Cart
    },
    {
        path:  "/:catchAll(.*)",
        name: 'Error',
        component: Error
    },
    {
        path: '/shop',
        name: 'Shop',
        component: Shop
    },
    {
        path: '/success',
        name: 'thankyou',
        component: Thankyou
    },
    {
        path: '/Productdetails/:id',
        name: 'Productdetails',
        component: Productdetails
    },
    {
        path: '/cms/:id',
        name: 'cms',
        component: CMS
    },
    {
        path: '/category/:catName',
        name: 'main',
        component: Main
    },
    {
        path: '/checkout',
        name: 'Checkout',
        beforeEnter:myGaurd,
        component: Checkout
    },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;