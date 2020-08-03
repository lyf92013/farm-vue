<template>
  <div id="app">
    <Header></Header>
    <b-container fluid>
      <b-row>
        <div class="mx-auto col-xl-5 col-lg-6 col-md-7 col-sm-8 col-xs-9">
          <BasicInfo class="my-4"></BasicInfo>
          
          <M101 v-if="model === 'M101'" class="my-4"></M101>
          <M105 v-else-if="model === 'M105'" class="my-4"></M105>
          <M201 v-else-if="model === 'M201'" class="my-4"></M201>
          <M204 v-else-if="model === 'M204'" class="my-4"></M204>
          <router-view class="my-4"></router-view>
        </div>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import Header from "./components/Header";
import BasicInfo from "./components/BasicInfo";
import M101 from "./components/M101";
import M105 from "./components/M105";
import M201 from "./components/M201";
import M204 from "./components/M204";
import { mapState } from "vuex";

export default {
  name: "App",
  components: {
    Header,
    BasicInfo,
    M101,
    M105,
    M201,
    M204,
  },
  computed: {
    ...mapState(["model"]),
  },
};
</script>

<style scoped>
#app {
  background-color: rgb(245, 245, 245);
}
</style>
