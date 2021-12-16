<template>
  <div class="profileinfo custom-center">
    <h1 class="is-size-4 mb-3">Update Profile</h1>
    <span class="icon is-medium edit-icon is-clickable" @click="closeForm">
      <FontAwesomeIcon icon="times" class="fas fa-lg" />
    </span>
    <div class="profileImgContainer">
      <img class="profileImg" ref="img" :src="imageSrc ? imageSrc : placeholderImg" />
      <span
        v-if="imageSrc"
        class="icon is-medium mr-4 is-clickable edit-image"
        @click="fileCleared"
      >
        <FontAwesomeIcon icon="times" class="fas fa-lg" />
      </span>
      <span
        v-else
        class="icon is-medium mr-4 is-clickable edit-image"
        @click="imageInput.click()"
      >
        <FontAwesomeIcon icon="pencil-alt" class="fas fa-lg" />
      </span>
    </div>
    <input
      type="file"
      ref="imageInput"
      accept=".jpg,.jpeg,.png"
      @change="fileChanged"
      :style="{ display: 'none' }"
    />
    <form @submit="onFormSubmit" class="form mt-3">
      <div class="field">
        <label class="label has-text-grey is-size-6-touch">Name</label>
        <div class="control">
          <input
            v-model="name"
            class="input"
            type="text"
            placeholder="Enter name here"
            required
          />
        </div>
      </div>
      <div class="field">
        <label class="label has-text-grey is-size-6-touch">Bio</label>
        <div class="control">
          <textarea
            v-model="bio"
            class="textarea has-fixed-size"
            placeholder="Tell something about you"
          ></textarea>
        </div>
      </div>
      <div class="field mt-5">
        <p class="control">
          <button
            type="submit"
            :class="{ 'is-loading': isLoading }"
            class="button is-medium is-fullwidth update-button"
          >
            <p class="is-size-5 is-size-6-touch">Update Profile</p>
          </button>
        </p>
      </div>
    </form>
  </div>
</template>

<script>
import { useStore } from "vuex";
import { watchEffect, onMounted, onUnmounted, watch } from "vue";
import { ref } from "@vue/reactivity";
import Cropper from "cropperjs";
import "cropperjs/dist/cropper.css";
import axios from "axios";

export default {
  name: "Profile Update Form",
  props: ['closeForm'],
  setup(props) {
    const imageInput = ref(null);
    const selectedFile = ref(null);
    const imageSrc = ref(null);
    const img = ref(null);
    let cropper = null;
    let croppedImgURL = null;
    const store = useStore();
    const name = ref(store.getters.getUser.name);
    const bio = ref(store.getters.getUser.bio);
    const placeholderImg = store.getters.getUser.profilePhoto;
    const isLoading = ref(false);

    const reader = new FileReader();
    reader.onload = () => {
      imageSrc.value = reader.result;
    }

    const onFormSubmit = async(e) => {
      e.preventDefault();
      isLoading.value = true;
      const profilePhoto = await cloudinaryUpload();
      store
        .dispatch("updateUserInfo", { name: name.value, bio: bio.value, profilePhoto })
        .then(() => {
          isLoading.value = false;
          props.closeForm();
        });
    }

    const cloudinaryUpload = async() => {
      handleImageCropped();

      const formData = new FormData();
      formData.append("file", croppedImgURL)
      formData.append("upload_preset", process.env.VUE_APP_CLOUDINARY_PRESET)

      const res = await axios.post(process.env.VUE_APP_CLOUDINARY_URL, formData)

      return res.data.secure_url;
    }

    const handleImageCropped = () => {
      croppedImgURL = cropper
      .getCroppedCanvas({
        width: 256,
        height: 256
      })
      .toDataURL();
      selectedFile.value = null;
    }

    const fileChanged = (e) => {
      const files = e.target.files || e.dataTransfer.files;
      if (files.length) {
        selectedFile.value = files[0];
      }

      const file = e.target.files[0];
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        imageSrc.value = reader.result;
      }
    }

    const fileCleared = () => {
      selectedFile.value = null;
    }

    onMounted(() => {
      cropper = new Cropper(img.value, {
        aspectRatio: 1,
        minCropBoxWidth: 256,
        minCropBoxHeight: 256,
        viewMode: 3,
        dragMode: "move",
        background: false,
        cropBoxMovable: false,
        cropBoxResizable: false
      })
    });

    onUnmounted(() => {
      cropper.destroy();
    });

    watchEffect(() => {
      if (selectedFile.value) {
        reader.readAsDataURL(selectedFile.value);
      } else {
        imageSrc.value = null;
      }
    });

    watch(
      imageSrc, () => {
        if(imageSrc.value) {
          cropper.replace(imageSrc.value);
        }
      },
      {
        flush: "post",
      }
    );

    return {
      name, 
      bio,
      placeholderImg,
      isLoading,
      imageInput,
      selectedFile,
      imageSrc,
      img,
      fileChanged,
      fileCleared,
      onFormSubmit
    };
  },
};
</script>

<style lang="scss" scoped>
.profileinfo {
  width: 100%;
  flex-direction: column;
  position: relative;
}
.edit-icon {
  position: absolute;
  top: 0;
  right: 0;
}
.profileImgContainer {
  width: 150px;
  height: 150px;
  position: relative;
  & img {
    display: block;
  }
}
.profileImg {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border: 1px solid black;
  border-radius: 50%;
}
.edit-image {
  border-radius: 50%;
  border: 1px solid black;
  position: absolute;
  right: 0;
  bottom: 0;
  background-color: white;
}
.update-button {
  background-color: #41d1af !important;
  color: white !important;
}
</style>
