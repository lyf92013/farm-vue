<template>
  <b-card class="shadow" header="生產">
    <b-input-group prepend="客戶" class="mt-3">
      <b-form-input v-model="client"></b-form-input>
    </b-input-group>

    <b-input-group prepend="生產人員" class="mt-4">
      <b-form-select v-model="executor" :options="executors"></b-form-select>
    </b-input-group>

    <b-input-group prepend="備註" class="mt-4">
      <b-form-input v-model="remarks"></b-form-input>
    </b-input-group>
    <b-button variant="primary" type="submit" class="mt-4" @click="saveOnSheet">送出</b-button>
  </b-card>
</template>

<script>
import googleSheet from "../speadsheets";
import { setTimeCmd } from "../mqttConf";
import { mapState, mapMutations } from "vuex";
import configMixins from "../configMixins";

export default {
  name: "Produce",
  mixins: [configMixins],
  data() {
    return {
      client: "",
      executor: "阿元",
      remarks: ""
    };
  },
  computed: mapState([
    "title",
    "PING",
    "mqttClient",
    "ssid",
    "model",
    "espVer",
    "dataFrequencyID",
    "sensorData",
    "flowType"
  ]),
  mounted() {
    this.updateTitle("生產");
  },
  watch: {
    dataFrequencyID() {
      clearTimeout(this.dataFrequencyID);
    }
  },
  methods: {
    ...mapMutations(["updateTitle"]),
    saveOnSheet() {
      let table = `生產-${this.model}`;
      let completeDate = new Date().toLocaleDateString("zh-TW");
      let data = this.sensorData.replace(/,/g, " - ");

      let recordData = [
        completeDate,
        this.client,
        this.ssid,
        this.espVer,
        data,
        this.executor,
        this.remarks
      ];
      if (`M201,M204`.indexOf(this.model) >= 0) {
        recordData.splice(4, 0, this.flowType);
      }
      this.mqttClient.publish(this.PING, setTimeCmd(1, 0)); // set 1 minute
      googleSheet.sheetInit(this.sheetUrl, table);
      googleSheet.sheetWriteData("last", recordData);
      setTimeout(() => {
        location.reload();
      }, 100);
    }
  }
};
</script>

<style scoped>
</style>