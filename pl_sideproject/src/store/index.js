import { createStore } from 'vuex';

export default createStore({
  state: {
    toastObj: {
      snackbar: false,
      text: 'QR 코드가 복사되었습니다.',
      timeout: 2000,
    },
    productObj: {},
    barcodeValue: '',
    barcodeWidth: 150,
    saveBarcodeValue: '',
    overlayFlg: false,
    bottomSheetObj: {
      sheetShow: false,
      height: 500,
      timer: 5,
    },
    searchHistoryArr: [],
    QRcode: true,
  },
  getters: {
    toastObj: state => state.toastObj,
    getBarcodeValue: state => state.barcodeValue,
    getSaveBarcodeValue: state => state.saveBarcodeValue,
    getBottomSheetObj: state => state.bottomSheetObj,
    getProductObj: state => state.productObj,
    getSearchHistoryArr: state => state.searchHistoryArr,
    isQRcode: state => state.QRcode,
    getbarcodeWidth: state => state.barcodeWidth,
  },
  mutations: {
    SETQRCODETYPE(state, QRcode) {
      state.QRcode = QRcode;
    },
    SETSNACKBAR(state, snackbarObj) {
      state.toastObj = snackbarObj;
    },
    SETBARCODE(state, newBarcode) {
      state.barcodeValue = newBarcode.replace(/\s+/g, '');
    },
    SAVEBARCODE(state, savedBarcod) {
      state.saveBarcodeValue = savedBarcod.replace(/\s+/g, '');
    },
    setDim(state, overlayFlg) {
      state.overlayFlg = overlayFlg;
    },
    SETPRODUCT(state, { productBarcode, productInfo }) {
      state.productObj.productBarcode = productBarcode;
      state.productObj.productInfo = productInfo;
    },
    SETVBOTTOMSHEET(state, bottomSheetObj) {
      state.bottomSheetObj = bottomSheetObj;
    },
    SETHISTORY(state, searchBarcode) {
      state.searchHistoryArr.unshift(searchBarcode); // 배열의 앞에 추가 ex)push
      if (state.searchHistoryArr.length > 10) {
        state.searchHistoryArr.pop();
      }
    },
    CLEARHISTORY(state) {
      state.searchHistoryArr.splice(0, state.searchHistoryArr.length);
    },
    SETBARCODEWITH(state, barcodeWidth) {
      state.barcodeWidth = barcodeWidth;
    },
  },
  actions: {
    OPENSNACKBAR({ commit }, snackbarObj) {
      commit('SETSNACKBAR', snackbarObj);
    },
    UPDATEBARCODE({ commit }, newBarcode) {
      commit('SETBARCODE', newBarcode);
    },
    UPDATEPRODUCT({ commit }, newProductBarcode, newProduct) {
      commit('SETPRODUCT', newProductBarcode, newProduct);
    },
    ADDHISTORY({ commit }, addBarcode) {
      commit('SETHISTORY', addBarcode);
    },
  },
  modules: {},
});
