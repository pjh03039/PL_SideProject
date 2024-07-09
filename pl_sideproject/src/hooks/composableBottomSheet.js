import html2canvas from 'html2canvas';
import { computed, onBeforeUnmount, ref } from 'vue';
import { useStore } from 'vuex';

export function createBottomSheet() {
  // bottomSheet
  let bottomSheetMaxPer = 0;
  let bottomSheetCnt = ref(0);
  let bottomSheetPer = computed(() => {
    return (bottomSheetCnt.value / bottomSheetMaxPer) * 100;
  });

  // bottomTimer
  function createBottomTimer(bottomSetTime, callback) {
    // console.log(`createBottomQRcode ${createBottomQRcode}`);
    startInterval(1000, bottomSetTime, callback);
  }

  // 인터벌 ID를 저장할 변수
  let intervalId = null;

  // 인터벌을 시작하는 함수
  const startInterval = (interval, bottomSetTime, callback) => {
    bottomSheetMaxPer = bottomSetTime;
    bottomSheetCnt.value = bottomSetTime;
    // 기존 인터벌이 있다면 제거
    if (intervalId) {
      clearInterval(intervalId);
    }
    // 새로운 인터벌 설정
    intervalId = setInterval(() => {
      bottomSheetCnt.value--;
      if (bottomSheetCnt.value <= 0) {
        callback();
        stopInterval();
      }
    }, interval);
  };

  // 인터벌을 중지하는 함수
  const stopInterval = () => {
    if (intervalId) {
      clearInterval(intervalId);
      intervalId = null;
    }
  };
  // 생명 주기 인터벌 중지
  onBeforeUnmount(() => {
    console.log('onBeforeUnmount');
    stopInterval();
  });
  return {
    createBottomTimer,
    bottomSheetPer,
    bottomSheetCnt,
    stopInterval,
  };
}
