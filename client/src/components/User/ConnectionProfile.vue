<template>
  <div class="container profile-container mt-5">
    <div class="custom-center">
      <CProfileInfo />
    </div>
    <div class="cPostsContainer custom-center mt-5">
      <CPosts />
    </div>
  </div>
</template>

<script>
import CProfileInfo from "./CProfileInfo.vue";
import CPosts from "./CPosts.vue";

export default {
  components: { CProfileInfo, CPosts },
};
</script>

<style>
.profile-container {
  width: 100%;
  height: 80vh;
  margin: 0;
}
.cPostsContainer {
  width: 100%;
}
</style>
