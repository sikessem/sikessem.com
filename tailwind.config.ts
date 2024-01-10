import forms from '@tailwindcss/forms';
import nesting from '@tailwindcss/nesting';
import typography from '@tailwindcss/typography';
import defaultTheme from 'tailwindcss/defaultTheme';
import UIPlugin from './vendor/sikessem/ui/plugin';
import UIConfig from './vendor/sikessem/ui/tailwind.config';

/** @type {import('tailwindcss').Config} */
export default {
  presets: [UIConfig],

  content: [
    './vendor/laravel/framework/src/Illuminate/Pagination/resources/views/*.blade.php',
    './vendor/laravel/jetstream/**/*.blade.php',
    './storage/framework/views/*.php',
    './resources/**/*.{js,jsx,ts,tsx,md,mdx}',
    './resources/templates/**/*.blade.php',
    './app/View/**/*.php',
  ],

  theme: {
    extend: {
      fontFamily: {
        sans: ['Figtree', 'Nunito', ...defaultTheme.fontFamily.sans],
      },
    },
  },

  plugins: [nesting, forms, typography, UIPlugin],
};
