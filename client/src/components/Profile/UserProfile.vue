<template>
  <div class="container profile-container columns mt-5">
    <div class="profileinfoContainer column is-one-third mb-6">
      <UserInfo />
    </div>
    <div class="userpostsContainer column custom-center">
      <UserPosts />
    </div>
  </div>
</template>

<script>
import UserInfo from "./UserInfo.vue";
import UserPosts from "./UserPosts.vue";

export default {
  name: "User Profile",
  components: {
    UserInfo,
    UserPosts,
  },
};
</script>

<style lang="scss" scoped>
.profile-container {
  width: 100%;
  height: 80vh;
  margin: 0;
}

.userpostsContainer {
  width: 100%;
  height: 100%;
  overflow-y: scroll;
  scrollbar-width: none; 
  -ms-overflow-style: none;
}
.userpostsContainer::-webkit-scrollbar {
  width: 0;
  height: 0;
}
</style>
