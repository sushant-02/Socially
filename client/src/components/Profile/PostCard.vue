<template>
  <div class="card mb-5">
    <div class="card-image">
      <figure class="image is-4by3">
        <img :src="post.imageURL" alt="Placeholder image" class="postImage"/>
      </figure>
    </div>
    <div class="card-content">
      <div class="media">
        <div class="media-left">
          <figure class="image is-48x48">
            <img src="https://bulma.io/images/placeholders/96x96.png" alt="Placeholder image" />
          </figure>
        </div>
        <div class="media-content">
          <p class="title is-4">{{ post.title }}</p>
          <p class="subtitle is-6"><time datetime="2016-1-1" class="is-size-7">{{format_date(post.createdAt)}}</time></p>
        </div>
      </div>

      <div class="content">
        {{post.description}}
      </div>
    </div>
  </div>
</template>

<script>
import { timeAgo } from "../../utils/timeAgo";

export default {
  name: "Post Card",
  props: {
    post: { type: Object },
  },
  methods: {
    format_date(value) {
      return timeAgo(value);
    },
  },
};
</script>

<style scoped>
.postImage {
  object-fit: cover;
}
</style>
