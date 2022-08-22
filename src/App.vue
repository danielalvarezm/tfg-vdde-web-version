<template>
  <ion-app>
    <ion-split-pane content-id="main-content">
      <ion-menu content-id="main-content" type="overlay">
        <div class="center-text title-style">
          <ion-text><b>VDDE</b></ion-text>
        </div>
        <ion-content>
          <ion-list id="inbox-list">
            <ion-row class="ion-justify-content-center">
              <img class="logo" src="../public/assets/icon/logo.png" />
           </ion-row>
           <ion-text>contacto@vdde.es</ion-text><br>
           <ion-text>+34 612 345 678</ion-text>
           <hr>
            <ion-menu-toggle auto-hide="false" v-for="(p, i) in appPages" :key="i">
              <ion-item button @click="selectedIndex = i" router-direction="root" :router-link="p.url" lines="none"
                detail="false" class="hydrated" :class="{ selected: isSelected(p.url)  }">
                <ion-icon slot="start" :ios="p.iosIcon" :md="p.mdIcon"></ion-icon>
                <ion-label>{{ p.title }}</ion-label>
              </ion-item>
            </ion-menu-toggle>
          </ion-list>
        </ion-content>
      </ion-menu>
      <ion-router-outlet id="main-content"></ion-router-outlet>
    </ion-split-pane>
  </ion-app>
</template>

<script lang="ts">
import { IonApp, IonRow, IonContent, IonIcon, IonItem, IonLabel, IonList,  IonMenu, IonMenuToggle, IonRouterOutlet, IonSplitPane } from '@ionic/vue';
import { defineComponent, ref } from 'vue';
import { useRoute } from 'vue-router';
import { homeSharp, homeOutline, barChartSharp, barChartOutline, settingsSharp, settingsOutline } from 'ionicons/icons';

export default defineComponent({
  name: 'App',
  components: {
    IonApp,
    IonRow,
    IonContent,
    IonIcon,
    IonItem,
    IonLabel,
    IonList,
    IonMenu,
    IonMenuToggle,
    IonRouterOutlet,
    IonSplitPane,
  },
  setup() {
    const selectedIndex = ref(0);
    const appPages = [
      {
        title: 'Inicio',
        url: '/menu-principal',
        iosIcon: homeOutline,
        mdIcon: homeSharp
      },
      {
        title: 'Población según la CCAA',
        url: '/poblacion-ccaa',
        iosIcon: barChartOutline,
        mdIcon: barChartSharp
      },
      {
        title: 'Cantidad de nacimientos',
        url: '/cantidad-nacimientos',
        iosIcon: barChartOutline,
        mdIcon: barChartSharp
      },
      {
        title: 'Índice de fecundidad',
        url: '/indice-fecundidad',
        iosIcon: barChartOutline,
        mdIcon: barChartSharp
      },
      {
        title: 'Índice de natalidad',
        url: '/indice-natalidad',
        iosIcon: barChartOutline,
        mdIcon: barChartSharp
      },
      {
        title: 'Tasa de mortalidad infantil',
        url: '/tasa-mortalidad-infantil',
        iosIcon: barChartOutline,
        mdIcon: barChartSharp
      },
      {
        title: 'Defunciones infantiles',
        url: '/defunciones-infantiles',
        iosIcon: barChartOutline,
        mdIcon: barChartSharp
      },
      {
        title: 'Ajustes',
        url: '',
        iosIcon: settingsOutline,
        mdIcon: settingsSharp,
      }
    ];

    const path = window.location.pathname.split('/')[1];
    if (path !== undefined) {
      selectedIndex.value = appPages.findIndex(page => page.title.toLowerCase() === path.toLowerCase());
    }
    console.log(path);

    const route = useRoute();

    return {
      selectedIndex,
      appPages,
      barChartOutline,
      barChartSharp,
      isSelected: (url: string) => url === route.path ? 'selected' : ''
    }
  }
});
</script>

<style scoped>
a:link {
  color: rgb(255, 255, 255);
  background-color: transparent;
  text-decoration: none;
}

a:hover {
  color: rgb(255, 255, 255);
  background-color: transparent;
  text-decoration: underline;
}

a:visited {
  color: rgb(255, 255, 255);
  background-color: transparent;
  text-decoration: none;
}

a:active {
  color: rgb(255, 255, 255);
  background-color: transparent;
  text-decoration: underline;
}

.center-text {
  text-align: center;
}

.relocate.md {
  margin-top: -1.8rem;
  margin-bottom: -0.5rem;
}

.relocate.ios {
  margin-top: -1.8rem;
}

.logo {
  width: 50%;
  margin-top: -1.8rem;
  margin-bottom: 0.5rem;
}

.title-style {
  font-size: 1.5rem;
  background-color: #3880FF;
  padding-top: 0.8rem;
  padding-bottom: 0.8rem;

}

ion-content.ios ion-text {
  margin-left: 1rem;
  color: #747474;
}

ion-content.md ion-text {
  margin-left: 0.2rem;
  color: #747474;
}

ion-menu ion-content {
  --background: var(--ion-item-background, var(--ion-background-color, #fff));
}

ion-menu.md ion-content {
  --padding-start: 8px;
  --padding-end: 8px;
  --padding-top: 20px;
  --padding-bottom: 20px;
}

ion-menu.md ion-list {
  padding: 20px 0;
}

ion-menu.md ion-note {
  margin-bottom: 30px;
}

ion-menu.md ion-list-header,
ion-menu.md ion-note {
  padding-left: 10px;
}

ion-menu.md ion-list#inbox-list {
  border-bottom: 1px solid var(--ion-color-step-150, #d7d8da);
}

ion-menu.md ion-list#inbox-list ion-list-header {
  font-size: 22px;
  font-weight: 600;

  min-height: 20px;
}

ion-menu.md ion-list#labels-list ion-list-header {
  font-size: 16px;

  margin-bottom: 18px;

  color: #757575;

  min-height: 26px;
}

ion-menu.md ion-item {
  --padding-start: 10px;
  --padding-end: 10px;
  border-radius: 4px;
}

ion-menu.md ion-item.selected {
  --background: rgba(var(--ion-color-primary-rgb), 0.14);
}

ion-menu.md ion-item.selected ion-icon {
  color: var(--ion-color-primary);
}

ion-menu.md ion-item ion-icon {
  color: #616e7e;
}

ion-menu.md ion-item ion-label {
  font-weight: 500;
}

ion-menu.ios ion-content {
  --padding-bottom: 20px;
}

ion-menu.ios ion-list {
  padding: 20px 0 0 0;
}

ion-menu.ios ion-note {
  line-height: 24px;
  margin-bottom: 20px;
}

ion-menu.ios ion-item {
  --padding-start: 16px;
  --padding-end: 16px;
  --min-height: 50px;
}

ion-menu.ios ion-item.selected ion-icon {
  color: var(--ion-color-primary);
}

ion-menu.ios ion-item ion-icon {
  font-size: 24px;
  color: #73849a;
}

ion-menu.ios ion-list#labels-list ion-list-header {
  margin-bottom: 8px;
}

ion-menu.ios ion-list-header,
ion-menu.ios ion-note {
  padding-left: 16px;
  padding-right: 16px;
}

ion-menu.ios ion-note {
  margin-bottom: 8px;
}

ion-note {
  display: inline-block;
  font-size: 16px;

  color: var(--ion-color-medium-shade);
}

ion-item.selected {
  --color: var(--ion-color-primary);
}
</style>
