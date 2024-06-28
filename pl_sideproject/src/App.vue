<template>
  <v-app class="rounded rounded-md">
    <title-form></title-form>
    <main-page></main-page>
  </v-app>
</template>

<script>
import TitleForm from './components/TitleForm.vue';
import MainPage from './views/MainPage.vue';
export default {
  components: { TitleForm, MainPage },
  name: 'App',

  data: () => ({
    //
  }),
};
</script>
