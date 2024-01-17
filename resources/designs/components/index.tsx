import { component$ } from '@builder.io/qwik';
import '@builder.io/qwik/qwikloader.js';
import { Counter } from "./counter";
import { define } from '../qustom';

const template = (new Counter).render;
define('counter', template, component$(template));
