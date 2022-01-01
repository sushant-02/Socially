<template>
  <div class="profileinfoCt custom-center">
    <template v-if="user && !edit">
      <span
        class="icon is-medium mr-4 edit-icon is-clickable"
        @click="edit = true"
      >
        <FontAwesomeIcon icon="edit" class="fas fa-lg" />
      </span>
      <figure class="profileImgContainer">
        <img class="profileImg" :src="user.profilePhoto" />
      </figure>
      <div class="details mt-2">
        <h1
          class="title is-size-4-desktop is-size-5-touch text-truncate"
          @click="toggleTruncate"
        >
          {{ user.name }}
        </h1>
        <p class="subtitle has-text-grey">
          {{ user.bio ? user.bio : "No bio provided" }}
        </p>
        <p class="text-truncate" @click="toggleTruncate">
          <span class="has-text-weight-bold">{{ user.followers.length }}</span>
          &nbsp;
          <span class="has-text-weight-semibold has-text-grey">Followers</span>
        </p>
        <p class="text-truncate" @click="toggleTruncate">
          <span class="has-text-weight-bold">{{ user.following.length }}</span>
          &nbsp;
          <span class="has-text-weight-semibold has-text-grey">Following</span>
        </p>
        <router-link to="/user/61b07d5b2e3b95cf4c77b74a">
          GOTOUSER
        </router-link>
        <!-- <time datetime="2016-1-1" class="is-size-7">{{format_date(user.createdAt)}}</time> -->
      </div>
    </template>

    <template v-if="!user && !edit">
      Skeleton Loader
    </template>

    <template v-if="edit">
      <UpdateProfileForm :closeForm="closeForm" />
    </template>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { timeString } from "../../utils/timeAgo";
import UpdateProfileForm from "./UpdateProfileForm.vue";

export default {
  name: "User Info",
  components: {
    UpdateProfileForm,
  },
  data() {
    return {
      user: this.$store.getters.getUser,
      edit: false,
    };
  },
  methods: {
    toggleTruncate(e) {
      e.target.classList.toggle("text-truncate");
    },
    format_date(value) {
      return timeString(value);
    },
    closeForm() {
      this.user = this.$store.getters.getUser;
      this.edit = false;
    },
  },
  computed: {
    ...mapGetters(["getUser"]),
  },
  created() {
    if (!this.$store.getters.getUser) {
      this.$store.dispatch("fetchUser").then(() => {
        this.user = this.getUser;
      });
    }
  },
};
</script>

<style lang="scss" scoped>
.profileinfoCt {
  width: 100%;
  flex-direction: column;
  position: relative;
  box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
  border-radius: 10px;
  padding: 1rem;
}
.edit-icon {
  position: absolute;
  top: 0;
  right: 0;
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
.update-button {
  background-color: #41d1af !important;
  color: white !important;
}

@media only screen and (max-width: 800px) {
  .profileImgContainer {
    max-width: 150px;
  }
}
</style>
