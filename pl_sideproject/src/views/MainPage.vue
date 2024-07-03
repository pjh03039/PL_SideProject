<template>
  <v-main>
    <barcode-input-form @barcodeData="getBarcodeData"></barcode-input-form>

    <barcode-form :barcodeValue="barcodeValue"></barcode-form>

    <product-info-form></product-info-form>
  </v-main>
</template>

<script setup>
import VueQrcode from 'vue-qrcode';
import { ref } from 'vue';
import BarcodeInputForm from '@/components/BarcodeInputForm.vue';
import BarcodeForm from '@/components/BarcodeForm.vue';
import ProductInfoForm from '@/components/ProductInfoForm.vue';

const barcodeValue = ref('');

const colorObject = ref({
  dark: '#000000ff',
  light: '#ffffffff',
});

const getBarcodeData = barcodeData => {
  console.log(`getBarcodeData => ${barcodeData}`);
  barcodeValue.value = barcodeData;
};
</script>

<style></style>
