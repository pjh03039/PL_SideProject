<template>
  <v-app>
    <title-form :titleName="titleName"></title-form>
    <main-page></main-page>
  </v-app>
</template>

<script set>
import TitleForm from './components/TitleForm.vue';
import MainPage from './views/MainPage.vue';
export default {
  components: { TitleForm, MainPage },
  name: 'App',

  data: () => ({
    titleName: '바코드 생성앱 및 제품 정보',
  }),
};
</script>
