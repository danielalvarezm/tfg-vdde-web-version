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
      <p>{{ currentChart }}</p>
      <button @click="changeChart">Change chart</button>
      <p>{{ labels }}</p>
      <p>{{ data }}</p>
      <BarChart v-if="currentChart === 'bar'" :labels="labels" :data="data" />
      <LineChart v-if="currentChart === 'line'" :labels="labels" :data="data" />
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/vue';
import BarChart from './charts/barChart'
import LineChart from './charts/lineChart'

export default defineComponent({
  name: 'InfantDefunctionsPerYearPage',
  components: {
    IonContent,
    IonHeader,
    IonPage,
    IonTitle,
    IonToolbar,
    BarChart,
    LineChart,
  },
  setup() {
    const data = [40, 20, 12, 39, 10, 40, 39, 80, 40, 20, 12, 11];
    const labels = [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December'
    ];
    let currentChart = ref('bar');
    function changeChart() {
      if (currentChart.value === 'bar') {
        currentChart.value = 'line';
      } else {
        currentChart.value = 'bar';
      }
    }
    return {
      data,
      labels,
      currentChart,
      changeChart
    }
  }
});
</script>

<style scoped>
</style>
