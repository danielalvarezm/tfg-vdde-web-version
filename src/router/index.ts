import { createRouter, createWebHistory } from '@ionic/vue-router';
import { RouteRecordRaw } from 'vue-router';

const routes: Array<RouteRecordRaw> = [
  // {
  //   path: "",
  //   redirect: "/folder/MenuPrincipal",
  // },
  {
    path: "/folder/defunciones-infantiles",
    component: () => import("../views/InfantDefunctionsPage.vue"),
  },
  {
    path: "/folder/menu-principal",
    component: () => import("../views/MainPage.vue"),
  },
  {
    path: "/folder/poblacion-ccaa",
    component: () => import("../views/PopulationPage.vue"),
  },
  {
    path: "/folder/cantidad-nacimientos",
    component: () => import("../views/AmountOfBirthsPage.vue"),
  },
  {
    path: "/folder/indice-fecundidad",
    component: () => import("../views/FecundityPage.vue"),
  },
  {
    path: "/folder/indice-natalidad",
    component: () => import("../views/NatalityPage.vue"),
  },
  {
    path: "/folder/tasa-mortalidad-infantil",
    component: () => import("../views/InfantMortalityRatePage.vue"),
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
