<template>
  <div class="container addform">
    <AddPostForm />
  </div>
</template>

<script>
import AddPostForm from "./AddPostForm.vue";

export default {
  components: { AddPostForm },
};
</script>

<style scoped>
.addform {
  width: 100%;
  height: 100%;
}
</style>
