import { createRouter, createWebHistory } from '@ionic/vue-router';
import { RouteRecordRaw } from 'vue-router';

const routes: Array<RouteRecordRaw> = [
  // {
  //   path: "",
  //   redirect: "/folder/MenuPrincipal",
  // },
  {
    path: "/folder/Defunciones-infantiles",
    component: () => import("../views/InfantDefunctionsPage.vue"),
  },
  {
    path: "/folder/MenuPrincipal",
    component: () => import("../views/MainPage.vue"),
  },
  {
    path: "/folder/Auxiliar",
    component: () => import("../views/auxiliar.vue"),
  },
  {
    path: "/folder/Poblacion",
    component: () => import("../views/PopulationPage.vue"),
  },
  {
    path: "/folder/:id",
    component: () => import("../views/FolderPage.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
