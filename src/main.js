import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";

// Pinia config
import { createPinia } from "pinia";

// Emitter Config
import mitt from "mitt";
const Emitter = mitt();


// Vuetify
import "vuetify/styles";
import { createVuetify } from "vuetify";
import * as components  from "vuetify/components"; 
import * as directives  from "vuetify/directives";
import "@mdi/font/css/materialdesignicons.css";

const vuetify = createVuetify({
    components,
    directives
});

createApp(App).use(vuetify).provide("Emitter", Emitter).use(createPinia()).use(router).mount("#app");
