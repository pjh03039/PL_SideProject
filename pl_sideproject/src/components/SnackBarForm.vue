<template>
  <div class="text-center">
    <!-- <v-btn color="orange-darken-2" @click="toastObj.snackbar = true">
      Open Snackbar
    </v-btn> -->

    <v-snackbar
      style="z-index: 3000 !important"
      v-model="toastObj.snackbar"
      :timeout="toastObj.timeout"
    >
      {{ toastObj.text }}

      <template v-slot:actions>
        <v-btn color="blue" variant="text" @click="closeSnackbar">
          Close
        </v-btn>
      </template>
    </v-snackbar>
  </div>
</template>

<script setup>
import { computed, ref } from 'vue';
import { useStore } from 'vuex';
const store = useStore();
const toastObj = computed(() => store.getters.toastObj);
const closeSnackbar = () => {
  store.dispatch('OPENSNACKBAR', {
    snackbar: false,
    text: '',
    timeout: 0,
  });
};
</script>

<style></style>
