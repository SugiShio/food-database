import Sass from 'sass'

const FIREBASE_CONFIG = {
  apiKey: 'AIzaSyBGf6YNafw3BxPFwoshfyzuZzXaOdKgzlY',
  authDomain: 'food-database-4a00f.firebaseapp.com',
  projectId: 'food-database-4a00f',
  storageBucket: 'food-database-4a00f.appspot.com',
  messagingSenderId: '575453396956',
  appId: '1:575453396956:web:4910a9a59556c1d1e1d919',
  measurementId: 'G-E81GPFW453',
}

export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'food-database',
    htmlAttrs: {
      lang: 'ja',
    },
    meta: [
      { charset: 'utf-8' },
      {
        name: 'viewport',
        content:
          'width=device-width, initial-scale=1, maximum-scale=1.0, user-scalable=no, viewport-fit=cover',
      },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' },
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: ['@/assets/stylesheets/main.scss'],
  styleResources: {
    scss: [
      '@/assets/stylesheets/_variables.scss',
      '@/assets/stylesheets/utils.scss',
    ],
  },

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/stylelint
    '@nuxtjs/pwa',
    '@nuxtjs/stylelint-module',
    '@nuxtjs/style-resources',
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    '@nuxtjs/firebase',
  ],

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    // Workaround to avoid enforcing hard-coded localhost:3000: https://github.com/nuxt-community/axios-module/issues/308
    baseURL: '/',
  },

  firebase: {
    config: FIREBASE_CONFIG,
    services: {
      auth: true,
      firestore: true,
    },
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    loaders: {
      scss: {
        implementation: Sass,
      },
    },
  },

  env: { firebaseConfig: FIREBASE_CONFIG },

  serverMiddleware: [
    {
      path: '/api/getDataFromSlism',
      handler: '~/api/getDataFromSlism.js',
    },
  ],

  // PWA module configuration: https://go.nuxtjs.dev/pwa
  pwa: {
    meta: {
      theme_color: '#f5cb5c',
    },
    manifest: {
      lang: 'ja',
    },
  },
}
