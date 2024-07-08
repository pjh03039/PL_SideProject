<template>
  <v-bottom-navigation grow>
    <v-btn @click="createQRcode">
      <span>바코드 생성</span>
    </v-btn>
    <v-btn @click="copyQRCode" v-if="getSaveBarcodeValue">
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
import { computed, onBeforeUnmount, ref, watch } from 'vue';
import { useStore } from 'vuex';
import { createBottomQRcode } from '@/hooks/composableQRBottomCreate.js';
const { copyQRCode, sheet, bottomSheetPer, bottomSheetCnt } =
  createBottomQRcode();
const store = useStore();
let getSaveBarcodeValue = computed(() => {
  return store.getters.getSaveBarcodeValue;
});

function createQRcode() {
  store.commit('SAVEBARCODE', store.getters.getBarcodeValue);
}
</script>

<style></style>
