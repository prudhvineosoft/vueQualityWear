import { createApp } from 'vue'
import App from './App.vue'
import router from './router' // <---
import store from './store/store'
import VueToast from 'vue-toast-notification';
import 'vue-toast-notification/dist/theme-sugar.css';
// import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
// import 'bootstrap/dist/css/bootstrap.css'
// import 'bootstrap-vue/dist/bootstrap-vue.css'
// .use(BootstrapVue).use(IconsPlugin)

createApp(App).use(router).use(store).use(VueToast).mount('#app');
