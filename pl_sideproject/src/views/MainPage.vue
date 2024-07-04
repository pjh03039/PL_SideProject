<template>
  <v-main>
    <v-container>
      <barcode-input-form @barcodeData="getBarcodeData"></barcode-input-form>
      <v-row>
        <v-col>
          <barcode-form :barcodeValue="barcodeValue"></barcode-form>
        </v-col>
        <v-col>
          <product-info-form></product-info-form>
        </v-col>
      </v-row>
    </v-container>
  </v-main>
</template>

<script setup>
import { ref, computed } from 'vue';
import BarcodeInputForm from '@/components/BarcodeInputForm.vue';
import BarcodeForm from '@/components/BarcodeForm.vue';
import ProductInfoForm from '@/components/ProductInfoForm.vue';

const barcodeValue = ref('');

const getBarcodeData = barcodeData => {
  console.log(`getBarcodeData => ${barcodeData}`);
  barcodeValue.value = barcodeData;
};
</script>

<style>
.full-width-bottom-nav {
  justify-content: center !important;
}
</style>
