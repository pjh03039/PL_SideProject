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
    bottomSheetObj: {
      sheetShow: false,
      height: 500,
      timer: 5,
    },
  },
  getters: {
    toastObj: state => state.toastObj,
    getBarcodeValue: state => state.barcodeValue,
    getSaveBarcodeValue: state => state.saveBarcodeValue,
    getBottomSheetObj: state => state.bottomSheetObj,
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
    setDim(state, overlayFlg) {
      state.overlayFlg = overlayFlg;
    },
    SETVBOTTOMSHEET(state, bottomSheetObj) {
      state.bottomSheetObj = bottomSheetObj;
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
