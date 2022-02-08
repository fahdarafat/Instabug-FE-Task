<template>
  <div>
    <el-date-picker
      v-model="dateRange"
      type="daterange"
      range-separator="To"
      start-placeholder="Start date"
      end-placeholder="End date"
      format="dd/MMM/yyyy"
      value-format="timestamp"
    >
    </el-date-picker>
  </div>
</template>

<script>
import store from "../../store/index";
export default {
  name: "PerformanceFilterComponent",
  components: {},
  data() {
    return {
      dateRange: "",
    };
  },
  updated() {
    store.dispatch("dateRangeSelected", this.dateRange);
  },
  methods: {},
};
</script>

<style>
</style>
