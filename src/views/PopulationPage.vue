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
                      :disabled="onlyAnOptionIsSelected(entry.val)"
                      @update:modelValue="entry.isChecked = $event"
                      @ionChange="reRenderChart"
                      :modelValue="entry.isChecked">
                    </ion-checkbox>
                  </ion-item>
                </ion-list>
              </form>
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

              <ion-item>
                <ion-label>Seleccione la localización de la que quiera ver información:</ion-label>
                <ion-select v-model="locationSelected" @ionChange="reRenderChart" interface="popover" placeholder="Elija una opción">
                  <ion-select-option v-for="entry in autonomousCommunities" :key="entry.val" :value="entry.val">{{entry.text}}</ion-select-option>
                </ion-select>
              </ion-item>
            </ion-col>
            <!-- Cuando se marqué la opción de todas las comunidades, que aparezca el select con las opciones de los años -->
          </ion-row>
        </ion-list>

        <p>{{ currentChart }}</p>
        <p>{{genders}}</p>
        <!-- center h2-->
        <h2 class="ion-text-center">{{locationSelected}}</h2>

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
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonGrid, IonCol, IonRow, IonItem, IonList, IonSelect, IonCheckbox, IonLabel, IonListHeader, IonButtons, IonSelectOption, IonMenuButton } from '@ionic/vue';
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
    let locationSelected = ref('Andalucía');
    let currentChart = ref('bar');
    let genders = ref([
      { text: 'Total', val: 'total', isChecked: true },
      { text: 'Hombre', val: 'male', isChecked: true },
      { text: 'Mujer', val: 'female', isChecked: true }
    ]);
    let autonomousCommunities = ref([
      { text: 'Todas las comunidades', val: 'Todas las comunidades'},
      { text: 'Andalucía', val: 'Andalucía' },
      { text: 'Principado de Asturias', val: 'Principado de Asturias' },
      { text: 'Islas Baleares', val: 'Illes Balears' },
      { text: 'Canarias', val: 'Canarias' },
      { text: 'Cantabria', val: 'Cantabria'},
      { text: 'Castilla y León', val: 'Castilla y León'},
      { text: 'Castilla - La Mancha', val: 'Castilla - La Mancha'},
      { text: 'Cataluña', val: 'Cataluña'},
      { text: 'Comunidad Valenciana', val: 'Comunitat Valenciana'},
      { text: 'Extremadura', val: 'Extremadura'},
      { text: 'Galicia', val: 'Galicia'},
      { text: 'Comunidad de Madrid', val: 'Comunidad de Madrid'},
      { text: 'Región de Murcia', val: 'Región de Murcia'},
      { text: 'Comunidad Foral de Navarra', val: 'Comunidad Foral de Navarra'},
      { text: 'País Vasco', val: 'País Vasco'},
      { text: 'La Rioja', val: 'La Rioja'},
      { text: 'Ceuta', val: 'Ceuta'},
      { text: 'Melilla', val: 'Melilla'},

    ])

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    function changeChartContent(year = 0) {
      const gendersToDisplay = filterCheckedGenders(genders.value);

      if (locationSelected.value != 'Todas las comunidades') {
        labelsDisplayed.value = populationService.getYearsAsLabels(populationData);
        // TODO: Esto va fuera del if pero por ahora está aquí para que no pete
        dataDisplayed.value = populationService.filter(populationData,"0", gendersToDisplay, locationSelected.value);
      }
      else {
        labelsDisplayed.value = populationService.getAutonomousCommunitiesAsLabels(populationData);
        dataDisplayed.value = populationService.filter(populationData,"2021", gendersToDisplay, locationSelected.value);
      }
      // dataDisplayed.value = populationService.filter(populationData, 0, gendersToDisplay, locationSelected.value);

      updateChart();
    }

    function updateChart() {
      showChart.value = false;
      setTimeout(() => {
        showChart.value = true;
      }, 0);
    }

    function reRenderChart() {
      changeChartContent( 0);
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

    function onlyAnOptionIsSelected(text: string) {
      const checkedOptions = genders.value.filter(gender => gender.isChecked == true);
      return (checkedOptions.length == 1 && checkedOptions[0].val == text)
    }

    // Antes de que se muestre la página, cargamos los datos
    onBeforeMount(async () => { fetchData() });

    // Método asíncrono para cargar los datos de la población
    async function fetchData() {
      populationData = await populationService.obtainData();
      changeChartContent();

      /*
       dataDisplayed.value = population.map((item: any) => {
         const value = item.total_values;
         if (value[0].interval == '2021') {
           return value[0].value;
         }
       });
      */

      showChart.value = true;
    }

    return {
      dataDisplayed ,
      labelsDisplayed,
      currentChart,
      locationSelected,
      changeChartContent,
      genders,
      autonomousCommunities,
      updateChart,
      onlyAnOptionIsSelected,
      reRenderChart,
      showChart,
      onBeforeMount,
      fetchData,
    }
  }
});
</script>

<style scoped>
</style>
