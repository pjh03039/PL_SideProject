<template>
  <v-bottom-navigation grow>
    <v-btn @click="createQRcode">
      <span>바코드 생성</span>
    </v-btn>
    <v-btn @click="copyQRCode">
      <span>바코드 복사</span>
    </v-btn>
  </v-bottom-navigation>
  <div class="text-center">
    <v-bottom-sheet v-model="sheet">
      <v-card height="500">
        <div class="px-3 py-3 text-end" @click="sheet = !sheet">
          <!-- <v-btn
            :icon="`mdi-numeric-${bottomSheetCnt}`"
            height="40"
            variant="text"
            width="40"
            border
          ></v-btn> -->
          <v-progress-circular
            :model-value="bottomSheetPer"
            :rotate="200"
            :size="20"
            :width="4"
            color="teal"
          >
            <span style="font-size: 7px">{{ bottomSheetCnt }}</span>
          </v-progress-circular>
        </div>
        <v-card-text class="text-center">
          <div id="canvas-container"></div>
        </v-card-text>
      </v-card>
    </v-bottom-sheet>
  </div>
</template>

<script setup>
import html2canvas from 'html2canvas';
import { computed, onBeforeUnmount, ref, watch } from 'vue';
import { useStore } from 'vuex';

const store = useStore();

// 바코드 복사

function createBottomSheet() {
  setTimeout(() => {
    const container = document.getElementById('canvas-container');
    container.appendChild(canvas);
    startInterval(1000);
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

function createQRcode() {
  store.commit('SAVEBARCODE', store.getters.getBarcodeValue);
}

async function copyQRCode() {
  store.commit('setOverlayFlg', true);
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
      store.commit('setOverlayFlg', false);
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

// 바텀 시트

let bottomSheetMaxPer = 5;
let bottomSheetCnt = ref(5);
let bottomSheetPer = computed(() => {
  return (bottomSheetCnt.value / bottomSheetMaxPer) * 100;
});
const barcodeValue = store.getters.getBarcodeValue;
const generateBarcode = () => {
  console.log('바코드 :', barcodeValue);
};

// 인터벌 ID를 저장할 변수
let intervalId = null;

// 인터벌을 시작하는 함수
const startInterval = interval => {
  bottomSheetCnt.value = 5;
  // 기존 인터벌이 있다면 제거
  if (intervalId) {
    clearInterval(intervalId);
  }
  // 새로운 인터벌 설정
  intervalId = setInterval(() => {
    bottomSheetCnt.value--;
    console.log(bottomSheetCnt.value);
    if (bottomSheetCnt.value <= 0) {
      sheet.value = false;
      stopInterval();
    }
  }, interval);
};

// 인터벌을 중지하는 함수
const stopInterval = () => {
  console.log('stopInterval');
  if (intervalId) {
    clearInterval(intervalId);
    intervalId = null;
  }
};

onBeforeUnmount(() => {
  stopInterval();
});
</script>

<style></style>
