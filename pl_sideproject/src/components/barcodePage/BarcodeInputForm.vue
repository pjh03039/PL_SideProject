<template>
  <v-container>
    <v-form ref="form" @submit.prevent="addHistory">
      <v-row>
        <v-col>
          <v-row>
            <v-col>
              <v-text-field
                id="inputmhlee"
                prepend-inner-icon="mdi-pencil"
                label="바코드 입력"
                v-model="barcodeValue"
                :rules="[rules.required]"
                required
                hide-details="auto"
                clearable
                counter
                @keyup="savaStore"
                @keyup.enter="submitForm"
                @click:clear="clearBarcode"
              ></v-text-field>
              <v-sheet class="mx-auto" v-if="searchHistory.length">
                <v-slide-group show-arrows class="">
                  <v-slide-group-item
                    v-for="searchBarcode in searchHistory"
                    :key="searchBarcode"
                  >
                    <v-btn
                      class="ma-1"
                      size="small"
                      @click="researchBarcode(searchBarcode)"
                    >
                      <span>{{ searchBarcode }}</span>
                      <v-icon
                        class="ml-2 hover-grey"
                        @click.stop="deleteHistory(searchBarcode)"
                        >mdi-close</v-icon
                      >
                    </v-btn>
                  </v-slide-group-item>
                </v-slide-group>
                <div class="text-right">
                  <v-btn
                    size="small"
                    variant="plain"
                    class="underline"
                    @click.stop="clearHistory"
                  >
                    전체 삭제
                  </v-btn>
                </div>
              </v-sheet>
            </v-col>
          </v-row>
        </v-col>
      </v-row>
    </v-form>
  </v-container>
</template>

<script setup>
import { computed, ref } from 'vue';
import { useStore } from 'vuex';

const barcodeValue = ref('');
const searchHistory = computed(() => {
  return store.getters.getHistoryBarcodeArr;
});
const store = useStore();

const rules = {
  required: value => !!value || '필수 입력 항목입니다.',
};

function submitForm() {
  store.commit('SAVEBARCODE', barcodeValue.value);
}

function savaStore() {
  store.dispatch('UPDATEBARCODE', barcodeValue.value);
}

function clearBarcode() {
  store.dispatch('UPDATEBARCODE', '');
}

function addHistory() {
  const searchHistory = store.getters.getHistoryBarcodeArr;

  if (barcodeValue.value && !searchHistory.includes(barcodeValue.value)) {
    store.dispatch('ADDHISTORY', barcodeValue.value);
  }
}

function deleteHistory(searchBarcode) {
  const searchHistory = store.getters.getHistoryBarcodeArr;

  const index = this.searchHistory.indexOf(searchBarcode);
  if (index !== -1) {
    this.searchHistory.splice(index, 1);
  }
}

function clearHistory() {
  store.commit('CLEARHISTORY');
}

function researchBarcode(searchBarcode) {
  barcodeValue.value = searchBarcode;
  store.dispatch('UPDATEBARCODE', searchBarcode);
  this.submitForm();
}
</script>

<style scoped>
.hover-grey {
  transition: background-color 0.3s ease;
}
.hover-grey:hover {
  background-color: rgb(146, 146, 146);
}
.text-right {
  text-align: right;
}
.underline {
  text-decoration: underline;
}
</style>
