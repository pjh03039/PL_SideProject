<template>
  <v-container style="text-align: center">
    <!-- <div>BarcodeForm 컴포넌트</div> -->
    <vue-qrcode
      :value="barcodeValue"
      :width="150"
      type="image/png"
      :color="colorObject"
    />
  </v-container>
</template>

<script setup>
import VueQrcode from 'vue-qrcode';
import html2canvas from 'html2canvas';
import { ref, computed, watch } from 'vue';
import { useStore } from 'vuex';

const store = useStore();

let canvas;
const sheet = ref(false);
const colorObject = ref({
  dark: '#000000ff',
  light: '#ffffffff',
});
const barcodeValue = computed(() => {
  return store.getters.getSaveBarcodeValue;
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
