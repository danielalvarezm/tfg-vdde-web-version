<template>
  <ion-page>
    <ion-header :translucent="true">
      <ion-toolbar color="primary">
        <ion-buttons slot="start">
          <ion-menu-button color="light"></ion-menu-button>
        </ion-buttons>
        <ion-title class="ion-text-center">
          <h2 class="ion-hide-md-down ion-text-center"><b>Visualización de datos demográficos de España</b></h2>

          <h2 style = "position:relative; right:20px;" class="ion-hide-md-up ion-text-center"><b>VDDE</b></h2>
        </ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content>
      <ion-grid>
        <ion-row class="ion-margin-horizontal ion-margin-top ion-justify-content-center">
          <ion-col size-md="10" size-lg="12" size-xl="10" size-sm="10" size-xs="12">
            <h5 class="ion-hide-sm-down ion-text-justify">En esta página podrás obtener información visual de <b>datos
              demográficos al nivel de España</b>.
              Todos los datos son obtenidos a través de un servicio del <a href="https://datos.gob.es/es/"
                target="_blank">Gobierno de España</a>. Los datos se actualizarán una vez se hayan actualizado en la
              página del gobierno.
            </h5>
            <h5 class="ion-hide-sm-down ion-text-justify">A su vez, <b>VDDE</b> (Visualización de Datos Demográficos de
              España) genera sus propios datos a través de investigar y combinar el contenido de varios recursos distintos.
            </h5>
          </ion-col>
          <h6 class="ion-hide-sm-up ion-text-justify">En esta página podrás obtener información visual de datos
            demográficos al nivel de España.
            Todos los datos son obtenidos a través de un servicio del <a href="https://datos.gob.es/es/"
              target="_blank">Gobierno de España</a>. Los datos se actualizarán una vez se hayan actualizado en la
            página del gobierno.
          </h6>
          <h6 class="ion-hide-sm-up ion-text-justify">A su vez, <b>VDDE</b> (Visualización de Datos Demográficos de
              España) genera sus propios datos a través de investigar y combinar el contenido de varios recursos distintos.
          </h6>
        </ion-row>

        <ion-row class="ion-margin-vertical">
          <ion-header :translucent="true">
            <ion-toolbar color="dark">
              <ion-title>
                <p class="ion-text-center"><b>Seleccione un dato</b></p>
              </ion-title>
            </ion-toolbar>
          </ion-header>
        </ion-row>

        <ion-row class="ion-justify-content-center ion-margin-horizontal">
          <ion-col size-md="5" size-lg="5" size-xl="5" size-sm="10" size-xs="12">
            <ion-card href="/poblacion-ccaa">
              <img src="../../resources/poblacion.png" />
              <ion-card-header>
                <ion-card-title><b>Población</b></ion-card-title>
                <ion-card-subtitle>Generado por <b>INE</b><br>Sincronización estimada: <b>semanal</b></ion-card-subtitle>
              </ion-card-header>

              <ion-card-content class="card-text">
                Observe los valores de la población española en las distintas comunidades autónomas, según el año y el género.
                <ion-card-subtitle class="ion-margin-top">población, años, géneros, comunidades autónomas</ion-card-subtitle>

              </ion-card-content>
            </ion-card>
          </ion-col>

          <ion-col size-md="5" size-lg="5" size-xl="5" size-sm="10" size-xs="12">
            <ion-card href="/cantidad-nacimientos">
              <img src="../../resources/nacimientos.png" />
              <ion-card-header>
                <ion-card-title><b>Cantidad de nacimientos</b></ion-card-title>
                <ion-card-subtitle>Generado por <b>VDDE</b><br>Sincronización estimada: <b>anual</b></ion-card-subtitle>
              </ion-card-header>

              <ion-card-content class="card-text">
                Aquí podrá apreciar la cantidad de nacimientos que ocurren en España durante distintos años, según la comunidad autónoma.
                <ion-card-subtitle  class="ion-margin-top">nacimientos, años, comunidades autónomas</ion-card-subtitle>
              </ion-card-content>
            </ion-card>
          </ion-col>
        </ion-row>

        <ion-row class="ion-justify-content-center ion-margin-horizontal">
          <ion-col size-md="5" size-lg="5" size-xl="5" size-sm="10" size-xs="12">
            <ion-card href="/indice-natalidad">
              <img src="../../resources/nacimientos.png" />
              <ion-card-header>
                <ion-card-title><b>Índice de natalidad</b></ion-card-title>
                <ion-card-subtitle>Generado por <b>INE</b><br>Sincronización estimada: <b>anual</b></ion-card-subtitle>
              </ion-card-header>

              <ion-card-content class="card-text">
                Contemple el índice o tasa de natalidad en España, en las distintas comunidades autónomas según el año.
                <ion-card-subtitle class="ion-margin-top">nacimientos, natalidad, años, comunidades autónomas</ion-card-subtitle>
              </ion-card-content>
            </ion-card>
          </ion-col>

          <ion-col size-md="5" size-lg="5" size-xl="5" size-sm="10" size-xs="12">
            <ion-card href="/indice-fecundidad">
              <img src="../../resources/nacimientos.png" />
              <ion-card-header>
                <ion-card-title><b>Índice de fecundidad</b></ion-card-title>
                <ion-card-subtitle>Generado por <b>INE</b><br>Sincronización estimada: <b>anual</b></ion-card-subtitle>
              </ion-card-header>

              <ion-card-content class="card-text">
                Compruebe los valores del índice de fecundidad de la población española, en base a la comunidad autónoma y el año.
                <ion-card-subtitle class="ion-margin-top">nacimientos, fecundidad, años, comunidades autónomas</ion-card-subtitle>
              </ion-card-content>
            </ion-card>
          </ion-col>
        </ion-row>

        <ion-row class="ion-justify-content-center ion-margin-horizontal">
          <ion-col size-md="5" size-lg="5" size-xl="5" size-sm="10" size-xs="12">
            <ion-card>
            <img src="../../resources/defunciones.png" />
              <ion-card-header>
                <ion-card-title><b>Defunciones infantiles</b></ion-card-title>
                <ion-card-subtitle>Generado por <b>VDDE</b><br>Sincronización estimada: <b>anual</b></ion-card-subtitle>
              </ion-card-header>

              <ion-card-content class="card-text">
                Observe la cantidad de defunciones infantiles ocurridas en el país en distintos años.
                <ion-card-subtitle class="ion-margin-top">defunciones, infantil, años</ion-card-subtitle>
              </ion-card-content>
            </ion-card>
          </ion-col>

          <ion-col size-md="5" size-lg="5" size-xl="5" size-sm="10" size-xs="12">
            <ion-card href="/tasa-mortalidad-infantil">
              <img src="../../resources/defunciones.png" />
              <ion-card-header>
                <ion-card-title><b>Tasa de mortalidad infantil</b></ion-card-title>
                <ion-card-subtitle>Generado por <b>INE</b><br>Sincronización estimada: <b>anual</b></ion-card-subtitle>
              </ion-card-header>

              <ion-card-content class="card-text">
                Conozca la tasa de mortalidad infantil en España durante distintos años, según el género.
                <ion-card-subtitle class="ion-margin-top">defunciones, mortalidad, infantil, años, género</ion-card-subtitle>
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
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonButtons, IonMenuButton, IonGrid, IonRow, IonCol, IonCard, IonCardContent } from '@ionic/vue';
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
    IonCardContent,
  },
})
</script>

<style scoped>
.card-title {
  font-size: 1.3rem;
}

.card-text {
  color: rgb(23, 23, 23);
  font-size: 1.1rem;
}

.ion-content {
  font-family: Muli !important;
}

</style>
