export default {
  data() {
    return {
      websocketUrl: "wss://ws.webduino.cc/mqtt",
      espUrl: "http://www.webduino.tw/farm/keyes",
      firmwareUrl: "http://download.webduino.tw",
      sheetUrl: "https://docs.google.com/spreadsheets/d/1-7YyPu7nG5fYYg7ktjXFK5qU5EDHCcgqnLtidKI_njA/edit?usp=sharing",
      executors: ["阿元", "朝昇", "智佳", "Eric"],
      firmwares: [
        {
          value: null,
          text: "Choose..."
        },
        {
          value: "M101",
          text: "環境傳感器"
        },
        {
          value: "M201",
          text: "流量控制器"
        },
        {
          value: "M204",
          text: "智慧灌溉控制器"
        }
      ],
      flowTypes: [
        {
          value: null,
          text: "Choose..."
        },
        {
          value: "6540",
          text: "1分塑(MJ-HZ41WB)"
        },
        {
          value: "328",
          text: "4分塑(YF-S201C)"
        },
        {
          value: "330",
          text: "6分塑(FS300A)"
        },
        {
          value: "288",
          text: "1吋塑(YF-G1)"
        },
        {
          value: "27",
          text: "1.5吋塑(YF-DN40)"
        },
        {
          value: "12",
          text: "2吋塑(YF-DN50)"
        },
        {
          value: "660",
          text: "4分銅(YF-B1)"
        },
        {
          value: "360",
          text: "6分銅(YF-B6)"
        },
        {
          value: "352",
          text: "1吋銅(YF-B10)"
        }
      ]
    }
  }
}