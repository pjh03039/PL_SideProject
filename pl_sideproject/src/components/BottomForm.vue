<template>
  <v-bottom-navigation grow>
    <v-btn @click="createQRcode">
      <span>바코드 생성</span>
    </v-btn>
    <v-btn @click="copyAndPasteQRCode" v-if="getSaveBarcodeValue">
      <span>바코드 복사</span>
    </v-btn>
  </v-bottom-navigation>
  <div class="text-center">
    <v-bottom-sheet v-model="bottomSheetShow">
      <v-card height="500">
        <div class="px-3 py-3 text-end" @click="clearInterval">
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
import {
  computed,
  nextTick,
  onBeforeUnmount,
  onMounted,
  ref,
  watch,
} from 'vue';
import { useStore } from 'vuex';

const store = useStore();
let getSaveBarcodeValue = computed(() => {
  return store.getters.getSaveBarcodeValue;
});

function createQRcode() {
  store.commit('SAVEBARCODE', store.getters.getBarcodeValue);
}

// 바코드 복사
import { createBottomQRcode } from '@/hooks/composableQRBottomCreate.js';
const copyId = 'qrcodeRef'; //QR복사 id
const pasteId = 'canvas-container'; //QR붙혀넣기 id
const bottomSheetShow = ref(false);
const elTest = ref(document.getElementById(pasteId));
let {
  copyQRCode,
  pasteQRCode,
  bottomSheetPer,
  bottomSheetCnt,
  createBottomTimer,
  stopInterval,
} = createBottomQRcode(copyId, pasteId);

// 바텀 생성

async function copyAndPasteQRCode() {
  store.commit('setOverlayFlg', true);
  await copyQRCode();
  store.dispatch('OPENSNACKBAR', {
    snackbar: true,
    text: 'QR 코드가 복사되었습니다.',
    timeout: 2000,
  });
  bottomSheetShow.value = true;
}

watch(bottomSheetShow, async newValue => {
  if (newValue) {
    await nextTick();
    pasteQRCode(); // QR 붙혀넣기
    store.commit('setOverlayFlg', false);
    createBottomTimer(5, function () {
      bottomSheetShow.value = false;
    }); // 바텀 타이머
  }
});

function clearInterval() {
  bottomSheetShow.value = false;
  stopInterval();
}
</script>

<style></style>
