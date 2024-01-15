import { component$ } from '@builder.io/qwik';
import '@builder.io/qwik/qwikloader.js';
import { Counter } from "./counter";
import { define } from '../qustom';

define('counter', Counter, component$(Counter));
