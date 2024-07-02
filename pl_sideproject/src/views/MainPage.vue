<template>
  <v-main>
    <v-container>
      <v-row>
        <BarcodeInputForm @barcodeData="getBarcodeData"></BarcodeInputForm>
      </v-row>

      <v-row>
        <BarcodeForm :barcodeValue="barcodeValue"></BarcodeForm>
      </v-row>

      <v-row>
        <ProductInfoForm></ProductInfoForm>
      </v-row>
    </v-container>
  </v-main>
</template>

<script setup>
import { ref } from 'vue';
import BarcodeInputForm from '@/components/BarcodeInputForm.vue';
import BarcodeForm from '@/components/BarcodeForm.vue';
import ProductInfoForm from '@/components/ProductInfoForm.vue';

const barcodeValue = ref('');

const getBarcodeData = barcodeData => {
  console.log(`getBarcodeData => ${barcodeData}`);
  barcodeValue.value = barcodeData;
};
</script>

<style></style>
