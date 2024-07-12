<template>
  <v-container style="text-align: center" id="barcodeContainer">
    <!-- <div>BarcodeForm 컴포넌트</div> -->
    <template v-if="isQRcode">
      <vue-qrcode
        :value="barcodeValue"
        :width="barcodeWidth"
        type="image/png"
        :color="colorObject"
      />
    </template>
    <template v-else>
      <vue3-barcode
        :value="barcodeValue"
        :width="2"
        :height="50"
        :display-value="false"
      />
    </template>
  </v-container>
</template>

<script setup>
import VueQrcode from 'vue-qrcode';
import { ref, computed, watch } from 'vue';
import { useStore } from 'vuex';
import Vue3Barcode from 'vue3-barcode';

const store = useStore();
const isQRcode = computed(() => store.getters.isQRcode);

let canvas;
const sheet = ref(false);
const colorObject = ref({
  dark: '#000000ff',
  light: '#ffffffff',
});
const barcodeValue = computed(() => {
  return store.getters.getSaveBarcodeValue;
});

const barcodeWidth = computed(() => {
  return store.getters.getbarcodeWidth;
});

const qrcodeRef = ref(null); // ref 객체 생성

watch(sheet, newValue => {
  if (newValue) {
    createBottomSheet();
  }
});

function createBottomSheet() {
  setTimeout(() => {
    const container = document.getElementById('canvas-container');
    container.appendChild(canvas);
  }, 100);
}
</script>

<style></style>
