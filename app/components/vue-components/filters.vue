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
      this.searchText = "";
      this.addQueryParam("search", this.searchText);
      this.$emit("clear-text");
    },
    search() {
      this.addQueryParam("search", this.searchText);
      this.$emit("filter-text", this.searchText);
    },
    addQueryParam(key, value) {
      const url = new URL(window.location.href);
      url.searchParams.set(key, value);
      window.history.pushState({}, "", url.toString());
    },
    getQueryParam(key) {
      const url = new URL(window.location.href);
      return url.searchParams.get(key) || "";
    },
  },
  created() {
    const query = this.getQueryParam("search");
    if (query.length > 0) {
      this.searchText = query;
      this.search();
    }
  },
};
</script>

<style>
</style>
