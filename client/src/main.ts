import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

// Global Sass
import './assets/sass/main.sass'

const app = createApp(App)

app
    .use(store)
    .use(router)
    .mount('#app')
