<template>
  <v-bottom-navigation grow>
    <v-btn @click="generateBarcode">
      <span>바코드 생성</span>
    </v-btn>
    <v-btn>
      <span>바코드 삭제</span>
    </v-btn>
  </v-bottom-navigation>
</template>

<script setup>
import { useStore } from 'vuex';

const store = useStore();
const barcodeValue = store.getters.getBarcodeValue;
const generateBarcode = () => {
  console.log('바코드 :', barcodeValue);
};
</script>

<style></style>
