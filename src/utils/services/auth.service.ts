import axios from 'axios';
import { showError } from 'app/src/utils/services/handlerError.service';
import { routes } from 'app/src/utils/constants/route.constant';
import { Notify } from 'quasar';

/**
 * Delete the key in the local storage and redirect to login
 * @param route router - vue router
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
async function logout(route: any) {
  localStorage.removeItem('key');
  route.push('/login');
}
/**
 * @param config object - User data
 * @param route route - vue router
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
async function logIn(config: any, route: any) {
  axios
    .post(process.env.API_URL + routes['logIn'].route, config)
    .then((res) => {
      if (res.data && res.data.key) {
        localStorage.setItem('key', res.data.key);
        route.push('/');
      } else {
        showError('invalid token');
      }
    })
    .catch((err) => {
      console.error(err);
      if (err.response && err.response.data) {
        showError(err.response.data);
      } else {
        showError('Invalid user or password');
      }
    });
}
/**
 * @param config object - User data
 * @param route route - vue router
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
async function singUp(config: any, route: any) {
  axios
    .post(process.env.API_URL + routes['singUp'].route, config)
    .then(() => {
      logIn({ username: config.username, password: config.password1 }, route);
    })
    .catch((err) => {
      if (err.response && err.response.data) {
        showError(err.response.data);
      } else {
        showError('Invalid user or password');
      }
    });
}

/**
 * Get user data
 * @returns a object with the user data
 */
async function userDetails() {
  const token = localStorage.getItem('key');
  const config = token ? { headers: { Authorization: `Token ${token}` } } : {};

  const response = await axios
    .get(process.env.API_URL + routes['userDetails'].route, config)
    .then((res) => {
      return res;
    })
    .catch((err) => {
      if (err.response && err.response.data) {
        showError(err.response.data);
        return err;
      } else {
        showError('Invalid user or password');
        return '';
      }
    });
  return response.data;
}

/**
 * Update current user
 * @param update object - the new user data
 * @returns
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
async function updateUser(update: any) {
  const token = localStorage.getItem('key');
  const config = token ? { headers: { Authorization: `Token ${token}` } } : {};

  const response = await axios
    .put(process.env.API_URL + routes['updateUser'].route, update, config)
    .then((res) => {
      Notify.create({
        color: 'positive',
        position: 'top',
        message: 'User update successfully',
        icon: 'done',
      });
      return res;
    })
    .catch((err) => {
      showError('Invalid user or password');
      return err;
    });
  return response.data;
}

export { logIn, singUp, userDetails, updateUser, logout };
