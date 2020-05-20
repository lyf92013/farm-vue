<template>
  <b-navbar variant="faded bg-white" type="light">
    <b-navbar-brand href="#">
      <img src="../assets/logo.png" width="30" height="30" class="d-inline-block align-top" alt />
      {{title}}
    </b-navbar-brand>
  </b-navbar>
</template>

<script>
import { mapState } from 'vuex';

export default {
  name: "Header",
  computed: {
    ...mapState(["title"])
  }
};
</script>

<style scoped>

</style>