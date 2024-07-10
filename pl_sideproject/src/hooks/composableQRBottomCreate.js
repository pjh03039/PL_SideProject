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

  return {
    copyQRCode,
    pasteQRCode,
  };
}
