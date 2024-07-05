<template>
  <v-main>
    <v-container>
      <barcode-input-form></barcode-input-form>
      <v-row id="qrcodeRef">
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
</script>

<style></style>
