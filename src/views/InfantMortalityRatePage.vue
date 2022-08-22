<template>
  <ion-page>
    <ion-header :translucent="true">
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-menu-button color="primary"></ion-menu-button>
        </ion-buttons>
        <ion-title>Tasa de mortalidad infantil</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content>
      <ion-grid class="ion-margin-start">
        <ion-list>
          <ion-list-header>
            <ion-label class="bigger-text"> Personalice su gráfico: </ion-label>
          </ion-list-header>

          <ion-row>
            <ion-col>
              <form>
                <ion-list v-if="chartSelected != 'pie' && chartSelected != 'doughnut'">
                  <ion-item v-for="gender in genders" :key="gender.val">
                    <ion-label class="bigger-text">{{ gender.text }}</ion-label>
                    <ion-checkbox
                      slot="end"
                      :disabled="onlyAnOptionIsSelected(gender.val)"
                      @update:modelValue="gender.isChecked = $event"
                      @ionChange="changeChartContent()"
                      :modelValue="gender.isChecked"
                    >
                    </ion-checkbox>
                  </ion-item>
                </ion-list>

                <ion-list v-if="chartSelected == 'pie' || chartSelected == 'doughnut'">
                  <ion-item>
                    <ion-label class="bigger-text">Género:</ion-label>
                    <ion-select
                      @ionChange="changeChartContent()"
                      interface="popover"
                      placeholder="Elija una opción"
                      v-model="genderSelected"
                    >
                      <ion-select-option v-for="gender in genders" :value="gender.val" :key="gender.val">
                        {{gender.text}}
                      </ion-select-option>
                    </ion-select>
                  </ion-item>
                </ion-list>
              </form>
            </ion-col>
            <ion-col class="ion-margin-top">
              <ion-item>
                <ion-label class="bigger-text">Tipo de gráfico:</ion-label>
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
             En esta página podrá apreciar la tasa de mortalidad infantil en España durante distintos años, según el género.
            </ion-text>
            <div>
              <ul>
                <li>
                  <ion-text class="bigger-text">
                    <b>Generado por:</b> <a href="https://www.ine.es" target="_blank">INE</a>
                  </ion-text>
                </li>
                <li class="do-margin-top">
                  <ion-text class="bigger-text">
                    <b>Frecuencia de actualización:</b> Anual
                  </ion-text>
                </li>
                <li class="do-margin-top">
                  <ion-text class="bigger-text">
                    <a href="https://datos.gob.es/es/catalogo/ea0010587-tasa-de-mortalidad-infantil-por-provincia-segun-sexo-idb-identificador-api-48881" target="_blank">Enlace al sitio</a>
                  </ion-text>
                </li>
                <li class="do-margin-top">
                  <ion-text class="bigger-text">
                    <a href="https://api.vdde.me/tasa-de-mortalidad-infantil" target="_blank">Accede al dataset</a>
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
  IonCheckbox,
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
import { InfantMortalityRateService } from "../services/infantMortalityRateService";

export default defineComponent({
  name: "InfantMortalityRatePage",
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
    IonCheckbox,
    IonSelect,
    IonLabel,
    IonListHeader,
    IonButtons,
    IonSelectOption,
    IonMenuButton,
  },
  setup() {
    let infantMortalityRateService = new InfantMortalityRateService();
    let infantMortalityRateData = ref([]);
    let showChart = ref(false);
    let dataDisplayed = ref([{}]);
    let labelsDisplayed = ref([]);
    let chartSelected = ref("bar");
    let genderSelected = ref("total");
    let genders = ref([
      { text: "Total", val: "total", isChecked: true },
      { text: "Hombre", val: "male", isChecked: false },
      { text: "Mujer", val: "female", isChecked: false },
    ]);

    function changeChartContent() {
      let gendersToDisplay = [];

      if (chartSelected.value === "pie" || chartSelected.value === "doughnut") {
        gendersToDisplay = [genderSelected.value];
      } else {
        gendersToDisplay = filterCheckedGenders(genders.value);
      }

      labelsDisplayed.value = infantMortalityRateService.getYearsAsLabels(infantMortalityRateData);
      dataDisplayed.value = infantMortalityRateService.filter(infantMortalityRateData, gendersToDisplay);

      updateChart();
    }

    function updateChart() {
      showChart.value = false;
      setTimeout(() => {
        showChart.value = true;
      }, 0);
    }

    function filterCheckedGenders(genders: any) {
      const result = [];
      for (let i = 0; i < genders.length; i++) {
        if (genders[i].isChecked) {
          result.push(genders[i].val);
        }
      }

      return result;
    }

    function onlyAnOptionIsSelected(text: string) {
      const checkedOptions = genders.value.filter(
        (gender) => gender.isChecked == true
      );
      return checkedOptions.length == 1 && checkedOptions[0].val == text;
    }

    // Antes de que se muestre la página, cargamos los datos
    onBeforeMount(async () => {
      fetchData();
    });

    // Método asíncrono para cargar los datos de la población
    async function fetchData() {
      infantMortalityRateData = await infantMortalityRateService.obtainData();
      changeChartContent();
      showChart.value = true;
    }

    return {
      dataDisplayed,
      labelsDisplayed,
      chartSelected,
      genderSelected,
      changeChartContent,
      genders,
      updateChart,
      onlyAnOptionIsSelected,
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
