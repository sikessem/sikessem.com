import { component$ } from '@builder.io/qwik';
import '@builder.io/qwik/qwikloader.js';
import { Counter } from "./counter";

export const components = {
    counter: [Counter, component$(Counter)],
};
