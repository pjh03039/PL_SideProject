<template>
  <v-container>
    <v-row>
      <v-col v-if="cowayProductCheck(getSaveBarcodeValue)">
        <v-list class="text-center"><strong>코웨이 제품입니다.</strong></v-list>
        <v-list>바코드 : {{ getProductObj.productBarcode }}</v-list>
        <v-list
          >자재코드 : {{ getProductObj.productInfo.makrModelCode }}</v-list
        >
        <v-list>프로젝트명 : {{ getProductObj.productInfo.prodName }}</v-list>
        <v-list>모델명 : {{ getProductObj.productInfo.productModel }}</v-list>
        <v-list>제품 이름 : {{ getProductObj.productInfo.productName }}</v-list>
        <v-list v-if="getProductObj.productInfo.wifiType !== 'X'"
          >wifiType :
          {{
            getProductObj.productInfo.wifiType === 'M' ? 'MQTT' : 'TCP'
          }}</v-list
        >
      </v-col>
      <v-col v-else>바코드 : {{ getSaveBarcodeValue }}</v-col>
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
