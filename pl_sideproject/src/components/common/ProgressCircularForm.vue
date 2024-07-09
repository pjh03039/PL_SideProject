<template>
  <div class="text-center">
    <v-overlay
      v-model="overlay"
      class="fill-height d-flex justify-center align-center"
    >
      <div>
        <v-progress-circular
          color="primary"
          indeterminate
        ></v-progress-circular>
      </div>
    </v-overlay>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import { useStore } from 'vuex';

const store = useStore();
const overlay = computed(() => {
  return store.state.overlayFlg;
});
</script>

<style></style>
