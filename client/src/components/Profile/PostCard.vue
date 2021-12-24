<template>
  <!-- <div class="card mb-5">
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
  </div> -->
  <div class="postCard mb-6">
    <img class="postImage" :src="post.imageURL" alt="Post" />
    <div class="postDetails">
      <p class="title is-size-4-desktop is-size-5-touch">{{ post.title }}</p>
      <p class="subtitle is-size-6-desktop is-size-7-touch">
        <time datetime="2016-1-1" class="is-size-7">{{
          format_date(post.createdAt)
        }}</time>
      </p>
      <div class="content postDescription">
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
.postCard {
  width: 100%;
  height: 400px;
  position: relative;
  overflow: hidden;
  box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
}

.postImage {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.postDetails {
  width: 100%;
  height: 200px;
  background: linear-gradient(
    to top,
    #ffffff 0%,
    #ffffff9d 85%,
    rgba(0, 0, 0, 0) 100%
  );
  position: absolute;
  bottom: 0;
  padding: 1.5rem;
  transition: all 0.5s;
}

.postDetails:hover {
  height: 100%;
  background: white;
}

.postImage:hover + .postDetails {
  height: 0;
  bottom: -5rem;
}

@media only screen and (max-width: 1200px) {
  .postCard {
    height: 300px;
  }
  .postDetails {
    height: 150px;
  }
  .postDescription {
    font-size: .9rem;
  }
}
</style>
