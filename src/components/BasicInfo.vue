<template>
  <b-card class="shadow">
    <Device></Device>
    <br />
    <b-row class="py-1">
      <b-col>SSID：{{ssid}}</b-col>
      <b-col>
        狀態：
        <span class="online" v-if="online">上線</span>
        <span class="offline" v-else>離線</span>
      </b-col>
    </b-row>
    <b-row class="py-1">
      <b-col>
        ESP版本：{{espVer}}
        <b-button
          variant="outline-info"
          type="button"
          size="sm"
          @click="$bvModal.show('upgradeESP')"
        >更新</b-button>
        <b-modal
          id="upgradeESP"
          title="更新WiFi晶片"
          size="sm"
          :header-bg-variant="'dark'"
          :header-text-variant="'light'"
        >
          <b-icon-exclamation-triangle-fill variant="danger"></b-icon-exclamation-triangle-fill>
          <span>開發板保持上線狀態。</span>
          <template v-slot:modal-footer>
            <div>
              <b-button variant="primary" size="sm" class="float-right" @click="upgradeESP">更新</b-button>
              <b-button variant="light mr-3" size="sm" @click="$bvModal.hide('upgradeESP')">關閉</b-button>
            </div>
          </template>
        </b-modal>
      </b-col>
      <b-col>類型：{{getModelText}}</b-col>
    </b-row>
    <b-row class="py-3">
      <b-col>Mini版本：{{miniVer}}</b-col>
      <b-col>
        <!-- <b-input-group>
          <b-form-select v-model="firmware" :options="firmwares"></b-form-select>
          <b-input-group-append>
            <b-button variant="danger" type="button" @click="burnMini">燒錄</b-button>
          </b-input-group-append>
        </b-input-group>-->
      </b-col>
    </b-row>
  </b-card>
</template>

<script>
import Device from "./Device";
import configMixins from "../configMixins";
import { burnCmd, upgradeCmd } from "../mqttConf";
import { mapState } from "vuex";

export default {
  name: "BasicInfo",
  mixins: [configMixins],
  components: {
    Device,
  },
  data() {
    return {
      firmware: null,
    };
  },
  computed: {
    ...mapState([
      "mqttClient",
      "PING",
      "ssid",
      "espVer",
      "online",
      "miniVer",
      "model",
    ]),
    getModelText() {
      if (this.model == "-") return "-";
      let modelInfo = this.firmwares.find((e) => e.value == this.model);
      return modelInfo.text;
    },
  },
  methods: {
    showUpgradeModal() {
      this.$refs["checkUpgrade"].show();
    },
    burnMini() {
      let url = `${this.firmwareUrl}/iFarm-${this.firmware}.bin`;
      let urlCmd = url.split(``).map((cht) => cht.charCodeAt(0));

      fetch(url)
        .then((res) => {
          if (res.ok) {
            console.log(`burn firmware...`);
            this.mqttClient.publish(this.PING, burnCmd(urlCmd));
          }
        })
        .catch((err) => {
          console.log(`停止燒錄mini: ${err}`);
        });
    },
    upgradeESP() {
      let url = `${this.espUrl}/${this.ssid}.bin`;
      let urlCmd = url.split(``).map((cht) => cht.charCodeAt(0));

      fetch(url)
        .then((res) => {
          if (res.ok) {
            console.log(`更新ESP...`);
            this.mqttClient.publish(this.PING, upgradeCmd(urlCmd));
            this.$bvModal.hide("upgradeESP");
          }
        })
        .catch((err) => {
          console.log(`停止更新ESP: ${err}`);
        });
    },
  },
};
</script>

<style scoped>
.online {
  color: #00a600;
}

.offline {
  color: #ea0000;
}
</style>