import { useStore } from 'vuex';
import { computed } from 'vue';

export function composableCowayProductCheck() {
  const standDataDev = JSON.parse(localStorage.getItem('standDataDev'));
  const popCodeArr = standDataDev.deviceInfos.map(device => device.modelCode);

  const store = useStore();

  let getSaveBarcodeValue = computed(() => {
    return store.getters.getSaveBarcodeValue.toUpperCase();
  });
  let getProductObj = computed(() => {
    return store.getters.getProductObj;
  });

  function cowayProductCheck(getSaveBarcodeValue) {
    let popCode = getSaveBarcodeValue.substring(3, 8);
    if (usefulBarcodeCheck(getSaveBarcodeValue) && popCodeCheck(popCode)) {
      let index = popCodeArr.findIndex(code => code === popCode);

      store.dispatch('UPDATEPRODUCT', {
        productBarcode: getSaveBarcodeValue,
        productInfo: standDataDev.deviceInfos[index],
      });
      return true;
    }
  }

  function usefulBarcodeCheck(getSaveBarcodeValue) {
    return /^(?=[a-zA-Z0-9]{18}$)(?=[a-zA-Z0-9]{8}[a-zA-Z0-9]{10}$)(?=[a-zA-Z0-9]{13}\d{5}$)/.test(
      getSaveBarcodeValue,
    );
  }

  function popCodeCheck(popCode) {
    let index = popCodeArr.findIndex(code => code === popCode);
    if (index > -1) {
      return true;
    } else {
      return false;
    }
  }
  return {
    cowayProductCheck,
  };
}
