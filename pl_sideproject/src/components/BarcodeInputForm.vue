<template>
  <v-container>
    <v-row class="mt-4">
      <v-col cols="12" class="text-center">
        <p>바코드 16자 or Pop코드 5자를 넣어주세요.</p>
      </v-col>
    </v-row>

    <v-row class="mt-4 justify-center">
      <v-col cols="10">
        <v-form @submit.prevent="submitForm" ref="form">
          <v-row>
            <v-col cols="10">
              <v-text-field
                label="바코드 입력"
                v-model="barcodeValue"
                :rules="[rules.required, rules.length]"
              ></v-text-field>
            </v-col>
            <v-col cols="2">
              <v-btn class="h-70" type="submit" color="primary"
                >바코드 생성</v-btn
              >
            </v-col>
          </v-row>
        </v-form>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { ref, defineEmits } from 'vue';

const barcodeValue = ref('');
const form = ref(null);

const emit = defineEmits(['barcodeData']);

const rules = {
  required: value => !!value || '바코드 미입력',
  length: value =>
    value.length === 16 || value.length === 5 || '16자 또는 5자 입력',
};

const submitForm = () => {
  if (validateBarcode()) {
    emit('barcodeData', barcodeValue.value);
  }
};

const validateBarcode = () => {
  const trimmedValue = barcodeValue.value.trim(); // trim() 처리
  if (trimmedValue.length === 16 || trimmedValue.length === 5) {
    return true;
  } else {
    return false;
  }
};
</script>

<style scoped>
.text-center {
  display: flex;
  justify-content: center;
}

.h-70 {
  height: 70%;
}
</style>
