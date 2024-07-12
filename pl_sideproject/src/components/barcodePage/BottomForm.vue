<template>
  <v-bottom-navigation grow>
    <v-btn @click="createQRcode">
      <span>바코드 생성</span>
    </v-btn>
    <v-btn @click="copyAndPasteQRCode('bacode')" v-if="getSaveBarcodeValue">
      <span>바코드 복사</span>
    </v-btn>
    <v-btn
      @click="copyAndPasteQRCode('barcodeWithcontext')"
      v-if="getSaveBarcodeValue"
    >
      <span>바코드&내용 복사</span>
    </v-btn>
    <v-btn @click="resizeBarcode" v-if="getSaveBarcodeValue && isQRcode">
      <span>바코드 조절</span>
    </v-btn>
  </v-bottom-navigation>
  <VBottomeSheet>
    <template v-slot:cardContent>
      <template v-if="optionBottomViewType === 'copy'">
        <v-card-text class="text-center">
          <div id="canvas-container"></div>
        </v-card-text>
      </template>
      <template v-else-if="optionBottomViewType === 'resize'">
        <v-list>
          <v-list-item
            v-for="tile in tiles"
            :key="tile.title"
            :prepend-icon="`${tile.icon}`"
            :title="tile.title"
            @click="sheet = false"
          >
            <v-slider
              v-model="sliderValue"
              @end="setSliderValue"
              @change="changeEvent"
              :max="max"
              :min="min"
              class="slider"
            ></v-slider>
          </v-list-item>
        </v-list>
      </template>
    </template>
  </VBottomeSheet>
</template>

<script setup>
import { computed, nextTick, ref } from 'vue';
import VBottomeSheet from '@/components/common/VBottomeSheet.vue';
import { useStore } from 'vuex';

const store = useStore();
let getSaveBarcodeValue = computed(() => {
  return store.getters.getSaveBarcodeValue;
});
const isQRcode = computed(() => store.getters.isQRcode);

// 바코드 생성
import { composableRecentSearchHistory } from '@/hooks/composableRecentSearchHistory.js';
let { addHistory } = composableRecentSearchHistory();
function createQRcode() {
  const barcodeValue = store.getters.getBarcodeValue;
  const searchHistoryArr = store.getters.getSearchHistoryArr;

  store.commit('SAVEBARCODE', barcodeValue);

  if (barcodeValue && !searchHistoryArr.includes(barcodeValue)) {
    addHistory(barcodeValue);
  }

  setTimeout(() => {
    const scrollHeight = document.querySelector('.container').scrollHeight; // 스크롤할 컨테이너 선택
    window.scrollTo({ top: scrollHeight, behavior: 'smooth' }); // 수직 스크롤을 문서의 높이로 이동
  }, 10);
}

// 바코드 복사
import { createBottomQRcode } from '@/hooks/composableQRBottomCreate.js';
let { copyQRCode, pasteQRCode } = createBottomQRcode();

let optionBottomViewType = ref('');

// QR copy && bottomShow
async function copyAndPasteQRCode(type) {
  optionBottomViewType.value = 'copy';
  store.commit('setDim', true);
  let copyId = 'qrcodeRef';
  if (type === 'bacode') {
    copyId = 'barcodeContainer';
  } else {
    copyId = 'qrcodeRef';
  }
  await copyQRCode(copyId);
  const bottomSheetHeight = document.getElementById(copyId).offsetHeight + 100;
  console.log(bottomSheetHeight);
  store.dispatch('OPENSNACKBAR', {
    snackbar: true,
    text: 'QR 코드가 복사되었습니다.',
    timeout: 2000,
  });
  store.commit('SETVBOTTOMSHEET', {
    sheetShow: true,
    height: bottomSheetHeight,
    timer: 5,
  });
  await nextTick();
  const pasteId = 'canvas-container';
  pasteQRCode(pasteId); // QR 붙혀넣기
  store.commit('setDim', false);
}

// 바코드 크기 조절

const tiles = ref([{ icon: 'mdi-arrow-expand', title: 'Size' }]);
const max = ref(300);
const min = ref(30);
let sliderValue = ref(store.getters.getbarcodeWidth);

function resizeBarcode() {
  optionBottomViewType.value = 'resize';
  store.commit('SETVBOTTOMSHEET', {
    sheetShow: true,
    height: 100,
    timer: 0,
  });
}
function setSliderValue(value) {
  sliderValue.value = value;
  store.commit('SETBARCODEWITH', value);
  console.log(`END Event ${value}`);
}
function changeEvent(value) {
  sliderValue.value = value;
  store.commit('SETBARCODEWITH', value);
  console.log(`Change Event ${value}`);
}
</script>

<style>
.slider {
  padding: 0 12px;
  /* 좌우 여백 설정 */
}
</style>
