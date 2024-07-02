<template>
  <v-container>
    <div>BarcodeForm 컴포넌트</div>
    <div>입력 바코드 >> {{ props.barcodeValue }}</div>
  </v-container>
</template>

<script setup>
const props = defineProps({
  barcodeValue: String,
});
</script>

<style></style>
