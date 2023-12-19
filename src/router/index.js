import { createRouter, createWebHistory } from 'vue-router';
import CreateRegisterComponent from '../components/create-register/CreateRegisterComponent.vue';
import ListRegisterComponent from '../components/list-register/ListRegisterComponent.vue';
import EditRegisterComponent from '../components/edit-register/EditRegisterComponent.vue';

const routes = [
  {
    path: '/',
    name: 'create-register',
    component: CreateRegisterComponent,
  },
  {
    path: '/list-registers',
    name: 'list-registers',
    component: ListRegisterComponent,
  },
  {
    path: '/edit/:id',
    name: 'edit-register',
    component: EditRegisterComponent,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
