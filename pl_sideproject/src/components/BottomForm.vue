<template>
  <v-bottom-navigation grow>
    <v-btn @click="generateBarcode">
      <span>바코드 생성</span>
    </v-btn>
    <v-btn @click="copyQRCode">
      <span>바코드 복사</span>
    </v-btn>
  </v-bottom-navigation>
  <div class="text-center">
    <v-bottom-sheet v-model="sheet">
      <v-card class="text-center" height="400">
        <v-card-text>
          <v-btn variant="text" @click="sheet = !sheet"> close </v-btn>
          <div id="canvas-container"></div>
        </v-card-text>
      </v-card>
    </v-bottom-sheet>
  </div>
</template>

<script setup>
import html2canvas from 'html2canvas';
import { ref, watch } from 'vue';
import { useStore } from 'vuex';

const store = useStore();
const barcodeValue = store.getters.getBarcodeValue;
const generateBarcode = () => {
  console.log('바코드 :', barcodeValue);
};

function createBottomSheet() {
  setTimeout(() => {
    const container = document.getElementById('canvas-container');
    container.appendChild(canvas);
  }, 100);
}

let canvas;
const sheet = ref(false);
const colorObject = ref({
  dark: '#000000ff',
  light: '#ffffffff',
});
const qrcodeRef = ref(null); // ref 객체 생성

watch(sheet, newValue => {
  if (newValue) {
    createBottomSheet();
  }
});

async function copyQRCode() {
  const qrElement = document.getElementById('qrcodeRef'); // vue-qrcode 컴포넌트의 실제 DOM 요소에 접근
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
