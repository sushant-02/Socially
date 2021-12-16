<template>
  <div class="addpost-form-container">
    <h1 class="title is-size-3-desktop is-size-4-touch">Add a post</h1>
    <form @submit="onFormSubmit" class="addpost-form form">
      <div class="field">
        <label class="label has-text-grey is-size-6-touch">Title</label>
        <div class="control">
          <input
            v-model="title"
            class="input"
            type="text"
            placeholder="Enter title here"
            required
          />
        </div>
      </div>
      <div class="field">
        <label class="label has-text-grey is-size-6-touch">Description</label>
        <div class="control">
          <textarea
            v-model="description"
            class="textarea has-fixed-size"
            placeholder="Tell something about your post"
            required
          ></textarea>
        </div>
      </div>
      <div id="file-postImage" class="field file has-name">
        <label class="file-label">
          <input
            @change="onImageSelect"
            class="file-input"
            type="file"
            name="image"
            required
          />
          <span class="file-cta">
            <span class="file-icon">
              <FontAwesomeIcon icon="upload" />
            </span>
            <span class="file-label is-size-7">
              Choose an image…
            </span>
          </span>
          <span class="file-name is-size-6">
            {{ imageName ? imageName : "No file uploaded" }}
          </span>
        </label>
      </div>
      <div class="imagePreview field mt-6 mb-6" :class=" {'is-visible': previewSource!==null }">
        <img :src="previewSource" alt="Select an image" />
      </div>
      <div class="field mt-5">
        <p class="control">
          <button
            type="submit"
            :class="{ 'is-loading': loadingUser }"
            class="button is-medium is-fullwidth addpost-button"
          >
            <p class="is-size-5 is-size-6-touch">Add Post</p>
          </button>
        </p>
      </div>
    </form>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import axios from "axios";
import socially from "../../api/socially";
import { useToast } from "vue-toastification";

export default {
  name: "LoginForm",
  data() {
    return {
      title: "",
      description: "",
      image: "",
      imageName: "",
      previewSource: null,
      loadingUser: false,
    };
  },
  methods: {
    async onFormSubmit(e) {
      e.preventDefault();
      if(!this.previewSource) return;

      const toast = useToast();
      this.loadingUser = true;
      try {
        const imageURL = await this.cloudinaryUpload();
        await socially.post("/post/new", { title: this.title, description: this.description, imageURL })
        toast.success("Post added successfully")
      } catch (error) {
        if(error.response.status === 400)
          toast.error("Failed to upload image");
        else {
          toast.error(error.response.data.error.message);
        }
      } finally {
        this.loadingUser = false;
      }
    },
    onImageSelect(e) {
      const file = e.target.files[0];
      this.image = file;
      this.imageName = this.image.name;

      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        this.previewSource = reader.result;
      }
    },
    async cloudinaryUpload() {

      const formData = new FormData();
      formData.append("file", this.image)
      formData.append("upload_preset", process.env.VUE_APP_CLOUDINARY_PRESET)

      const res = await axios.post(process.env.VUE_APP_CLOUDINARY_URL, formData)
      console.log(res.data.secure_url);
      return res.data.secure_url;
    },
  },
  computed: mapGetters(["getUser"]),
};
</script>

<style lang="scss" scoped>
.addpost-form-container {
  width: 100%;
  margin-top: 2rem;
  padding-bottom: 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
}

.addpost-form {
  width: 50%;
}

.imagePreview {
  width: 300px;
  height: 300px;
  margin: 0 auto;
  border: 1px solid grey;
  display: none;

  & img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
}

.imgPreview {
  width: 300px;
  height: 300px;
  margin: 0 auto;
  border: 1px solid grey;
  // overflow: hidden;

  & img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
}

.upload-btn {
  background-color: #41d1af !important;
  color: white !important;
  margin-left: 1rem;
}

.addpost-button {
  background-color: #41d1af !important;
  color: white !important;
}

.is-visible {
  display: flex;
  align-items: center;
  position: relative;
}

@media only screen and (max-width: 750px) {
  .addpost-form {
    width: 70%;
  }
}

@media only screen and (max-width: 500px) {
  .addpost-form {
    width: 100%;
  }
}
</style>
