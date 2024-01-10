import '@builder.io/qwik/qwikloader.js';
import { init } from '~/init';
import '~/styles/global.css';
import './vendor';

import.meta.glob(['@/**']);

init();
