import VueSweetaler2 from 'vue-sweetalert2';
import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import Vuelidate from 'vuelidate';

import 'bootstrap/dist/css/bootstrap.min.css';
import Vue from 'vue';

createApp(App).use(router, VueSweetaler2, Vuelidate).mount('#app');

new Vue({
    router,
    render: (h) => h(App),
})

 .$mount('#app');