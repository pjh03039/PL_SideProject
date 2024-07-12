<template>
  <div class="text-center">
    <v-bottom-sheet
      v-model="sheetShow"
      @click:outside="clearInterval"
      persistent
    >
      <v-card :height="bottomSheetObj.height">
        <template v-if="bottomSheetObj.timer != 0">
          <div class="px-3 py-3 text-end" @click="clearInterval">
            <!-- <v-btn
              :icon="`mdi-numeric-${bottomSheetCnt}`"
              height="40"
              variant="text"
              width="40"
              border
            ></v-btn> 버튼 형식 -->
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
        </template>
        <template v-else> </template>
        <slot name="cardContent"></slot>
      </v-card>
    </v-bottom-sheet>
  </div>
</template>

<script setup>
import { createBottomSheet } from '@/hooks/composableBottomSheet.js';
import { computed, nextTick, ref, watch } from 'vue';
import { useStore } from 'vuex';
const store = useStore();
const bottomSheetObj = computed(() => store.getters.getBottomSheetObj);
const sheetShow = computed(() => store.getters.getBottomSheetObj.sheetShow);

let { bottomSheetPer, bottomSheetCnt, createBottomTimer, stopInterval } =
  createBottomSheet();

// sheetShow true시
watch(sheetShow, async newValue => {
  if (newValue) {
    createBottomTimer(bottomSheetObj.value.timer, function () {
      clearInterval();
    });
  }
});
function clearInterval() {
  store.commit('SETVBOTTOMSHEET', {
    sheetShow: false,
    height: bottomSheetObj.value.height,
    timer: bottomSheetObj.value.timer,
  });
  stopInterval();
}
</script>

<style></style>
