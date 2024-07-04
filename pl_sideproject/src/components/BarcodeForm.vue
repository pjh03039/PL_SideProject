<template>
  <v-container style="text-align: center" ref="qrcodeRef">
    <!-- <div>BarcodeForm 컴포넌트</div> -->
    <vue-qrcode
      ref="qrcodeRef"
      :value="barcodeValue"
      :width="120"
      type="image/png"
      :color="colorObject"
    />
    <button type="button" @click="copyQRCode">바코드 복사</button>
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

// const colorObject = ref({
//   dark: '#000000ff',
//   light: '#ffffffff',
// });

const qrcodeRef = ref(null); // ref 객체 생성

async function copyQRCode() {
  const qrElement = qrcodeRef.value.$el; // vue-qrcode 컴포넌트의 실제 DOM 요소에 접근

  if (!qrElement) {
    console.error('QR 코드를 찾을 수 없습니다.');
    return;
  }

  // 이미지 요소의 src 속성에서 데이터 URL 가져오기
  const imageSrc = qrElement.src;

  const base64Data = imageSrc.split(',')[1]; // base64 데이터 추출
  const byteCharacters = atob(base64Data);
  const byteNumbers = new Array(byteCharacters.length);
  for (let i = 0; i < byteCharacters.length; i++) {
    byteNumbers[i] = byteCharacters.charCodeAt(i);
  }
  const byteArray = new Uint8Array(byteNumbers);
  const blob = new Blob([byteArray], { type: 'image/png' });

  const item = new ClipboardItem({ 'image/png': blob });
  navigator.clipboard
    .write([item])
    .then(() => {
      console.log('QR 코드 이미지가 클립보드에 복사되었습니다.');
    })
    .catch(error => {
      console.error('클립보드 복사 중 오류 발생:', error);
    });
}
</script>

<style></style>
