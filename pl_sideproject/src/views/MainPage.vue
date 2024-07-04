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
      <bottom-form></bottom-form>
    </v-container>
  </v-main>
</template>

<script setup>
import { ref } from 'vue';
import BarcodeInputForm from '@/components/BarcodeInputForm.vue';
import BarcodeForm from '@/components/BarcodeForm.vue';
import ProductInfoForm from '@/components/ProductInfoForm.vue';
import BottomForm from '@/components/BottomForm.vue';

// const barcodeValue = ref('');

const getBarcodeData = barcodeData => {
  console.log(`getBarcodeData => ${barcodeData}`);
  barcodeValue.value = barcodeData;
};

const generateQRCode = () => {
  console.log('QR 코드 생성:', barcodeValue.value);
  // QR 코드 생성 로직을 여기에 추가합니다.
};
import { useStore } from 'vuex';

const store = useStore();

const barcodeValue = store.getters.getBarcodeValue;

const generateBarcode = () => {
  console.log('바코드 :', barcodeValue);
};
</script>

<style>
.full-width-bottom-nav {
  justify-content: center !important;
}
</style>
