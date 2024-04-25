import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { registerMicroApps, start, setDefaultMountApp } from 'qiankun';

import App from './App.vue'
import router from './router'

import microApps from "./micro-app";

const app = createApp(App)

app.use(createPinia())
app.use(router)

app.mount('#app')

registerMicroApps(microApps)
start();
