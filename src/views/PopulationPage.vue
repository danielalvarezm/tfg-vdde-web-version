<template>
  <ion-page>
    <ion-header :translucent="true">
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-menu-button color="primary"></ion-menu-button>
        </ion-buttons>
        <ion-title>Población según la comunidad autónoma</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content>
      <ion-grid class="ion-margin-start">
        <ion-list>
          <ion-list-header>
            <ion-label class="bigger-text">Personalice su gráfico: </ion-label>
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

              <ion-item>
                <ion-label class="bigger-text">Localización:</ion-label>
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
                <ion-label class="bigger-text">Año:</ion-label>
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
          </ion-row>
        </ion-list>

        <h2 v-if="locationSelected != 'Todas las comunidades'" class="ion-text-center">{{ locationSelected }}</h2>
        <h2 v-if="locationSelected === 'Todas las comunidades'" class="ion-text-center">{{ locationSelected }} - {{ yearSelected }}</h2>
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
             Aquí podrá observar los valores de la población española en las distintas comunidades autónomas, según el año y el género.
            </ion-text>
            <ion-text class="bigger-text"><br><br><b>Generado por:</b> <a href="https://www.ine.es" target="_blank">INE</a></ion-text>
            <div>
              <ion-text class="bigger-text"><b><br>Frecuencia de actualización:</b> Semestral</ion-text>
            </div>
            <div>
              <ion-text class="bigger-text"><br><a href="https://datos.gob.es/es/catalogo/ea0010587-poblacion-residente-por-fecha-sexo-y-generacion-edad-a-31-de-diciembre-semestral-comunidades-autonomas-cifras-de-poblacion-identificador-api-96821" target="_blank">Enlace al sitio</a></ion-text>
            </div>
            <ion-text class="bigger-text"><br><a href="https://vdde.me/api/poblacion" target="_blank">Accede al dataset</a></ion-text>
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
  IonText,
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
import { PopulationService } from "../services/populationService";

export default defineComponent({
  name: "PopulationPage",
  components: {
    IonContent,
    IonHeader,
    IonPage,
    IonTitle,
    IonText,
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
    let populationService = new PopulationService();
    let populationData = ref([]);
    let showChart = ref(false);
    let dataDisplayed = ref([{}]);
    let labelsDisplayed = ref([]);
    let locationSelected = ref("Todas las comunidades");
    let yearSelected = ref("2021");
    let chartSelected = ref("bar");
    let genderSelected = ref("total");
    let genders = ref([
      { text: "Total", val: "total", isChecked: true },
      { text: "Hombre", val: "male", isChecked: false },
      { text: "Mujer", val: "female", isChecked: false },
    ]);
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
      { text: "Ceuta", val: "Ceuta" },
      { text: "Melilla", val: "Melilla" },
    ]);
    let years = ref([
      { val: "2021" },
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

      let gendersToDisplay = [];

      if (chartSelected.value === "pie" || chartSelected.value === "doughnut") {
        gendersToDisplay = [genderSelected.value];
      } else {
        gendersToDisplay = filterCheckedGenders(genders.value);
      }

      if (locationSelected.value != "Todas las comunidades") {
        labelsDisplayed.value = populationService.getYearsAsLabels(populationData);
      } else {
        labelsDisplayed.value = populationService.getAutonomousCommunitiesAsLabels(populationData);
      }
      dataDisplayed.value = populationService.filter(populationData, yearSelected.value, gendersToDisplay, locationSelected.value);

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
      populationData = await populationService.obtainData();
      changeChartContent();
      showChart.value = true;
    }

    return {
      dataDisplayed,
      labelsDisplayed,
      locationSelected,
      yearSelected,
      chartSelected,
      genderSelected,
      changeChartContent,
      genders,
      autonomousCommunities,
      years,
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
</style>
