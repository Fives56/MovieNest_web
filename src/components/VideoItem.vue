<template>
  <div class="video-item" @click="$emit('play', video)">
    <img :src="video.thumbnail" :alt="video.title" />
    <p>{{ video.title }}</p>
  </div>
</template>

<script>
export default {
  props: {
    video: {
      type: Object,
      required: true,
    },
  },
};
</script>

<style>
.video-item {
  cursor: pointer;
}
</style>
