<template>
  <v-app>
    <v-container class="fill-height d-flex justify-center align-center">
      <title-form :titleName="titleName"></title-form>
      <main-page></main-page>
    </v-container>
    <snack-bar-form></snack-bar-form>
    <progress-circular-form></progress-circular-form>
  </v-app>
</template>

<script set>
import TitleForm from './components/common/TitleForm.vue';
import SnackBarForm from './components/common/SnackBarForm.vue';
import ProgressCircularForm from './components/common/ProgressCircularForm.vue';
import MainPage from './views/MainPage.vue';
export default {
  components: {
    TitleForm,
    MainPage,
    SnackBarForm,
    ProgressCircularForm,
  },
  name: 'App',

  data: () => ({
    titleName: '바코드 생성앱 및 제품 정보',
  }),
};
</script>
<style></style>
