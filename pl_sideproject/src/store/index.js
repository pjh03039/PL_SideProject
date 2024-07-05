import { createStore } from 'vuex';

export default createStore({
  state: {
    toastObj: {
      snackbar: false,
      text: 'QR 코드가 복사되었습니다.',
      timeout: 2000,
    },
    barcodeValue: '',
    evnetFlag: false,
    overlayFlg: false,
  },
  getters: {
    toastObj: state => state.toastObj,
    getBarcodeValue: state => state.barcodeValue,
  },
  mutations: {
    SETSNACKBAR(state, snackbarObj) {
      state.toastObj = snackbarObj;
    },
    SETBARCODE(state, newBarcode) {
      state.barcodeValue = newBarcode;
    },
    setOverlayFlg(state, overlayFlg) {
      state.overlayFlg = overlayFlg;
    },
    BARCODEFLAG(state, evnetFlag) {
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
      commit('BARCODEFLAG', evnetFlag);
    },
  },
  modules: {},
});
