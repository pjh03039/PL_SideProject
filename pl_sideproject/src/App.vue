<template>
  <v-app>
    <v-container class="fill-height d-flex justify-center align-center w-75">
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
import standDataDev from './common/json/standDataDev.json';
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
  created() {
    localStorage.setItem('standDataDev', JSON.stringify(standDataDev));
  },
};
</script>
<style></style>
