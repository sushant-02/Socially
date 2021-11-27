<template>
  <div class="homepage">
    <div class="container homepage-container">
      <Header />
      <router-view> </router-view>
    </div>
  </div>
</template>

<script>
import Header from "../components/Header/Header.vue";

export default {
  components: { Header },
  name: "HomePage",
  methods: {
  },
  created() {
    if(!window.localStorage.getItem("JWT")) {
      this.$router.push("/login");
    }
  }
};
</script>

<style lang="scss" scoped>
.homepage {
  width: 100%;
  height: 100%;
  background-color: white;
}

.homepage-container {
  width: 100%;
}

@media only screen and (max-width: 1024px) {
  .homepage-container {
    padding: 0 1rem;
  }
}
</style>
