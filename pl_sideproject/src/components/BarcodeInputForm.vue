<template>
  <v-container class="d-flex align-center justify-center">
    <v-row>
      <v-col>
        <v-form @submit.prevent="submitForm" ref="form">
          <v-row>
            <v-col>
              <v-text-field
                label="바코드 입력"
                v-model="barcodeValue"
                :rules="[rules.required]"
              ></v-text-field>
            </v-col>
          </v-row>
        </v-form>
      </v-col>
    </v-row>
    <v-bottom-navigation :color="color" grow class="full-width-bottom-nav">
      <v-btn block>
        <span>바코드 생성</span>
      </v-btn>
      <v-btn block>
        <span>바코드 삭제</span>
      </v-btn>
    </v-bottom-navigation>
  </v-container>
</template>

<script setup>
import { ref, defineEmits } from 'vue';

const barcodeValue = ref('');
const form = ref(null);

const emit = defineEmits(['barcodeData']);

const rules = {
  required: value => !!value || '바코드 미입력',
};

const submitForm = () => {
  //if (validateBarcode()) {
  emit('barcodeData', barcodeValue.value);
  //}
};

const validateBarcode = () => {
  const trimmedValue = barcodeValue.value.trim(); // trim() 처리
  if (trimmedValue.length === 16 || trimmedValue.length === 5) {
    return true;
  } else {
    return false;
  }
};

const removeBarcode = () => {
  barcodeValue.value = '';
};
</script>

<style scoped>
.text-center {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
