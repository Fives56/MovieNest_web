import axios from 'axios';
import { Movie, Genre } from '../../components/models';

async function getMovies() {
  axios
    .get('/movies')
    .then((response) => {
      const movies: Movie[] = response.data.map((movie: Movie) => ({
        id: movie.id,
        video: {
          id: movie.video.id,
          key: movie.video.key,
          site: movie.video.site,
        },
        genres: movie.genres.map((genre: Genre) => ({ name: genre.name })),
        tmdb_id: movie.tmdb_id,
        title: movie.title,
        original_title: movie.original_title,
        adult: movie.adult,
        backdrop_path: movie.backdrop_path,
        original_language: movie.original_language,
        overview: movie.overview,
        popularity: movie.popularity,
        poster_path: movie.poster_path,
        release_date: movie.release_date,
        vote_average: movie.vote_average,
        vote_count: movie.vote_count,
      }));

      return movies;
    })
    .catch((error) => {
      console.error(error);
    });
}

export { getMovies };
