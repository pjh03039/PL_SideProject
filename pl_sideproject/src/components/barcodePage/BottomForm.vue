<template>
  <v-bottom-navigation grow>
    <v-btn @click="createQRcode">
      <span>바코드 생성</span>
    </v-btn>
    <v-btn @click="copyAndPasteQRCode" v-if="getSaveBarcodeValue">
      <span>바코드 복사</span>
    </v-btn>
  </v-bottom-navigation>
  <VBottomeSheet>
    <template v-slot:cardContent>
      <v-card-text class="text-center">
        <div id="canvas-container"></div>
      </v-card-text>
    </template>
  </VBottomeSheet>
</template>

<script setup>
import { computed, nextTick } from 'vue';
import VBottomeSheet from '@/components/common/VBottomeSheet.vue';
import { useStore } from 'vuex';

const store = useStore();
let getSaveBarcodeValue = computed(() => {
  return store.getters.getSaveBarcodeValue;
});

function createQRcode() {
  const barcodeValue = store.getters.getBarcodeValue;
  const searchHistory = store.getters.getHistoryBarcodeArr;

  store.commit('SAVEBARCODE', barcodeValue);

  if (barcodeValue && !searchHistory.includes(barcodeValue)) {
    store.dispatch('ADDHISTORY', barcodeValue);
  }
}

// 바코드 복사
import { createBottomQRcode } from '@/hooks/composableQRBottomCreate.js';
let { copyQRCode, pasteQRCode } = createBottomQRcode();

// QR copy && bottomShow
async function copyAndPasteQRCode() {
  store.commit('setDim', true);
  const copyId = 'qrcodeRef';
  await copyQRCode(copyId);
  store.dispatch('OPENSNACKBAR', {
    snackbar: true,
    text: 'QR 코드가 복사되었습니다.',
    timeout: 2000,
  });
  store.commit('SETVBOTTOMSHEET', {
    sheetShow: true,
    height: 600,
    timer: 5,
  });
  await nextTick();
  const pasteId = 'canvas-container';
  pasteQRCode(pasteId); // QR 붙혀넣기
  store.commit('setDim', false);
}
</script>

<style></style>
