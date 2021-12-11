import { createApp } from 'vue';
import { createI18n } from 'vue-i18n';
import App from './App.vue';
//import { default as en } from './locales/en.json5'

//console.log('en', en)

const i18n = createI18n({
  locale: 'ja',
  messages: {}
})

createApp(App).use(i18n).mount('#app')
