<template>
  <v-main>
    <v-container class="d-flex justify-center align-center container">
      <v-btn
        class="ma-1 d-flex align-center justify-center"
        :color="isQRcode ? 'blue' : 'grey'"
        size="large"
        @click="QRcodeType(true)"
      >
        <v-icon size="large">{{ 'mdi-qrcode' }}</v-icon>
      </v-btn>
      <v-btn
        class="ma-1 d-flex align-center justify-center"
        :color="!isQRcode ? 'blue' : 'grey'"
        size="large"
        @click="QRcodeType(false)"
      >
        <v-icon size="x-large">{{ 'mdi-barcode' }}</v-icon>
      </v-btn>
    </v-container>
    <v-container>
      <barcode-input-form></barcode-input-form>
      <v-row
        class="d-flex justify-center align-center"
        ref="qrcodeRef"
        id="qrcodeRef"
        v-if="saveBarcodeValue"
      >
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
import BarcodeInputForm from '@/components/barcodePage/BarcodeInputForm.vue';
import BarcodeForm from '@/components/barcodePage/BarcodeForm.vue';
import ProductInfoForm from '@/components/barcodePage/ProductInfoForm.vue';
import BottomForm from '@/components/barcodePage/BottomForm.vue';
import { useStore } from 'vuex';
import { computed, ref } from 'vue';

const store = useStore();
// const isQRCODE = ref(true);
const isQRcode = computed(() => store.getters.isQRcode);

function QRcodeType(type) {
  store.commit('SETQRCODETYPE', type);
}

// ('SETQRCODETYPE', isQRCODE);

const saveBarcodeValue = computed(() => {
  return store.getters.getSaveBarcodeValue !== '';
});
</script>

<style></style>
