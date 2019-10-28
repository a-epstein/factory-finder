import Page404 from '@/views/Page404';
import Home from '@/views/Home';

export default [
  {
    path: '/home',
    name: 'home',
    component: Home,
  },
  {
    path: '/404',
    name: '404',
    component: Page404,
    meta: {
      auth: false,
    },
  },
  {
    path: '/',
    redirect: '/home',
  },
  {
    path: '/*',
    redirect: '/404',
  },
];
