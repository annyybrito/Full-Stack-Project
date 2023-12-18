import { createRouter, createWebHistory } from 'vue-router';
import CreateEmployeeComponent from '../components/create-employee/CreateEmployeeComponent.vue';
import ListEmployeeComponent from '../components/list-employee/ListEmployeeComponent.vue';
import EditEmployeeComponent from '../components/edit-employee/EditEmployeeComponent.vue';


const routes = [
  {
    path: '/',
    name: 'create-employee',
    component: CreateEmployeeComponent,
  },
  {
    path: '/list-employees',
    name: 'list-employees',
    component: ListEmployeeComponent,
  },
  {
    path: '/edit/:id',
    name: 'edit-employee',
    component: EditEmployeeComponent,
  },

];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
