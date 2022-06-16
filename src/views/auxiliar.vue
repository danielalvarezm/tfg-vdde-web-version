<template>
  <ion-page>
    <ion-content>
      <p>hola</p>
    </ion-content>
  </ion-page>

</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { IonPage, IonContent } from '@ionic/vue';

export default defineComponent({
  name: 'AuxiliarPage',
  components: {
    IonPage,
    IonContent
  },
})
</script>

<style scoped>
</style>
