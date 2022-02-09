<template>
  <div>
    <input
      type="text"
      v-model="searchText"
      @keyup="search"
      placeholder="Search"
    />
    <button class="c-button" @click="clearText">Clear</button>
  </div>
</template>

<script>
export default {
  name: "Filters",
  data() {
    return {
      searchText: "",
    };
  },
  methods: {
    clearText() {
      (this.searchText = ""), this.$emit("clear-text");
    },
    search() {
      this.$emit("filter-text", this.searchText);
    },
  },
};
</script>

<style>
</style>
