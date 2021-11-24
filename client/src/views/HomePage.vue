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
import { mapGetters, mapActions } from "vuex";

export default {
  components: { Header },
  name: "HomePage",
  methods: {
    ...mapActions(["fetchPosts"]),
  },
  computed: mapGetters(["getUser"]),
  created() {
    if(this.getUser === null) {
      this.$router.push("/login");
    } else
      this.fetchPosts(this.getUser._id)
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
