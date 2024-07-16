<template>
  <v-container>
    <div class="text-center text-h5">
      <strong><span class="text-blue-darken-1">Coway</span> 제품입니다.</strong>
    </div>
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
  </v-container>
</template>

<script setup>
import { useStore } from 'vuex';
import { computed } from 'vue';

const store = useStore();

let getProductObj = computed(() => {
  return store.getters.getProductObj;
});
</script>

<style></style>
