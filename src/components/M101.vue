<template>
  <b-card class="shadow" :header="firmwares[1].text">
    <b-row class="py-1">
      <b-col>
        溫度：
        <span :class="{ abnormal: isTempError}">{{temp}}</span>
      </b-col>
      <b-col>
        濕度：
        <span :class="{ abnormal: isMoistError}">{{moist}}</span>
      </b-col>
    </b-row>
    <b-row class="py-1">
      <b-col>
        光度：
        <span :class="{ abnormal: isLightError}">{{light}}</span>
      </b-col>
      <b-col>
        土壤濕度：
        <span :class="{ abnormal: isSoilError}">{{soil}}</span>
      </b-col>
    </b-row>
  </b-card>
</template>

<script>
import { mapState } from "vuex";
import configMixins from "../configMixins";

export default {
  name: "M101",
  mixins: [configMixins],
  computed: {
    ...mapState(["sensorData"]),
  },
  watch: {
    sensorData() {
      let data = this.sensorData.split(",");
      this.temp = data[0];
      this.moist = data[1];
      this.light = data[2];
      this.soil = data[3];

      this.isTempError = !(this.temp > 0)
      this.isMoistError = !(this.moist > 0)
      this.isLightError = !(this.light > 0)

      // 土壤濕度正常範圍：200 ~ 600
      this.isSoilError = (this.soil > 600 || this.soil < 200)
    },
  },
  data() {
    return {
      temp: "-",
      moist: "-",
      light: "-",
      soil: "-",
      isTempError: true,
      isMoistError: true,
      isLightError: true,
      isSoilError: true,
    };
  },
};
</script>

<style scoped>
.abnormal {
  color: #ea0000;
}
</style>