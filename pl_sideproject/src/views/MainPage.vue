<template>
  <v-main>
    <v-container>
      <v-row style="justify-content: center">
        <vue-qrcode
          :value="barcodeValue"
          :width="200"
          type="image/png"
          :color="colorObject"
        />
      </v-row>
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
