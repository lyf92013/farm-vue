import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    // mqtt
    mqttClient: null,
    PING: "/PING",

    title: "用戶",
    ssid: null,
    espVer: "-",
    online: false,
    miniVer: "-",
    model: "-",
    dataFrequencyID: null,
    deviceData: "-",
    sensorData: "-",
    flowType: null,
  },
  mutations: {
    resetView(state) {
      state.espVer = "-";
      state.miniVer = "-";
      state.model = "-";
      state.online = false;
    },
    updateTitle(state, title) {
      state.title = title;
    },
    updateClient(state, mqttClient) {
      state.mqttClient = mqttClient;
    },
    updateDevice(state, device) {
      state.ssid = device.ssid;
      state.PING = device.PING;
    },
    updateOnline(state, online) {
      state.online = online;
    },
    updateEspVer(state, espVer) {
      state.espVer = espVer
    },
    updateFw(state, fw) {
      state.miniVer = fw.miniVer;
      state.model = fw.model;
    },
    updateDataFrequency(state, id){
      state.dataFrequencyID = id;
    },
    updateSensorData(state, data) {
      state.sensorData = data;
    },
    updateFlowType(state, flowType) {
      console.log(`read flow type:`, state.flowType = flowType);
    }
  }
})