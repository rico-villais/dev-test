import './assets/main.css';

import { createApp } from 'vue';

import App from './App.vue';
import router from './router';
import useUserStore from './store/useUserStore';

const app = createApp(App);

app.use(router);

router.beforeEach(async (to, from) => {
    await useUserStore.getState().getLoggedInUser();
    useUserStore.getState().addDefaultUsersIfNeeded();
});

app.mount('#app')