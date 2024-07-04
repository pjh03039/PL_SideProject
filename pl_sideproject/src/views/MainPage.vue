<template>
  <v-main>
    <v-container>
      <barcode-input-form @barcodeData="getBarcodeData"></barcode-input-form>

      <barcode-form :barcodeValue="barcodeValue"></barcode-form>

      <product-info-form></product-info-form>
    </v-container>

    <v-bottom-navigation :color="color" grow class="full-width-bottom-nav">
      <v-btn block>
        <span>바코드 생성</span>
      </v-btn>
      <v-btn block>
        <span>바코드 삭제</span>
      </v-btn>
    </v-bottom-navigation>
  </v-main>
</template>

<script setup>
import { ref, computed } from 'vue';
import BarcodeInputForm from '@/components/BarcodeInputForm.vue';
import BarcodeForm from '@/components/BarcodeForm.vue';
import ProductInfoForm from '@/components/ProductInfoForm.vue';

const barcodeValue = ref('');
const value = ref(0);

const color = computed(() => {
  switch (value.value) {
    case 0:
      return 'blue-grey';
    case 1:
      return 'teal';
    case 2:
      return 'brown';
    case 3:
      return 'indigo';
    default:
      return 'blue-grey';
  }
});

const getBarcodeData = barcodeData => {
  console.log(`getBarcodeData => ${barcodeData}`);
  barcodeValue.value = barcodeData;
};
</script>

<style>
.full-width-bottom-nav {
  justify-content: center !important;
}

.v-bottom-navigation .v-btn {
  flex: 1;
  margin: 0;
}
</style>
