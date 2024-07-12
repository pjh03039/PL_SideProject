<template>
  <v-container>
    <v-form ref="form" @submit.prevent>
      <v-row>
        <v-col>
          <v-row>
            <v-col>
              <v-text-field
                id="inputmhlee"
                prepend-inner-icon="mdi-pencil"
                label="바코드 입력"
                v-model.trim="barcodeValue"
                :rules="[rules.required]"
                required
                hide-details="auto"
                clearable
                counter
                @keyup="savaStore"
                @keyup.enter="submitForm"
                @click:clear="clearBarcode"
              ></v-text-field>
              <v-search-barcode-history
                @research-item="reseachBarcodeValue"
              ></v-search-barcode-history>
            </v-col>
          </v-row>
        </v-col>
      </v-row>
    </v-form>
  </v-container>
</template>

<script setup>
import { ref } from 'vue';
import { useStore } from 'vuex';
import VSearchBarcodeHistory from '@/components/common/VSearchBarcodeHistory.vue';
import { composableRecentSearchHistory } from '@/hooks/composableRecentSearchHistory.js';
let { addHistory } = composableRecentSearchHistory();

const barcodeValue = ref('');
const store = useStore();

const rules = {
  required: value => !!value || '필수 입력 항목입니다.',
};

function submitForm() {
  store.commit('SAVEBARCODE', barcodeValue.value);
  addHistory(barcodeValue.value);
}

function savaStore() {
  store.dispatch('UPDATEBARCODE', barcodeValue.value);
}

function clearBarcode() {
  store.dispatch('UPDATEBARCODE', '');
}

function reseachBarcodeValue(value) {
  barcodeValue.value = value;
  savaStore();
  submitForm();
}
</script>

<style scoped></style>
