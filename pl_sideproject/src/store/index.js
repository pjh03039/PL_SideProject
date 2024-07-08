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
    evnetFlag: false,
    overlayFlg: false,
  },
  getters: {
    toastObj: state => state.toastObj,
    getBarcodeValue: state => state.barcodeValue,
    getSaveBarcodeValue: state => state.saveBarcodeValue,
    barcodeFlag: state => {
      console.log(state.saveBarcodeValue !== '');
      return state.saveBarcodeValue !== '';
    },
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
    SETBARCODEFLAG(state, evnetFlag) {
      state.evnetFlag = evnetFlag;
    },
  },
  actions: {
    OPENSNACKBAR({ commit }, snackbarObj) {
      commit('SETSNACKBAR', snackbarObj);
    },
    UPDATEBARCODE({ commit }, newBarcode) {
      commit('SETBARCODE', newBarcode);
    },
    BARCODEFLAG({ commit }, evnetFlag) {
      commit('SETBARCODEFLAG', evnetFlag);
    },
  },
  modules: {},
});
