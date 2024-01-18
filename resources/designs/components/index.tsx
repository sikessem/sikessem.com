import { Counter } from "./counter";
import { use } from '../intense';
import { component$ } from "@builder.io/qwik";

const template = (new Counter).template;
use('counter', template, component$(template));
