import { createStore } from 'vuex';

export default createStore({
  state: {
    toastObj: {
      snackbar: false,
      text: 'QR 코드가 복사되었습니다.',
      timeout: 2000,
    },
    barcodeValue: '',
    saveBarcodeValue: '',
    overlayFlg: false,
  },
  getters: {
    toastObj: state => state.toastObj,
    getBarcodeValue: state => state.barcodeValue,
    getSaveBarcodeValue: state => state.saveBarcodeValue,
  },
  mutations: {
    SETSNACKBAR(state, snackbarObj) {
      state.toastObj = snackbarObj;
    },
    SETBARCODE(state, newBarcode) {
      state.barcodeValue = newBarcode;
    },
    SAVEBARCODE(state, savedBarcod) {
      state.saveBarcodeValue = savedBarcod;
    },
    setOverlayFlg(state, overlayFlg) {
      state.overlayFlg = overlayFlg;
    },
  },
  actions: {
    OPENSNACKBAR({ commit }, snackbarObj) {
      commit('SETSNACKBAR', snackbarObj);
    },
    UPDATEBARCODE({ commit }, newBarcode) {
      commit('SETBARCODE', newBarcode);
    },
  },
  modules: {},
});
