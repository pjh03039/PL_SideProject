import { useStore } from 'vuex';

export function composableCowayProductCheck() {
  const standDataDev = JSON.parse(localStorage.getItem('standDataDev'));
  const popCodeArr = standDataDev.deviceInfos.map(device => device.modelCode);

  const store = useStore();

  function cowayProductCheck(cowayBarcodeValue) {
    let popCode = cowayBarcodeValue.substring(3, 8);
    if (usefulBarcodeCheck(cowayBarcodeValue) && popCodeCheck(popCode)) {
      let index = popCodeArr.findIndex(code => code === popCode);

      store.dispatch('UPDATEPRODUCT', {
        productBarcode: cowayBarcodeValue,
        productInfo: standDataDev.deviceInfos[index],
      });
      return true;
    }
  }

  function usefulBarcodeCheck(cowayBarcodeValue) {
    return /^(?=[a-zA-Z0-9]{18}$)(?=[a-zA-Z0-9]{8}[a-zA-Z0-9]{10}$)(?=[a-zA-Z0-9]{13}\d{5}$)/.test(
      cowayBarcodeValue,
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
