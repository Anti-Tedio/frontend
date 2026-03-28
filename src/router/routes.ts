import { createMemoryHistory, createRouter, createWebHistory } from 'vue-router';
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/privacy',
      name: 'privacy',
      component: () => import('@/views/PrivacyView.vue')
    },
    {
      path: '/terms',
      name: 'terms',
      component: () => import('@/views/TermsView.vue')
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('@/views/AboutView.vue')
    },
    {
      path: '/',
      component: () => import('@/layouts/MainLayout.vue'),
      children: [
        {
          path: '/',
          name: 'home',
          component: () => import('@/views/HomeView.vue'),
        },
        {
          path: '/persons',
          name: 'persons',
          component: () => import('@/views/SelectPersonsView.vue'),
        },
        {
          path: '/categorys',
          name: 'categorys',
          component: () => import('@/views/SelectCategoryView.vue'),
        },
        {
          path: '/extra-info',
          name: 'extra-info',
          component: () => import('@/views/ExtraInfoView.vue'),
        },
        {
          path: '/profile',
          name: 'profile',
          component: () => import('@/views/ProfileView.vue'),
        },
        {
          path: '/result',
          name: 'result',
          component: () => import('@/views/ResultView.vue'),
        },
        {
          path: '/success',
          name: 'success',
          component: () => import('@/views/SuccessPaymentView.vue'),
        },
        {
          path: '/failure',
          name: 'failure',
          component: () => import('@/views/FailurePaymentView.vue'),
        },
        {
          path: '/pending',
          name: 'pending',
          component: () => import('@/views/PendingPaymentView.vue'),
        },
        {
          path: '/reset-password',
          name: 'reset-password',
          component: () => import('@/views/ResetPasswordView.vue')
        },
        {
          path: '/delete-account',
          name: 'delete-account',
          component: () => import('@/views/DeleteAccountView.vue')
        },
        {
          path: '/recovery-account',
          name: 'recovery-account',
          component: () => import('@/views/RecoveryAccountView.vue')
        },
        {
          path: '/contact',
          name: 'contact',
          component: () => import('@/views/ContectView.vue')
        },
      ]
    }
  ],
  scrollBehavior() {
    return { top: 0, left: 0 }
  }
})

router.beforeEach(() => {
  NProgress.start();
  return true;
});

router.afterEach(() => {
  NProgress.done();
});

NProgress.configure({
  showSpinner: false,
  easing: 'ease in',
  speed: 500,
  trickleSpeed: 200
});

export default router;