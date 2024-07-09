<template>
  <v-container>
    <v-row>
      <v-col v-if="cowayProductCheck(getSaveBarcodeValue)"
        >코웨이 제품입니다
        <v-list>바코드 : {{ getProductInfo.productBarcode }}</v-list>
        <v-list>자재코드 : {{ getProductInfo.makrModelCode }}</v-list>
        <v-list>POP코드 : {{ getProductInfo.modelCode }}</v-list>
        <v-list>제품 이름 : {{ getProductInfo.productName }}</v-list>
        <v-list>wifiType : {{ getProductInfo.wifiType }}</v-list></v-col
      >
      <v-col v-else>{{ getSaveBarcodeValue }}</v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { useStore } from 'vuex';
import { computed } from 'vue';

const standDataDev = JSON.parse(localStorage.getItem('standDataDev'));
const popCodeArr = standDataDev.deviceInfos.map(device => device.modelCode);

const store = useStore();

let getSaveBarcodeValue = computed(() => {
  return store.getters.getSaveBarcodeValue.toUpperCase();
});
let getProductInfo = computed(() => {
  return store.getters.getProductInfo;
});

function cowayProductCheck(getSaveBarcodeValue) {
  let popCode = getSaveBarcodeValue.substring(3, 8);
  if (usefulBarcodeCheck(getSaveBarcodeValue) && popCodeCheck(popCode)) {
    let index = popCodeArr.findIndex(code => code === popCode);
    store.dispatch('UPDATEPRODUCT', {
      productBarcode: getSaveBarcodeValue,
      makrModelCode: standDataDev.deviceInfos[index].makrModelCode,
      modelCode: standDataDev.deviceInfos[index].modelCode,
      productName: standDataDev.deviceInfos[index].productName,
      wifiType: standDataDev.deviceInfos[index].wifiType,
    });
    return true;
  }
}

function usefulBarcodeCheck(getSaveBarcodeValue) {
  return /^(?=[a-zA-Z0-9]{18}$)(?=[a-zA-Z0-9]{8}[a-zA-Z0-9]{10}$)(?=[a-zA-Z0-9]{13}\d{5}$)/.test(
    getSaveBarcodeValue,
  );
}

function popCodeCheck(popCode) {
  let index = popCodeArr.findIndex(code => code === popCode);
  if (index > -1) {
    return true;
  } else {
    return false;
  }
}

function clearProductInfo() {
  store.dispatch('UPDATEPRODUCT', {
    productBarcode: '',
    makrModelCode: '',
    modelCode: '',
    productName: '',
    wifiType: '',
  });
}
</script>

<style></style>
