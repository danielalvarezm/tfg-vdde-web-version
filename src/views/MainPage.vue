<template>
  <ion-page>
    <ion-header :translucent="true">
      <ion-toolbar color="primary">
        <ion-buttons slot="start">
          <ion-menu-button color="light"></ion-menu-button>
        </ion-buttons>
        <ion-title>
          <p class="ion-hide-sm-down ion-text-center">Visualización de datos demográficos de España</p>
          <p class="ion-hide-sm-up ion-text-center">VDDE</p>
        </ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content>
      <ion-grid>
        <ion-row class="ion-margin-horizontal ion-margin-top ion-justify-content-center">
          <ion-col size-md="10" size-lg="12" size-xl="10" size-sm="10" size-xs="12">
            <h5 class="ion-hide-sm-down ion-text-justify">En esta página podrás obtener información visual de datos
              demográficos al nivel de España.
              Todos los datos son obtenidos a través de un servicio del <a href="https://datos.gob.es/es/"
                target="_blank">Gobierno de España</a>. Los datos se actualizarán una vez se hayan actualizado en la
              página del gobierno.
            </h5>
          </ion-col>
          <h6 class="ion-hide-sm-up ion-text-justify">En esta página podrás obtener información visual de datos
            demográficos al nivel de España.
            Todos los datos son obtenidos a través de un servicio del <a href="https://datos.gob.es/es/"
              target="_blank">Gobierno de España</a>. Los datos se actualizarán una vez se hayan actualizado en la
            página del gobierno.
          </h6>
        </ion-row>

        <ion-row class="ion-margin-horizontal ion-margin-top ion-justify-content-center">
          <p>TODO: Añadir slider</p>
        </ion-row>

        <ion-row class="ion-margin-vertical">
          <ion-header :translucent="true">
            <ion-toolbar color="dark">
              <ion-title>
                <p class="ion-text-center">Seleccione un dato</p>
              </ion-title>
            </ion-toolbar>
          </ion-header>
        </ion-row>

        <ion-row class="ion-justify-content-center ion-margin-horizontal">
          <ion-col size-md="6" size-lg="6" size-xl="6" size-sm="10" size-xs="12">
            <ion-card href="/folder/Poblacion">
              <ion-item>
                <ion-label class="card-title"><b>Población</b></ion-label>
              </ion-item>

              <ion-card-content class="card-text">
                Población según comunidad autónoma, año y género
              </ion-card-content>
            </ion-card>
          </ion-col>

          <ion-col size-md="6" size-lg="6" size-xl="6" size-sm="10" size-xs="12">
            <ion-card>
              <ion-item>
                <ion-label class="card-title"><b>Nacimientos</b></ion-label>
              </ion-item>

              <ion-card-content class="card-text">
                Cantidad de nacimientos según la comunidad autónoma y el año
              </ion-card-content>
            </ion-card>
          </ion-col>
        </ion-row>

        <ion-row class="ion-justify-content-center ion-margin-horizontal">
          <ion-col size-md="6" size-lg="6" size-xl="6" size-sm="10" size-xs="12">
            <ion-card>
              <ion-item>
                <ion-label class="card-title"><b>Defunciones infantiles</b></ion-label>
              </ion-item>

              <ion-card-content class="card-text">
                Defunciones infantiles según el año
              </ion-card-content>
            </ion-card>
          </ion-col>

          <ion-col size-md="6" size-lg="6" size-xl="6" size-sm="10" size-xs="12">
            <ion-card>
              <ion-item>
                <ion-label class="card-title"><b>Índice de fecundidad</b></ion-label>
              </ion-item>

              <ion-card-content class="card-text">
                Índice de fecundidad según la comunidad autónoma y el año
              </ion-card-content>
            </ion-card>
          </ion-col>
        </ion-row>

        <ion-row class="ion-justify-content-center ion-margin-horizontal">
          <ion-col size-md="6" size-lg="6" size-xl="6" size-sm="10" size-xs="12">
            <ion-card>
              <ion-item>
                <ion-label class="card-title"><b>Índice de natalidad</b></ion-label>
              </ion-item>

              <ion-card-content class="card-text">
                Índice de natalidad según la comunidad autónoma y el año
              </ion-card-content>
            </ion-card>
          </ion-col>

          <ion-col size-md="6" size-lg="6" size-xl="6" size-sm="10" size-xs="12">
            <ion-card>
              <ion-item>
                <ion-label class="card-title"><b>Índice de mortalidad infantil</b></ion-label>
              </ion-item>

              <ion-card-content class="card-text">
                Índice de mortalidad infantil según el año y el género
              </ion-card-content>
            </ion-card>
          </ion-col>
        </ion-row>

      </ion-grid>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonButtons, IonMenuButton, IonGrid, IonRow, IonCol, IonCard, IonItem, IonLabel, IonCardContent } from '@ionic/vue';
export default defineComponent({
  name: 'MainPage',
  components: {
    IonContent,
    IonHeader,
    IonPage,
    IonTitle,
    IonToolbar,
    IonButtons,
    IonMenuButton,
    IonGrid,
    IonRow,
    IonCol,
    IonCard,
    IonLabel,
    IonCardContent,
    IonItem
  },
})
</script>

<style scoped>
.card-title {
  font-size: 1.3rem;
}

.card-text {
  color: rgb(23, 23, 23);
  font-size: 1rem;
}
</style>
