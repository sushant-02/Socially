<template>
  <div class="profileinfo custom-center">
    <template v-if="user">
      <figure class="profileImgContainer">
        <img class="profileImg" src="../../assets/profileImage.png" />
      </figure>
      <div class="details">
        <h1
          class="title is-size-4-desktop is-size-5-touch text-truncate"
          @click="toggleTruncate"
        >
          {{ user.name }}
        </h1>
        <p class="subtitle text-truncate" @click="toggleTruncate">
          {{ user.email }}
        </p>
          <time datetime="2016-1-1" class="is-size-7">{{format_date(user.createdAt)}}</time>
      </div>
    </template>
    <template v-else>
      <figure class="profileImgContainer">
        <img class="profileImg" src="../../assets/profileImage.png" />
      </figure>
      <div class="details">
        <h1
          class="title is-size-4-desktop is-size-5-touch text-truncate"
          @click="toggleTruncate"
        >
          Username
        </h1>
        <p class="subtitle text-truncate" @click="toggleTruncate">
          email@example.com
        </p>
      </div>
    </template>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { timeString } from "../../utils/timeAgo";

export default {
  name: "User Info",
  data() {
    return {
      user: this.getUser,
    };
  },
  methods: {
    toggleTruncate(e) {
      e.target.classList.toggle("text-truncate");
    },
    format_date(value) {
      return timeString(value);
    },
  },
  computed: {
    ...mapGetters(["getUser"]),
  },
  created() {
    this.$store.dispatch("fetchUser").then(() => {
      this.user = this.getUser;
    });
  },
};
</script>

<style lang="scss" scoped>
.profileinfo {
  width: 100%;
  // background-color: skyblue;
  flex-direction: column;
}
.profileImgContainer {
  width: 50%;
}
.profileImg {
  border: 1px solid black;
  border-radius: 50%;
}
.details {
  width: 100%;
  text-align: center;

  & p {
    font-size: 1rem;
  }

  & .text-truncate {
    overflow: hidden;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
}

@media only screen and (max-width: 800px) {
  .profileImgContainer {
    max-width: 150px;
  }
}
</style>
