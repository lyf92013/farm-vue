<template>
  <div>
    <b-modal ref="mode" hide-footer no-close-on-backdrop hide-header-close centered title="選擇模式">
      <div class="d-block text-center"></div>
      <b-container>
        <b-row>
          <b-col>
            <b-button class="mt-3" size="lg" variant="outline-success" block @click="direct('produce')">生產</b-button>
          </b-col>
          <b-col>
            <b-button class="mt-3" size="lg" variant="outline-danger" block @click="direct('repair')">維修</b-button>
          </b-col>
        </b-row>
      </b-container>
    </b-modal>
  </div>
</template>

<script>
export default {
  name: "Entry",
  mounted() {
    this.$refs["mode"].show();
  },
  methods: {
    direct(type) {
      this.$router.replace(type);
    }
  }
};
</script>