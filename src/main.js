import { createApp } from 'vue';  // Õige import Vue 3 puhul
import App from './App.vue';  // Importige App.vue fail
import emailjs from 'emailjs-com';

emailjs.init("ljSj1so40G933f40z"); // <-- Asenda see päris user ID-ga

createApp(App).mount('#app');  // Rakenduse loomine ja mountimine
