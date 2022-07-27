import { createRouter, createWebHistory } from '@ionic/vue-router';
import { RouteRecordRaw } from 'vue-router';

const routes: Array<RouteRecordRaw> = [
  {
    path: "",
    redirect: "/menu-principal",
  },
  {
    path: "/defunciones-infantiles",
    component: () => import("../views/InfantDefunctionsPage.vue"),
  },
  {
    path: "/menu-principal",
    component: () => import("../views/MainPage.vue"),
  },
  {
    path: "/poblacion-ccaa",
    component: () => import("../views/PopulationPage.vue"),
  },
  {
    path: "/cantidad-nacimientos",
    component: () => import("../views/AmountOfBirthsPage.vue"),
  },
  {
    path: "/indice-fecundidad",
    component: () => import("../views/FecundityPage.vue"),
  },
  {
    path: "/indice-natalidad",
    component: () => import("../views/NatalityPage.vue"),
  },
  {
    path: "/tasa-mortalidad-infantil",
    component: () => import("../views/InfantMortalityRatePage.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
