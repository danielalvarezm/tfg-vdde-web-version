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
              <ion-item>
                <ion-label>Seleccione los datos a mostrar:</ion-label>
                <ion-select value="total" interface="popover" placeholder="Elija una opción" @input="changeData">
                  <ion-select-option value="male">Hombre</ion-select-option>
                  <ion-select-option value="female">Mujer</ion-select-option>
                  <ion-select-option value="total">Total</ion-select-option>
                </ion-select>
              </ion-item>
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
              <ion-button @click="changeChart">Cambiar gráfico</ion-button><br>
            </ion-col>

          </ion-row>
        </ion-list>

        <p>{{ currentChart }}</p>
        <div v-if="showChart === true">
          <BarChart v-if="currentChart === 'bar'" :labels="labels" :data="data" />
          <LineChart v-if="currentChart === 'line'" :labels="labels" :data="data" />
        </div>
      </ion-grid>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import { defineComponent, ref, onBeforeMount } from 'vue';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonGrid, IonCol, IonRow, IonItem, IonList, IonSelect, IonLabel, IonListHeader, IonButton, IonButtons, IonSelectOption, IonMenuButton } from '@ionic/vue';
import BarChart from './charts/barChart'
import LineChart from './charts/lineChart'
import { getPopulation } from '../services/populationService';

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
    IonSelect,
    IonLabel,
    IonListHeader,
    IonButton,
    IonButtons,
    IonSelectOption,
    IonMenuButton
  },
  setup() {
    let data = ref([]);
    let labels = ref([]);
    let currentChart = ref('bar');
    let showChart = ref(false);

    function changeChart() {
      if (currentChart.value === 'bar') {
        currentChart.value = 'line';
      } else {
        currentChart.value = 'bar';
      }
    }

    function changeData() {
      console.log('changeData');
    }

    async function fetchData() {
      const population = await getPopulation();
      labels.value = getMonthsAsLabels(population);

      data.value = population.map((item: any) => {
        const value = item.total_values;
        if (value[0].interval == '2021') {
          return value[0].value;
        }
      });
      showChart.value = true;
    }

    function getMonthsAsLabels(population: any) {
      return population.map((item: any) => {
        return item.ccaa;
      });
    }

    onBeforeMount(async () => { fetchData() });

    return {
      data,
      labels,
      currentChart,
      showChart,
      changeChart,
      onBeforeMount,
      fetchData,
      changeData
    }
  }
});
</script>

<style scoped>
</style>
