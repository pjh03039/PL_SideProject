import { createStore } from 'vuex';

export default createStore({
  state: {
    toastObj: {
      snackbar: false,
      text: 'QR 코드가 복사되었습니다.',
      timeout: 2000,
    },
    barcodeValue: '',
  },
  getters: {
    toastObj: state => state.toastObj,
    getBarcodeValue: state => state.barcodeValue,
  },
  mutations: {
    SETSNACKBAR(state, snackbarObj) {
      state.toastObj = snackbarObj;
    },
    setBarcodeValue(state, newBarcode) {
      state.barcodeValue = newBarcode;
    },
  },
  actions: {
    OPENSNACKBAR({ commit }, snackbarObj) {
      commit('SETSNACKBAR', snackbarObj);
    },
    updateBarcodeValue({ commit }, newBarcode) {
      commit('setBarcodeValue', newBarcode);
    },
  },
  modules: {},
});
