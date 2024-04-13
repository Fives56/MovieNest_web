import { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', redirect: '/home' }, // Redirecciona a '/home' cuando el path es ''
      { path: 'home', component: () => import('pages/IndexPage.vue') }, // Asegúrate de tener una ruta para '/home'
      { path: 'login', component: () => import('pages/AuthoritationForm.vue') },
    ],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },
];

export default routes;
