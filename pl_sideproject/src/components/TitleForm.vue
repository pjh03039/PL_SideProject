<template>
  <v-app-bar color="info" :title="props.titleName"></v-app-bar>
</template>

<script setup>
const props = defineProps({
  titleName: {
    type: String,
    required: false,
  },
});
console.log(props.titleName);
</script>

<style scoped>
.sky-blue {
  background-color: #87ceeb;
}
</style>
