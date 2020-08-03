<template>
  <b-card class="shadow" :header="firmwares[2].text">
    <b-row class="py-1">
      <b-col>
        緯度：
        <span>{{markers[0].position.lat}}</span>
      </b-col>
      <b-col>
        經度：
        <span>{{markers[0].position.lng}}</span>
      </b-col>
    </b-row>
    <b-row class="py-1">
      <b-col>
        時間：
        <span>{{timestamp}}</span>
      </b-col>
      <b-col>
        二氧化碳：
        <span>{{co2}} ppm</span>
      </b-col>
    </b-row>
    <GmapMap
      :center="{lat:markers[0].position.lat, lng:markers[0].position.lng}"
      :zoom="15"
      :class="{ map: true}"
    >
      <GmapMarker
        :key="index"
        v-for="(m, index) in markers"
        :position="m.position"
        :clickable="true"
        :draggable="true"
        @click="center=m.position"
      />
    </GmapMap>
  </b-card>
</template>

<script>
import { mapState } from "vuex";
import configMixins from "../configMixins";

export default {
  name: "M105",
  mixins: [configMixins],
  computed: {
    ...mapState(["sensorData"]),
  },
  watch: {
    sensorData() {
      let data = this.sensorData.split(",");
      let time = new Date(data[3] * 1000).toLocaleString("zh-TW", {
        timeZone: "Asia/Taipei",
      });
      this.co2 = data[0];
      this.markers[0].position.lat = parseInt(data[1]);
      this.markers[0].position.lng = parseInt(data[2]);
      this.timestamp = time;
    },
  },
  data() {
    return {
      co2: "-",
      timestamp: "-",
      markers: [
        {
          position: {
            lat: 22.604707,
            lng: 120.300504,
          },
        },
      ],
    };
  },
  // mounted() {
  //   let count = 0;
  //   setInterval(() => {
  //     switch (count % 4) {
  //       case 0:
  //         this.markers[0].position.lat = 22.604707;
  //         this.markers[0].position.lng = 120.300504;
  //         break;
  //       case 1:
  //         this.markers[0].position.lat = 22.604707;
  //         this.markers[0].position.lng = 120.31;
  //         break;
  //       case 2:
  //         this.markers[0].position.lat = 22.61;
  //         this.markers[0].position.lng = 120.31;
  //         break;
  //       case 3:
  //         this.markers[0].position.lat = 22.61;
  //         this.markers[0].position.lng = 120.300504;
  //         break;
  //     }
  //     count++;
  //   }, 1000);
  // }
};
</script>

<style scoped>
.map {
  width: 100%;
  height: 300px;
  margin: 0 auto;
  margin-top: 1vw;
}
</style>