<template>
  <div class="video-feed">
    <!-- Reproductor de video -->
    <div class="video-player">
      <video v-if="currentVideo" :src="currentVideo.url" controls></video>
    </div>

    <!-- Lista de videos -->
    <div class="video-list">
      <VideoItem
        v-for="video in videos"
        :key="video.id"
        :video="video"
        @play="playVideo"
      />
    </div>
  </div>
</template>

<script>
import VideoItem from './VideoItem.vue';

export default {
  components: {
    VideoItem,
  },
  data() {
    return {
      videos: [
        // Tus videos aquí. Cada video es un objeto con id, url, title y thumbnail.
      ],
      currentVideo: null,
    };
  },
  methods: {
    playVideo(video) {
      this.currentVideo = video;
    },
  },
};
</script>

<style>
.video-feed {
  display: flex;
}
.video-player {
  width: 70%;
}
.video-list {
  width: 30%;
  overflow-y: auto;
}
</style>
