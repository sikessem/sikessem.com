import { type Alpine } from 'alpinejs';
import type Axios from 'axios';

declare module '@builder.io/qwik/qwikloader.js';

declare global {
    interface Window {
        Alpine: Alpine;
        axios: Axios;
    }
}
