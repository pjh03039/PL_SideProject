<template>
  <v-container>
    <v-form ref="form">
      <v-row>
        <v-col>
          <v-row>
            <v-col>
              <v-text-field
                prepend-inner-icon="mdi-pencil"
                label="바코드 입력"
                v-model="barcodeValue"
                :rules="[rules.required]"
                hide-details="auto"
                clearable
                counter
                @keyup="savaStore"
                @keyup.enter="submitForm"
              ></v-text-field>
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

const barcodeValue = ref('');
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
</script>

<style scoped></style>
