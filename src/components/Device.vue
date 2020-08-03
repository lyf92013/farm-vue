<template>
  <b-input-group>
    <b-form-input class="form-control" placeholder="輸入SSID" v-model="ssid"></b-form-input>
    <b-input-group-append>
      <b-button variant="outline-secondary" text="Button" @click="bindDevice">綁定</b-button>
    </b-input-group-append>
  </b-input-group>
</template>

<script>
import mqtt from "mqtt";
import { hasherWa, hasherWb, hasherWc, hasherWf } from "../Hashids";
import { mapState, mapMutations } from "vuex";
import configMixins from "../configMixins";
import {
  espVerCmd,
  miniVerCmd,
  setupOverCmd,
  cmdToArray
} from "../mqttConf";

let STATUS, PING, PONG, CHANNEL, intervalID;

export default {
  name: "Device",
  mixins: [configMixins],
  data() {
    return {
      ssid: null,
      deviceId: null
    };
  },
  computed: {
    ...mapState(["title", "mqttClient", "model"])
  },
  mounted() {
    const options = {
      connectTimeout: 4000,
      keepalive: 10,
      clean: true
    };
    this.updateClient(mqtt.connect(this.websocketUrl, options));
    this.mqttClient.on("connect", () => {
      console.log(`Connected`);
    });

    // parse data
    this.mqttClient.on("message", (topic, msg) => {
      this.handle_STATUS(topic, msg);
      this.handle_PONG(topic, msg);
      this.handle_CHANNEL(topic, msg);
    });
  },
  methods: {
    ...mapMutations([
      "resetView",
      "updateClient",
      "updateDevice",
      "updateOnline",
      "updateEspVer",
      "updateFw",
      "updateDataFrequency",
      "updateSensorData",
      "updateFlowType"
    ]),
    handle_STATUS(topic, msg) {
      if (topic == STATUS) {
        if (msg.toString() == "OK") {
          this.updateOnline(true);
          setTimeout(() => {
            this.mqttClient.publish(PING, miniVerCmd);
            this.mqttClient.publish(PING, espVerCmd);
          }, 100);

          // 每秒更新一次資料(不會寫入資料庫)
          intervalID = setInterval(()=> {
            this.mqttClient.publish(PING, cmdToArray("refresh=true"));
          }, 1000);
          
        } else {
          this.updateOnline(false);
        }
      }
    },
    handle_PONG(topic, msg) {
      if (topic == PONG) {
        let data,
          str = "";

        // report version
        if (msg[0] == 0xf9) {
          this.mqttClient.publish(PING, miniVerCmd);
        } else if (msg[0] == 0xf0) {
          // ESP version
          if (msg[1] == 0x71) {
            // STRING_DATA

            for (let i = 2; i < msg.length - 1; i += 2) {
              data = msg[i];
              data += msg[i + 1];
              str += String.fromCharCode(data);
            }
            this.updateEspVer(str.substring(0, str.indexOf(",")));
            // Mini version
          } else if (msg[1] == 0x04 && msg[2] == 0x10) {
            if (msg[3] == 5) {
              for (let i = 3; i < msg.length - 1; i++)
                str += String.fromCharCode(parseInt(msg[i]));
              let info = {
                miniVer: str.substring(0, str.indexOf("/")),
                model: str.substr(str.indexOf("Model : ") + 8, 4)
              };
              this.updateFw(info);

              if (this.model == "M201") {
                this.mqttClient.publish(PING, cmdToArray("show=true"));
              }
            } else if (msg[3] == 3) {
              // setup over
              this.mqttClient.publish(PING, setupOverCmd);
            }
          }
        }

        if (msg[0] == 0x50) {
          // Pump:...
          for (let i = 0; i < msg.length; i++) {
            str += String.fromCharCode(msg[i]);
          }
          let flowType = str.substring(
            str.lastIndexOf("\t") + 1,
            str.lastIndexOf("\r\n")
          );

          this.updateFlowType(flowType);
        } else if (msg[5] == 0x50) {
          // Pump:...
          for (let i = 5; i < msg.length; i++) {
            str += String.fromCharCode(msg[i]);
          }
          let flowType = str.substring(
            str.lastIndexOf("\t") + 1,
            str.lastIndexOf("\r\n")
          );
          this.updateFlowType(flowType);
        }
      }
    },
    handle_CHANNEL(topic, msg) {
      if (topic == CHANNEL) {
        let ssidMsg = msg.toString().substring(0, msg.indexOf(" "));
        if (ssidMsg == this.ssid) {
          let data = msg
            .toString()
            .substring(msg.indexOf(" ") + 1, msg.indexOf(",info"));
          this.updateSensorData(data);
        }
      }
    },
    getDeviceID() {
      let prefix = this.ssid.substr(0, 2);
      let num = this.ssid.substr(2);

      switch (prefix) {
        case "wa":
          this.deviceId = hasherWa.encode(num);
          break;
        case "wb":
          this.deviceId = hasherWb.encode(num);
          break;
        case "wc":
          this.deviceId = hasherWc.encode(num);
          break;
        case "wf":
          this.deviceId = hasherWf.encode(num);
          break;
      }
      console.log(`SSID:`, this.ssid, `DeviceID:`, this.deviceId);
    },
    bindDevice() {
      clearInterval(intervalID);
      this.resetView();
      this.getDeviceID();
      STATUS = this.deviceId + "/STATUS";
      PING = this.deviceId + "/PING";
      PONG = this.deviceId + "/PONG";
      CHANNEL = "_channel_";

      this.mqttClient.unsubscribe(STATUS);
      this.mqttClient.subscribe(CHANNEL);
      this.mqttClient.subscribe(STATUS);
      this.mqttClient.subscribe(PONG);

      let device = {
        ssid: this.ssid,
        PING
      };
      this.updateDevice(device);
    }
  }
};
</script>