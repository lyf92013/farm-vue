<template>
  <b-card class="shadow" :header="firmwares[1].text">
    <b-row class="py-1">
      <b-col>溫度：{{temp}}</b-col>
      <b-col>濕度：{{moist}}</b-col>
    </b-row>
    <b-row class="py-1">
      <b-col>光度：{{light}}</b-col>
      <b-col>土壤濕度：{{soil}}</b-col>
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
    ...mapState(["sensorData"])
  },
  watch: {
    sensorData() {
      let data = this.sensorData.split(",");
      this.temp = data[0];
      this.moist = data[1];
      this.light = data[2];
      this.soil = data[3];
    }
  },
  data() {
    return {
      temp: "-",
      moist: "-",
      light: "-",
      soil: "-"
    };
  }
};
</script>

<style scoped>
.abnormal {
  color: #ea0000;
}
</style>