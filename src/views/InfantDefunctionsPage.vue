<template>
  <ion-page>
    <ion-header :translucent="true">
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-menu-button color="primary"></ion-menu-button>
        </ion-buttons>
        <ion-title>Defunciones infantiles según el año</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content>
      <ion-grid class="ion-margin-start">
        <ion-list>
          <ion-list-header>
            <ion-label class="bigger-text"> Personalice su gráfico: </ion-label>
          </ion-list-header>

          <ion-row>
            <ion-col size-md="12" size-lg="12" size-xl="6" size-sm="12" size-xs="12">
              <ion-item>
                <ion-label class="bigger-text">Tipo de gráfica:</ion-label>
                <ion-select
                  v-model="chartSelected"
                  interface="popover"
                  placeholder="Elija una opción"
                  @ionChange="changeChartContent"
                >
                  <ion-select-option value="bar">Barras</ion-select-option>
                  <ion-select-option value="line">Líneas</ion-select-option>
                  <ion-select-option value="radar">Radar</ion-select-option>
                  <ion-select-option value="polar area">Área polar</ion-select-option>
                  <ion-select-option value="pie">Circular</ion-select-option>
                  <ion-select-option value="doughnut">Donut</ion-select-option>
                </ion-select>
              </ion-item>
            </ion-col>
          </ion-row>
        </ion-list>

        <div v-if="showChart === true">
          <BarChart v-if="chartSelected === 'bar'" :labels="labelsDisplayed" :data="dataDisplayed" />
          <LineChart v-if="chartSelected === 'line'" :labels="labelsDisplayed" :data="dataDisplayed" />
          <RadarChart class="ion-hide-sm-up" v-if="chartSelected === 'radar'" :labels="labelsDisplayed" :data="dataDisplayed"/>
          <RadarChart class="ion-hide-sm-down" v-if="chartSelected === 'radar'" :labels="labelsDisplayed" :data="dataDisplayed" width="100%" height="100%"/>
          <PolarAreaChart class="ion-hide-sm-up" v-if="chartSelected === 'polar area'" :labels="labelsDisplayed" :data="dataDisplayed"/>
          <PolarAreaChart class="ion-hide-sm-down" v-if="chartSelected === 'polar area'" :labels="labelsDisplayed" :data="dataDisplayed" width="100%" height="100%"/>
          <PieChart class="ion-hide-sm-up" v-if="chartSelected === 'pie'" :labels="labelsDisplayed" :data="dataDisplayed"/>
          <PieChart class="ion-hide-sm-down" v-if="chartSelected === 'pie'" :labels="labelsDisplayed" :data="dataDisplayed" width="100%" height="100%"/>
          <DoughnutChart class="ion-hide-sm-up" v-if="chartSelected === 'doughnut'" :labels="labelsDisplayed" :data="dataDisplayed"/>
          <DoughnutChart class="ion-hide-sm-down" v-if="chartSelected === 'doughnut'" :labels="labelsDisplayed" :data="dataDisplayed" width="100%" height="100%"/>

          <h2><b><br>Información</b></h2>
          <div>
            <ion-text class="bigger-text">
             En esta página podrá apreciar la cantidad de defunciones infantiles ocurridas en el país en distintos años.
            </ion-text>
            <div>
              <ul>
                <li>
                  <ion-text class="bigger-text">
                    <b>Generado por:</b> <a href="https://www.vdde.me/menu-principal" target="_blank">VDDE</a>
                  </ion-text>
                </li>
                <li class="do-margin-top">
                  <ion-text class="bigger-text">
                    <b>Frecuencia de actualización:</b> Anual
                  </ion-text>
                </li>
                <li class="do-margin-top">
                  <ion-text class="bigger-text">
                    <b>Datos de origen:</b>
                  </ion-text>
                </li>
                <ul>
                  <li class="do-margin-top">
                    <ion-text class="bigger-text">
                      <a href="https://vdde.me/cantidad-nacimientos" target="_blank">Cantidad de nacimientos</a>
                    </ion-text>
                  </li>
                  <li class="do-margin-top">
                    <ion-text class="bigger-text">
                      <a href="https://vdde.me/tasa-mortalidad-infantil" target="_blank">Tasa de mortalidad infantil</a>
                    </ion-text>
                  </li>
                </ul>
                <li class="do-margin-top">
                  <ion-text class="bigger-text">
                    <a href="https://api.vdde.me/defunciones-infantiles" target="_blank">Accede al dataset</a>
                  </ion-text>
                </li>
              </ul>
            </div>
          </div>
          <div>
            <h2><b><br>Guía de uso</b></h2>
            <ul>
              <li>
                <ion-text class="bigger-text">
                  Se puede elegir un género o varios a la vez.
                </ion-text>
              </li>
              <li class="do-margin-top">
                <ion-text class="bigger-text">
                  Para las gráficas "Circular" y "Donut", sólo se puede elegir un género.
                </ion-text>
              </li>
              <li class="do-margin-top">
                <ion-text class="bigger-text">
                  Para el resto de gráficas si se pueden elegir varios géneros si está disponible la opción.
                </ion-text>
              </li>
              <li class="do-margin-top">
                <ion-text class="bigger-text">
                  Cuando la opción "Todas las comunidades" está seleccionada, se puede elegir un año.
                </ion-text>
              </li>
              <li class="do-margin-top">
                <ion-text class="bigger-text">
                  Cuando se especifica una comunidad autónoma, aparecen todos los valores en los distintos años para esa comunidad autónoma.
                </ion-text>
              </li>
              <li class="do-margin-top">
                <ion-text class="bigger-text">
                  Si no se puede especificar la localización, significa que se muestran todas las comunidades.
                </ion-text>
              </li>
              <li class="do-margin-top">
                <ion-text class="bigger-text">
                  Si no se puede especificar un género, significa que se está mostrando el total de la población.
                </ion-text>
              </li>
              <li class="do-margin-top">
                <ion-text class="bigger-text">
                  Si pasa el cursor o pulsa sobre algún elemento de la gráfica, podrá ver su valor total.
                </ion-text>
              </li>
            </ul>
          </div>

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
import { InfantDefunctionsService } from "../services/infantDefunctionsService";

export default defineComponent({
  name: "FecundityPage",
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
    let infantDefunctionsService = new InfantDefunctionsService();
    let infantDefunctionData = ref([]);
    let showChart = ref(false);
    let dataDisplayed = ref([{}]);
    let labelsDisplayed = ref([]);
    let yearSelected = ref("2020");
    let chartSelected = ref("bar");
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
      labelsDisplayed.value = infantDefunctionsService.getYearsAsLabels(infantDefunctionData);
      dataDisplayed.value = infantDefunctionsService.filter(infantDefunctionData);
      console.log(dataDisplayed.value);
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
      infantDefunctionData = await infantDefunctionsService.obtainData();
      changeChartContent();
      showChart.value = true;
    }

    return {
      dataDisplayed,
      labelsDisplayed,
      yearSelected,
      chartSelected,
      changeChartContent,
      years,
      updateChart,
      showChart,
      onBeforeMount,
      fetchData,
    };
  },
});
</script>

<style scoped>
.bigger-text {
  font-size: 1.1rem;
}

.do-margin-top {
  margin-top: 0.4rem;
}
</style>
