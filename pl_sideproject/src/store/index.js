import { createStore } from 'vuex';

export default createStore({
  state: {
    toastObj: {
      snackbar: false,
      text: 'QR 코드가 복사되었습니다.',
      timeout: 2000,
    },
    productInfo: {
      productBarcode: '',
      makrModelCode: '',
      modelCode: '',
      productName: '',
      wifiType: '',
    },
    barcodeValue: '',
    saveBarcodeValue: '',
    overlayFlg: false,
    bottomSheetObj: {
      sheetShow: false,
      height: 500,
      timer: 5,
    },
    historyBarcodeArr: [],
  },
  getters: {
    toastObj: state => state.toastObj,
    getBarcodeValue: state => state.barcodeValue,
    getSaveBarcodeValue: state => state.saveBarcodeValue,
    getBottomSheetObj: state => state.bottomSheetObj,
    getProductInfo: state => state.productInfo,
    getHistoryBarcodeArr: state => state.historyBarcodeArr,
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
    SETPRODUCT(state, newProduct) {
      state.productInfo = newProduct;
    },
    SETVBOTTOMSHEET(state, bottomSheetObj) {
      state.bottomSheetObj = bottomSheetObj;
    },
    SETHISTORY(state, searchBarcode) {
      state.historyBarcodeArr.unshift(searchBarcode);
      if (state.historyBarcodeArr.length > 10) {
        state.historyBarcodeArr.pop();
      }
    },
    CLEARHISTORY(state) {
      state.historyBarcodeArr.splice(0, state.historyBarcodeArr.length);
    },
  },
  actions: {
    OPENSNACKBAR({ commit }, snackbarObj) {
      commit('SETSNACKBAR', snackbarObj);
    },
    UPDATEBARCODE({ commit }, newBarcode) {
      commit('SETBARCODE', newBarcode);
    },
    UPDATEPRODUCT({ commit }, newProduct) {
      commit('SETPRODUCT', newProduct);
    },
    ADDHISTORY({ commit }, addBarcode) {
      commit('SETHISTORY', addBarcode);
    },
  },
  modules: {},
});
