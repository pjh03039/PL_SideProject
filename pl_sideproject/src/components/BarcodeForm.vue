<template>
  <v-container>
    <div>BarcodeForm 컴포넌트</div>
    <div>입력 바코드 >> {{ props.barcodeValue }}</div>
    <vue-qrcode
      :value="barcodeValue"
      :width="200"
      type="image/png"
      :color="colorObject"
    />
  </v-container>
</template>

<script setup>
import VueQrcode from 'vue-qrcode';
import { ref } from 'vue';

const props = defineProps({
  barcodeValue: {
    type: String,
    required: false,
  },
});

const colorObject = ref({
  dark: '#000000ff',
  light: '#ffffffff',
});
</script>

<style></style>
