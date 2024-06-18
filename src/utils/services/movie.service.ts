import axios from 'axios';
import { routes } from '../constants/route.constant';
import { showError } from 'app/src/utils/services/handlerError.service';

/**
 * @param page number - the number of page
 * @param limit number - the limit of objects in the list
 * @param genre string - the genre of the movie
 * @param pagelimit number - max number of pages
 * @returns a movie list
 */
async function getMovies(page = 1, limit = 10, genre = '', pagelimit = 7) {
  const token = localStorage.getItem('key');
  const config = token ? { headers: { Authorization: `Token ${token}` } } : {};
  const genres = genre ? `&genre=${genre}` : '';
  if (page > pagelimit) {
    const response = await axios
      .get(`${process.env.API_URL}${routes['movies'].route}`)
      .then((res) => {
        if (res.data.count == 0) {
          showError('there are no more movies');
        }
        return res;
      })
      .catch((error) => {
        throw error;
      });
    return response.data;
  }

  const response = await axios
    .get(
      `${process.env.API_URL}${routes['movies'].route}?page=${page}&limit=${limit}${genres}`,
      config
    )
    .then((res) => {
      if (res.data.count == 0) {
        showError(`there are no videos of the ${genre} genre`);
      }
      return res;
    })
    .catch((error) => {
      throw error;
    });
  return response.data;
}

export { getMovies };
