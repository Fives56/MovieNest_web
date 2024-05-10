<template>
  <q-card class="container">
    <q-card-section class="title_container">
      <div class="img_container">
        <img
          :src="'https://image.tmdb.org/t/p/w500' + movie.poster_path"
          alt="Movie poster"
        />
      </div>
      <div class="text-h6 title">{{ movie.title }}</div>
    </q-card-section>
    <q-card-section>
      <div class="video">
        <iframe
          width="100%"
          height="100%"
          :src="'https://www.youtube.com/embed/' + movie.video.key"
          frameborder="1"
          allowfullscreen
          @load="handleLoad"
        ></iframe>
      </div>
      <div class="actions">
        <div class="rating">
          <q-badge :color="blue">Rating:</q-badge>
          <q-rating
            v-model="rating"
            max="10"
            color="primary"
            icon="star"
            readonly
          />
        </div>
        <q-btn
          size="sm"
          round
          color="primary"
          icon="info"
          @click="showDescriptionDialog"
        >
          <q-tooltip>Details</q-tooltip>
        </q-btn>
      </div>
    </q-card-section>
  </q-card>

  <q-dialog v-model="showDialog">
    <q-card>
      <q-card-section>
        <div class="genre_container">
          <strong>Genres:</strong>
          <div v-for="genre in movie.genres" :key="genre.name">
            <q-badge :color="colors[genre.name].color">{{
              genre.name
            }}</q-badge>
          </div>
        </div>
      </q-card-section>
      <q-card-section>
        <strong>Description:</strong> {{ movie.overview }}
      </q-card-section>
      <q-card-actions align="right">
        <q-btn label="Cerrar" color="primary" @click="showDialog = false" />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script>
import { colors } from 'src/utils/constants/genre.color.constant';

export default {
  props: {
    movie: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      rating: this.movie.vote_average,
      showDialog: false,
      baseURL: 'https://image.tmdb.org/t/p/w500',
      colors,
    };
  },
  methods: {
    handleLoad() {
      this.$emit('video-loaded');
    },
    showDescriptionDialog() {
      this.showDialog = true;
    },
  },
};
</script>

<style>
.container {
  display: flex;
  flex-direction: column;
  height: 350px;
  background-color: #fff;
}
.video {
  height: 200px;
  margin: 0;
  padding: 0;
}

.img_container {
  border-radius: 50%;
  width: 40px !important;
  height: 40px;
}

img {
  width: 100%;
  height: 100%;
}

.title_container {
  display: flex;
  gap: 15px;
  align-items: center;
  background-color: #08829285;
  border: 2px solid #088292;
}

.title {
  width: 380px;
  height: 40px;
  overflow: auto;
}

.actions {
  margin-top: 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.genre_container {
  display: flex;
  gap: 3px;
}
</style>
