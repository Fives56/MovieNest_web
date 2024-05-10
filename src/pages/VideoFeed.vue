<template>
  <div class="video-feed">
    <div
      class="video-list"
      v-bind:class="{ 'no-scroll': isLoading }"
      v-if="movies.length > 0"
      @scroll="handleScroll"
    >
      <VideoItem
        v-for="movie in movies"
        :key="movie.id"
        :movie="movie"
        @video-loaded="incrementLoadedVideos"
      />
    </div>
    <div class="loading" v-if="isLoading">
      <q-spinner-bars color="primary" size="40px" />
    </div>
  </div>
</template>

<script>
import VideoItem from '../components/VideoItem.vue';
import { getMovies } from 'src/utils/services/movie.service';

export default {
  components: {
    VideoItem,
  },

  data() {
    return {
      search: '',
      movies: [],
      currentPage: 1,
      videosPerPage: 10,
      isLoading: false,
      loadedVideos: 0,
      pageLimit: 2,
    };
  },

  watch: {
    '$route.params.genre': {
      immediate: true,
      handler(newGenre) {
        if (newGenre != this.genre) {
          this.currentPage = 1;
          this.pageLimit = 2;
          this.movies = [];
        }
        this.genre = newGenre != 'ALL' ? newGenre : '';
        this.loadMore();
      },
    },
  },

  async created() {
    this.loadMore();
  },

  methods: {
    handleScroll(event) {
      const { target } = event;
      if (target.scrollHeight - target.scrollTop === target.clientHeight) {
        this.loadMore();
      }
    },

    incrementLoadedVideos() {
      this.loadedVideos += 1;
    },

    async loadMore() {
      if (this.isLoading) return;
      this.isLoading = true;

      try {
        const newMovies = await getMovies(
          this.currentPage,
          this.videosPerPage,
          this.genre,
          this.pageLimit
        );

        this.pageLimit = newMovies.count / 10;
        this.movies = [...this.movies, ...newMovies.results];
        this.currentPage += 1;
      } catch (error) {
        console.error(error);
        this.$router.push('/login');
      } finally {
        this.isLoading = false;
      }
    },
  },
};
</script>

<style>
.video-feed {
  display: flex;
  justify-content: center;
  flex-direction: column;
  background-color: #59848a5e;
}

.video-list {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-auto-rows: 350px;
  grid-gap: 1em;
  height: 550px;
  overflow-y: auto;
}

.loading {
  justify-self: center;
  align-self: center;
}

.no-scroll {
  overflow-y: hidden;
}
</style>
