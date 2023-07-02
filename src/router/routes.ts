import { RouteRecordRaw } from 'vue-router';
export enum RouteNames {
  protectedRoute='protectedRoute',
  main = 'main',
  home = 'home',
  profile = 'profile',
  friends = 'friends',
  settings = 'settings',
  auth = 'auth',
  login = 'login',
  register = 'register',
}
const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: RouteNames.protectedRoute,
    redirect: { name: RouteNames.main },
    component: () => import('./ProtectedRoute.vue'),
    children: [
      {
        path: '/',
        name:RouteNames.main,
        redirect: { name: RouteNames.home },
        component:()=> import('layouts/UserLayout.vue'),
        children: [
          {
            path: 'home',
            name: RouteNames.home,
            component: () => import('pages/HomePage.vue'),
          },
          {
            path: 'profile',
            name: RouteNames.profile,
            component: () => import('pages/ProfilePage.vue'),
          },
          {
            path: 'friends',
            name: RouteNames.friends,
            component: () => import('pages/FriendListPage.vue'),
          },
          {
            path: 'settings',
            name: RouteNames.settings,
            component: () => import('pages/SettingsPage.vue'),
          },
        ],
      },
    ],
  },
  {
    path: '/auth',
    name: RouteNames.auth,
    redirect: { name: RouteNames.login },
    component: () => import('layouts/AuthLayout.vue'),
    children: [
      {
        path: 'login',
        name: RouteNames.login,
        component: () => import('pages/auth/LoginCard.vue'),
      },
      {
        path: 'register',
        name: RouteNames.register,
        component: () => import('pages/auth/RegisterCard.vue'),
      },
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
