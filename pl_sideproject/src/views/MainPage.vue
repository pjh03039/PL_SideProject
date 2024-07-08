<template>
  <v-main>
    <v-container>
      <barcode-input-form></barcode-input-form>
      <v-row id="qrcodeRef" v-if="evnetFlag || barcodeValue">
        <v-col>
          <barcode-form></barcode-form>
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
import BarcodeInputForm from '@/components/BarcodeInputForm.vue';
import BarcodeForm from '@/components/BarcodeForm.vue';
import ProductInfoForm from '@/components/ProductInfoForm.vue';
import BottomForm from '@/components/BottomForm.vue';
import { useStore } from 'vuex';
import { computed } from 'vue';

const store = useStore();
const evnetFlag = computed(() => {
  return store.getters.barcodeFlag;
});
const barcodeValue = computed(() => {
  return store.getters.barcodeValue;
});
</script>

<style></style>
