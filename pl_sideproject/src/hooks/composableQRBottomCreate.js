import html2canvas from 'html2canvas';
import { computed, onBeforeUnmount, ref } from 'vue';

export function createBottomQRcode() {
  // QR
  // QR copy
  let canvas;
  async function copyQRCode(appendElementId) {
    const qrElement = document.getElementById(appendElementId); // vue-qrcode 컴포넌트의 실제 DOM 요소에 접근
    // 이미지 요소의 src 속성에서 데이터 URL 가져오기
    canvas = await html2canvas(qrElement); // 요소를 캡처하여 캔버스로 변환
    try {
      // div 요소 선택
      const canvas = await html2canvas(qrElement); // 요소를 캡처하여 캔버스로 변환
      return new Promise(resolve => {
        canvas.toBlob(async function (blob) {
          const item = new ClipboardItem({ 'image/png': blob });
          await navigator.clipboard.write([item]);
          resolve(true);
        }, 'image/png');
      });
    } catch (error) {
      console.error('요소 이미지 복사 중 오류 발생:', error);
    }
  }

  // QR paste
  function pasteQRCode(createBottomQRcode) {
    const appendHtmlElment = document.getElementById(createBottomQRcode);
    appendHtmlElment.appendChild(canvas);
  }

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
    copyQRCode,
    pasteQRCode,
    createBottomTimer,
    bottomSheetPer,
    bottomSheetCnt,
    stopInterval,
  };
}
