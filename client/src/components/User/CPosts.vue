<template>
  <div v-if="posts.length" class="cPostsWrapper">
    <div v-for="post in posts" :key="post._id">
      <CPostCard :post="post" />
    </div>
  </div>
  <div v-else>
    <h1>NO POSTS</h1>
  </div>
</template>

<script>
import socially from "../../api/socially"
import CPostCard from "./CPostCard.vue";

export default {
  components: { CPostCard },
  data() {
    return {
      posts: [],
    };
  },
  methods: {
    async fetchUserById() {
      try {
        const res = await socially.get(`/posts/${this.$route.params.id}`);
        this.posts = res.data.posts;
      } catch (error) {
        console.log(error);
      }
    },
  },
  mounted() {
    this.fetchUserById();
  },
};
</script>

<style scoped>
.cPostsWrapper {
  display: grid;
  grid-template-columns: repeat(2, 400px);
  grid-gap: 3rem;
}

@media only screen and (max-width: 1000px) {
  .cPostsWrapper {
    grid-template-columns: repeat(2, 300px);
    grid-gap: 2rem;
  }
}

@media only screen and (max-width: 800px) {
  .cPostsWrapper {
    grid-template-columns: repeat(1, 300px);
    grid-gap: 1.5rem;
  }
}
</style>
