<template>
  <v-container class="d-flex align-center justify-center">
    <v-row>
      <v-col>
        <v-form @submit.prevent="submitForm" ref="form">
          <v-row>
            <v-col cols="10">
              <v-text-field
                label="바코드 입력"
                v-model="barcodeValue"
                :rules="[rules.required]"
              ></v-text-field>
            </v-col>
            <v-col cols="2" class="flex-grow-3">
              <v-btn class="mx-auto" type="submit" color="primary">생성</v-btn>
              <v-btn color="error" @click="removeBarcode">지우기</v-btn>
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
