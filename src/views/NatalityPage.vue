<template>
  <ion-page>
    <ion-header :translucent="true">
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-menu-button color="primary"></ion-menu-button>
        </ion-buttons>
        <ion-title>Índice de natalidad</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content>
      <ion-grid class="ion-margin-start">
        <ion-list>
          <ion-list-header>
            <ion-label> Personalice su gráfico: </ion-label>
          </ion-list-header>

          <ion-row>
            <ion-col>
              <ion-item>
                <ion-label
                  >Localización:</ion-label
                >
                <ion-select
                  v-model="locationSelected"
                  @ionChange="changeChartContent"
                  interface="popover"
                  placeholder="Elija una opción"
                >
                  <ion-select-option
                    v-for="entry in autonomousCommunities"
                    :key="entry.val"
                    :value="entry.val"
                    >{{ entry.text }}</ion-select-option
                  >
                </ion-select>
              </ion-item>
              <ion-item v-if="locationSelected === 'Todas las comunidades'">
                <ion-label>Año:</ion-label>
                <ion-select
                  v-model="yearSelected"
                  @ionChange="changeChartContent"
                  interface="popover"
                  placeholder="Elija una opción"
                >
                  <ion-select-option
                    v-for="entry in years"
                    :key="entry.val"
                    :value="entry.val"
                    >{{ entry.val }}</ion-select-option
                  >
                </ion-select>
              </ion-item>
            </ion-col>

            <ion-col>
              <ion-item>
                <ion-label>Tipo de gráfico:</ion-label>
                <ion-select
                  v-model="chartSelected"
                  interface="popover"
                  placeholder="Elija una opción"
                  @ionChange="changeChartContent"
                >
                  <ion-select-option value="bar">Barras</ion-select-option>
                  <ion-select-option value="line">Líneas</ion-select-option>
                  <ion-select-option value="radar">Radar</ion-select-option>
                  <ion-select-option value="polar area"
                    >Área polar</ion-select-option
                  >
                  <ion-select-option value="pie">Circular</ion-select-option>
                  <ion-select-option value="doughnut">Donut</ion-select-option>
                </ion-select>
              </ion-item>
            </ion-col>
          </ion-row>
        </ion-list>

        <h2
          v-if="locationSelected != 'Todas las comunidades'"
          class="ion-text-center"
        >
          {{ locationSelected }}
        </h2>
        <h2
          v-if="locationSelected === 'Todas las comunidades'"
          class="ion-text-center"
        >
          {{ locationSelected }} - {{ yearSelected }}
        </h2>
        <div v-if="showChart === true">
          <BarChart
            v-if="chartSelected === 'bar'"
            :labels="labelsDisplayed"
            :data="dataDisplayed"
          />
          <LineChart
            v-if="chartSelected === 'line'"
            :labels="labelsDisplayed"
            :data="dataDisplayed"
          />
          <RadarChart
            v-if="chartSelected === 'radar'"
            :labels="labelsDisplayed"
            :data="dataDisplayed"
            width="100%"
            height="100%"
          />
          <PolarAreaChart
            v-if="chartSelected === 'polar area'"
            :labels="labelsDisplayed"
            :data="dataDisplayed"
            width="100%"
            height="100%"
          />
          <PieChart
            v-if="chartSelected === 'pie'"
            :labels="labelsDisplayed"
            :data="dataDisplayed"
            width="100%"
            height="100%"
          />
          <DoughnutChart
            v-if="chartSelected === 'doughnut'"
            :labels="labelsDisplayed"
            :data="dataDisplayed"
            width="100%"
            height="100%"
          />
        </div>
      </ion-grid>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import { defineComponent, ref, onBeforeMount } from "vue";
import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonGrid,
  IonCol,
  IonRow,
  IonItem,
  IonList,
  IonSelect,
  IonLabel,
  IonListHeader,
  IonButtons,
  IonSelectOption,
  IonMenuButton,
} from "@ionic/vue";
import BarChart from "./charts/barChart";
import LineChart from "./charts/lineChart";
import RadarChart from "./charts/radarChart";
import PolarAreaChart from "./charts/polarAreaChart";
import PieChart from "./charts/pieChart";
import DoughnutChart from "./charts/doughnutChart";
import { NatalityService } from "../services/natalityService";

export default defineComponent({
  name: "NatalityPage",
  components: {
    IonContent,
    IonHeader,
    IonPage,
    IonTitle,
    IonToolbar,
    BarChart,
    LineChart,
    RadarChart,
    PolarAreaChart,
    PieChart,
    DoughnutChart,
    IonGrid,
    IonRow,
    IonCol,
    IonItem,
    IonList,
    IonSelect,
    IonLabel,
    IonListHeader,
    IonButtons,
    IonSelectOption,
    IonMenuButton,
  },
  setup() {
    let natalityService = new NatalityService();
    let natalityData = ref([]);
    let showChart = ref(false);
    let dataDisplayed = ref([{}]);
    let labelsDisplayed = ref([]);
    let locationSelected = ref("Todas las comunidades");
    let yearSelected = ref("2020");
    let chartSelected = ref("bar");
    let autonomousCommunities = ref([
      { text: "Todas las comunidades", val: "Todas las comunidades" },
      { text: "Andalucía", val: "Andalucía" },
      { text: "Aragón", val: "Aragón"},
      { text: "Principado de Asturias", val: "Principado de Asturias" },
      { text: "Islas Baleares", val: "Illes Balears" },
      { text: "Canarias", val: "Canarias" },
      { text: "Cantabria", val: "Cantabria" },
      { text: "Castilla y León", val: "Castilla y León" },
      { text: "Castilla - La Mancha", val: "Castilla - La Mancha" },
      { text: "Cataluña", val: "Cataluña" },
      { text: "Comunidad Valenciana", val: "Comunitat Valenciana" },
      { text: "Extremadura", val: "Extremadura" },
      { text: "Galicia", val: "Galicia" },
      { text: "Comunidad de Madrid", val: "Comunidad de Madrid" },
      { text: "Región de Murcia", val: "Región de Murcia" },
      { text: "Comunidad Foral de Navarra", val: "Comunidad Foral de Navarra" },
      { text: "País Vasco", val: "País Vasco" },
      { text: "La Rioja", val: "La Rioja" },
      { text: "Ceuta", val: "Ciudad Autónoma de Ceuta" },
      { text: "Melilla", val: "Ciudad Autónoma de Melilla" },
    ]);
    let years = ref([
      { val: "2020" },
      { val: "2019" },
      { val: "2018" },
      { val: "2017" },
      { val: "2016" },
      { val: "2015" },
      { val: "2014" },
      { val: "2013" },
      { val: "2012" },
      { val: "2011" },
      { val: "2010" },
      { val: "2009" },
      { val: "2008" },
      { val: "2007" },
      { val: "2006" },
      { val: "2005" },
      { val: "2004" },
      { val: "2003" },
      { val: "2002" }
    ]);

    function changeChartContent() {

      if (locationSelected.value != "Todas las comunidades") {
        labelsDisplayed.value =
          natalityService.getYearsAsLabels(natalityData);
      } else {
        labelsDisplayed.value =
          natalityService.getAutonomousCommunitiesAsLabels(natalityData);
      }
      dataDisplayed.value = natalityService.filter(
        natalityData,
        yearSelected.value,
        locationSelected.value
      );

      updateChart();
    }

    function updateChart() {
      showChart.value = false;
      setTimeout(() => {
        showChart.value = true;
      }, 0);
    }

    // Antes de que se muestre la página, cargamos los datos
    onBeforeMount(async () => {
      fetchData();
    });

    // Método asíncrono para cargar los datos de la población
    async function fetchData() {
      natalityData = await natalityService.obtainData();
      changeChartContent();
      showChart.value = true;
    }

    return {
      dataDisplayed,
      labelsDisplayed,
      locationSelected,
      yearSelected,
      chartSelected,
      changeChartContent,
      autonomousCommunities,
      years,
      updateChart,
      showChart,
      onBeforeMount,
      fetchData,
    };
  },
});
</script>

<style scoped></style>
