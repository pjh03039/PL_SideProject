import html2canvas from 'html2canvas';
import { computed, onBeforeUnmount, ref, watch } from 'vue';
import { useStore } from 'vuex';

export function createBottomQRcode() {
  const store = useStore();
  // 바코드 복사
  let canvas;

  async function copyQRCode(qrcodeRef) {
    store.commit('setOverlayFlg', true);
    console.log(`qrcodeRef ${qrcodeRef}`);
    const qrElement = qrcodeRef; // vue-qrcode 컴포넌트의 실제 DOM 요소에 접근
    // 이미지 요소의 src 속성에서 데이터 URL 가져오기
    canvas = await html2canvas(qrElement); // 요소를 캡처하여 캔버스로 변환
    try {
      // div 요소 선택
      const canvas = await html2canvas(qrElement); // 요소를 캡처하여 캔버스로 변환
      canvas.toBlob(async function (blob) {
        const item = new ClipboardItem({ 'image/png': blob });
        await navigator.clipboard.write([item]);
        console.log('요소 이미지가 클립보드에 복사되었습니다.');
        store.commit('setOverlayFlg', false);
        sheet.value = true;
        store.dispatch('OPENSNACKBAR', {
          snackbar: true,
          text: 'QR 코드가 복사되었습니다.',
          timeout: 2000,
        });
      }, 'image/png');
    } catch (error) {
      console.error('요소 이미지 복사 중 오류 발생:', error);
    }
  }

  // 바텀 시트
  const sheet = ref(false);

  function createBottomSheet(appendHtmlElment, bottomSetTime) {
    console.log(`appendHtmlElment ${appendHtmlElment}`);
    appendHtmlElment.appendChild(canvas);
    startInterval(1000, bottomSetTime);
  }

  let bottomSheetMaxPer = 0;
  let bottomSheetCnt = ref(0);
  let bottomSheetPer = computed(() => {
    return (bottomSheetCnt.value / bottomSheetMaxPer) * 100;
  });

  // 인터벌 ID를 저장할 변수
  let intervalId = null;

  // 인터벌을 시작하는 함수
  const startInterval = (interval, bottomSetTime) => {
    bottomSheetMaxPer = bottomSetTime;
    bottomSheetCnt.value = bottomSetTime;
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
  return {
    createBottomSheet,
    copyQRCode,
    sheet,
    bottomSheetPer,
    bottomSheetCnt,
  };
}
