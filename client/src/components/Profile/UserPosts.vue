<template>
  <div class="userposts">
    <div v-if="posts.length" class="postcardWrapper">
      <div v-for="post in posts" :key="post._id">
        <PostCard :post="post" />
      </div>
    </div>
    <template v-else>
      <h1>NO POSTS</h1>
    </template>
  </div>
</template>

<script>
import PostCard from "./PostCard.vue";

export default {
  name: "UserPosts",
  components: {
    PostCard,
  },
  data() {
    return {
      posts: this.$store.getters.getPosts,
    };
  },
  mounted() {
    this.$store.dispatch("fetchPosts").then(() => {
      this.posts = this.$store.getters.getPosts;
    });
  },
};
</script>

<style>
.userposts {
  height: 100%;
}
.postcardWrapper {
  width: 400px;
}

@media only screen and (max-width: 1200px) {
  .postcardWrapper {
    width: 300px;
  }
}
</style>
