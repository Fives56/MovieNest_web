import axios from 'axios';
import { showError } from 'app/src/utils/services/handlerError.service';
import { routes } from 'app/src/utils/constants/route.constant';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
async function logIn(config: any, route: any) {
  axios
    .post(process.env.API_URL + routes['logIn'].route, config)
    .then((res) => {
      if (res.data && res.data.key) {
        localStorage.setItem('key', res.data.key);
        route.push('/');
      } else {
        // Muestra un mensaje de error genérico
        showError('No se ha recibido ningún token');
      }
    })
    .catch((err) => {
      console.error(err);
      // Si el error viene del servidor, muestra el mensaje de error
      if (err.response && err.response.data) {
        showError(err.response.data);
      } else {
        // Muestra un mensaje de error genérico
        showError('Usuario o contraseña incorrectos');
      }
    });
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
async function singUp(config: any, route: any) {
  axios
    .post(process.env.API_URL + routes['singUp'].route, config)
    .then(() => {
      logIn({ username: config.username, password: config.password1 }, route);
    })
    .catch((err) => {
      // Si el error viene del servidor, muestra el mensaje de error
      if (err.response && err.response.data) {
        showError(err.response.data);
      } else {
        // Muestra un mensaje de error genérico
        showError('Usuario o contraseña incorrectos');
      }
    });
}

export { logIn, singUp };
