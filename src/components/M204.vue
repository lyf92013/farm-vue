<template>
  <b-card class="shadow" header="智慧灌溉控制器">
    <b-row class="py-1">
      <b-col>流量：{{flow}}</b-col>
      <b-col>
        <b-input-group prepend="型號">
          <b-form-select v-model="selectType" :options="flowTypes" @change="setFlowType"></b-form-select>
        </b-input-group>
      </b-col>
    </b-row>
    <b-row class="py-1 mt-3">
      <b-col>土壤濕度：{{soil}}</b-col>
      <b-col>
        繼電器：
        <toggle-button
          :value="relayStatus"
          :sync="true"
          :color="{checked: '#01B468', unchecked: '#EA0000', disabled: '#CCCCCC'}"
          :labels="true"
          class="mt-2"
          :width="55"
          :height="25"
          :font-size="16"
          @change="switchRelay"
        />
      </b-col>
    </b-row>
  </b-card>
</template>

<script>
import configMixins from "../configMixins";
import { cmdToArray } from "../mqttConf";
import { mapState, mapMutations } from "vuex";

export default {
  name: "M204",
  mixins: [configMixins],
  computed: {
    ...mapState(["mqttClient", "PING", "sensorData", "flowType"])
  },
  watch: {
    flowType() {
      this.selectType = this.flowType;
    },
    sensorData() {
      let data = this.sensorData.split(",");
      this.relayStatus = data[0] == 1 ? true : false;
      this.soil = data[1];
      this.flow = data[2];
    }
  },
  data() {
    return {
      flow: "-",
      soil: "-",
      relayStatus: false,
      selectType: null
    };
  },
  methods: {
    setFlowType() {
      console.log(`set flow type ${this.selectType}`);
      let type = this.selectType
        .toString()
        .split("")
        .map(num => num.charCodeAt());
      let flowTypeCmd = new Uint8Array([
        0xf0,
        0x04,
        0x10,
        0x03,
        0x70,
        0x75,
        0x6c,
        0x73,
        0x65,
        0x3d,
        ...type,
        0xf7
      ]);

      /* this is the original data and wait for responed data*/
      this.selectType = this.flowType;

      this.mqttClient.publish(this.PING, flowTypeCmd);
      this.mqttClient.publish(this.PING, cmdToArray("show=true"));
    },
    switchRelay() {
      if (this.relayStatus) {
        this.mqttClient.publish(this.PING, cmdToArray("off=true"));
      } else {
        this.mqttClient.publish(this.PING, cmdToArray("on=true"));
      }
    }
  }
};
</script>