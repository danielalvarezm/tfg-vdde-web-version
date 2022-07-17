<template>
  <ion-page>
    <ion-header :translucent="true">
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-menu-button color="primary"></ion-menu-button>
        </ion-buttons>
        <ion-title>Población según CCAA</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content>
      <ion-grid class="ion-margin-start">

        <ion-list>
          <ion-list-header>
            <ion-label>
              Personalice su gráfico:
            </ion-label>
          </ion-list-header>

          <ion-row>
            <ion-col>
              <form>
                <ion-list>
                  <ion-item v-for="entry in genders" :key="entry.val">
                    <ion-label>{{entry.text}}</ion-label>
                    <ion-checkbox
                      slot="end"
                      @update:modelValue="entry.isChecked = $event"
                      :modelValue="entry.isChecked">
                    </ion-checkbox>
                  </ion-item>
                </ion-list>
              </form>
              <ion-button @click="applyGenderFilter" color="primary">Aplicar selección</ion-button><br/>
            </ion-col>

            <ion-col>
              <ion-item>
                <ion-label>Seleccione el tipo de gráfico:</ion-label>
                <ion-select v-model="currentChart" interface="popover" placeholder="Elija una opción">
                  <ion-select-option value="bar">Barras</ion-select-option>
                  <ion-select-option value="line">Líneas</ion-select-option>
                  <ion-select-option value="pie">Circular</ion-select-option>
                </ion-select>
              </ion-item>
            </ion-col>

          </ion-row>
        </ion-list>

        <p>{{ currentChart }}</p>
        <p>{{genders}}</p>

        <div v-if="showChart === true">
          <BarChart v-if="currentChart === 'bar'" :labels="labelsDisplayed" :data="dataDisplayed" />
          <LineChart v-if="currentChart === 'line'" :labels="labelsDisplayed" :data="dataDisplayed" />
        </div>
      </ion-grid>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import { defineComponent, ref, onBeforeMount } from 'vue';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonGrid, IonCol, IonRow, IonItem, IonList, IonSelect, IonCheckbox, IonLabel, IonListHeader, IonButton, IonButtons, IonSelectOption, IonMenuButton } from '@ionic/vue';
import BarChart from './charts/barChart'
import LineChart from './charts/lineChart'
import { PopulationService } from '../services/populationService';

export default defineComponent({
  name: 'PopulationPage',
  components: {
    IonContent,
    IonHeader,
    IonPage,
    IonTitle,
    IonToolbar,
    BarChart,
    LineChart,
    IonGrid,
    IonRow,
    IonCol,
    IonItem,
    IonList,
    IonCheckbox,
    IonSelect,
    IonLabel,
    IonListHeader,
    IonButton,
    IonButtons,
    IonSelectOption,
    IonMenuButton
  },
  setup() {
    let populationService = new PopulationService();
    let populationData = ref([]);
    let showChart = ref(false);
    let dataDisplayed = ref([{}]);
    let labelsDisplayed = ref([]);
    let currentChart = ref('bar');
    let genders = ref([
      { text: 'Total', val: 'total', isChecked: true },
      { text: 'Hombre', val: 'male', isChecked: true },
      { text: 'Mujer', val: 'female', isChecked: true }
    ]);

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    function changeChartContent(year: number, ccaa: string) {
      const gendersToDisplay = filterCheckedGenders(genders.value);
      dataDisplayed.value = populationService.filter2(populationData, 0, gendersToDisplay, 'Andalucía');
      updateChart();
    }

    function updateChart() {
      showChart.value = false;
      setTimeout(() => {
        showChart.value = true;
      }, 0);
    }

    function applyGenderFilter() {
      changeChartContent( 0, 'Andalucía');
    }

    function filterCheckedGenders(genders: any) {
      const result = [];
      for (let i = 0; i < genders.length; i++) {
        if (genders[i].isChecked) {
          result.push(genders[i].val)
        }
      }

      return result
    }

    // Antes de que se muestre la página, cargamos los datos
    onBeforeMount(async () => { fetchData() });

    // Método asíncrono para cargar los datos de la población
    async function fetchData() {
      populationData = await populationService.obtainData();

      // Ejemplo de Andalucía
      labelsDisplayed.value = populationService.getYearsAsLabels(populationData);
      changeChartContent( 0, 'Andalucía');

      // labels.value = populationService.getCcaaAsLabels(population);

      // data.value = population.map((item: any) => {
      //   const value = item.total_values;
      //   if (value[0].interval == '2021') {
      //     return value[0].value;
      //   }
      // });

      showChart.value = true;
    }

    return {
      dataDisplayed ,
      labelsDisplayed,
      currentChart,
      changeChartContent,
      genders,
      applyGenderFilter,
      showChart,
      onBeforeMount,
      fetchData,
    }
  }
});
</script>

<style scoped>
</style>
