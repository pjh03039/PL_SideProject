<template>
  <v-container>
    <div class="text-center text-h5">
      <strong><span class="text-blue-darken-1">Coway</span> 제품입니다.</strong>
    </div>
    <v-list>
      <v-list-item>바코드 : {{ getProductObj.productBarcode }}</v-list-item>
      <v-list-item
        >자재코드 : {{ getProductObj.productInfo.makrModelCode }}</v-list-item
      >
      <v-list-item
        >프로젝트명 : {{ getProductObj.productInfo.prodName }}</v-list-item
      >
      <v-list-item
        >모델명 : {{ getProductObj.productInfo.productModel }}</v-list-item
      >
      <v-list-item
        >제품 이름 : {{ getProductObj.productInfo.productName }}</v-list-item
      >
    </v-list>
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
let getProductObj = computed(() => {
  return store.getters.getProductObj;
});

function cowayProductCheck(getSaveBarcodeValue) {
  let popCode = getSaveBarcodeValue.substring(3, 8);
  if (usefulBarcodeCheck(getSaveBarcodeValue) && popCodeCheck(popCode)) {
    let index = popCodeArr.findIndex(code => code === popCode);

    store.dispatch('UPDATEPRODUCT', {
      productBarcode: getSaveBarcodeValue,
      productInfo: standDataDev.deviceInfos[index],
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
</script>

<style></style>
