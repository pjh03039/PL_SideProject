<template>
  <v-container ref="qrcodeRef" style="text-align: center">
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
  return store.state.barcodeValue;
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

async function copyQRCode() {
  const qrElement = qrcodeRef.value.$el; // vue-qrcode 컴포넌트의 실제 DOM 요소에 접근
  // 이미지 요소의 src 속성에서 데이터 URL 가져오기
  canvas = await html2canvas(qrElement); // 요소를 캡처하여 캔버스로 변환
  // div 요소 선택
  try {
    const canvas = await html2canvas(qrElement); // 요소를 캡처하여 캔버스로 변환
    canvas.toBlob(async function (blob) {
      const item = new ClipboardItem({ 'image/png': blob });
      await navigator.clipboard.write([item]);
      console.log('요소 이미지가 클립보드에 복사되었습니다.');
      store.dispatch('OPENSNACKBAR', {
        snackbar: true,
        text: 'QR 코드가 복사되었습니다.',
        timeout: 2000,
      });
      sheet.value = true;
    }, 'image/png');
  } catch (error) {
    console.error('요소 이미지 복사 중 오류 발생:', error);
  }
}
</script>

<style></style>
