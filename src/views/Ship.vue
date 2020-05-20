<template>
  <b-card class="shadow" header="出貨">
    <b-input-group prepend="客戶" class="mt-3">
      <b-form-input v-model="client"></b-form-input>
    </b-input-group>

    <b-input-group prepend="出貨人" class="mt-4">
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
  name: "Ship",
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
    "sensorData",
    "flowType"
  ]),
  mounted() {
    this.updateTitle("出貨");
  },
  methods: {
    ...mapMutations(["updateTitle"]),
    saveOnSheet() {
      let table = `出貨-${this.model}`;
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
      if ((`M201,M204`).indexOf(this.model) > 0) {
        recordData.splice(4, 0, this.flowType);
      }
      this.mqttClient.publish(this.PING, setTimeCmd(1, 0)); // set 1 minute
      googleSheet.sheetInit(this.sheetUrl, table);
      googleSheet.sheetWriteData("last", recordData);
      alert("儲存成功 !");
      location.reload();
    }
  }
};
</script>

<style scoped>
</style>