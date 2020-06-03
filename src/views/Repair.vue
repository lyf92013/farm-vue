<template>
  <b-card class="shadow" header="零件更換" footer="Card Footer" footer-tag="footer">
    <b-container>
      <b-row>
        <b-col>
          <b-form-checkbox
            v-model="part.value"
            value="1"
            unchecked-value="0"
            v-for="part in basic"
            v-bind:key="part.text"
          >{{part.text}}</b-form-checkbox>
        </b-col>
        <b-col v-if="model !== '-'">
          <b-form-checkbox
            v-model="part.value"
            value="1"
            unchecked-value="0"
            v-for="part in this[model]"
            v-bind:key="part.text"
          >{{part.text}}</b-form-checkbox>
        </b-col>
      </b-row>
    </b-container>
    <b-input-group prepend="維修人" class="mt-4">
      <b-form-select v-model="executor" :options="executors"></b-form-select>
    </b-input-group>
    <b-input-group prepend="故障原因" class="mt-4">
      <b-form-input v-model="broken"></b-form-input>
    </b-input-group>
    <b-input-group prepend="處理方式" class="mt-4">
      <b-form-input v-model="handle"></b-form-input>
    </b-input-group>
    <b-input-group prepend="工時" class="mt-4">
      <b-form-input v-model="hours"></b-form-input>
    </b-input-group>
    <b-input-group prepend="備註" class="mt-4">
      <b-form-input v-model="remarks"></b-form-input>
    </b-input-group>
    <template v-slot:footer>
      <b-col>
        <b-button variant="primary" type="submit" @click="saveOnSheet">送出</b-button>
      </b-col>
    </template>
  </b-card>
</template>

<script>
import googleSheet from "../speadsheets";
import configMixins from "../configMixins";
import { setTimeCmd } from "../mqttConf";
import { mapState, mapMutations } from "vuex";

export default {
  name: "Repair",
  mixins: [configMixins],
  data() {
    return {
      executor: "阿元",
      hours: "",
      broken: "",
      handle: "",
      remarks: "",
      basic: [
        {
          text: "ESP",
          value: 0
        },
        {
          text: "Mini",
          value: 0
        },
        {
          text: "Mark3",
          value: 0
        },
        {
          text: "變壓器",
          value: 0
        }
      ],
      M101: [
        {
          text: "溫濕度",
          value: 0
        },
        {
          text: "光度計",
          value: 0
        },
        {
          text: "土壤濕度",
          value: 0
        },
        {
          text: "A款",
          value: 0
        }
      ],
      M201: [
        {
          text: "流量計",
          value: 0
        },
        {
          text: "繼電器",
          value: 0
        },
        {
          text: "B款",
          value: 0
        }
      ],
      M204: [
        {
          text: "流量計",
          value: 0
        },
        {
          text: "土壤濕度",
          value: 0
        },
        {
          text: "繼電器",
          value: 0
        },
        {
          text: "B款",
          value: 0
        }
      ]
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
    "sensorData"
  ]),
  mounted() {
    this.updateTitle("維修");
  },
  watch: {
    dataFrequencyID() {
      clearTimeout(this.dataFrequencyID);
    }
  },
  methods: {
    ...mapMutations(["updateTitle"]),
    saveOnSheet() {
      let table = `維修-${this.model}`;
      let completeDate = new Date().toLocaleDateString("zh-TW");
      let data = this.sensorData.replace(/,/g, " - ");
      let recordData = [
        completeDate,
        this.ssid,
        this.executor,
        this.hours,
        this.broken,
        this.handle,
        ...Array.from(this.basic, part => part.value),
        ...Array.from(this[this.model], part => part.value),
        this.remarks,
        this.espVer,
        data
      ];

      this.mqttClient.publish(this.PING, setTimeCmd(1, 0)); // set 1 minute
      googleSheet.sheetInit(this.sheetUrl, table);
      googleSheet.sheetWriteData("last", recordData);
      console.log(`save to ${table} table...`);
      alert("儲存成功 !");
      location.reload();
    }
  }
};
</script>