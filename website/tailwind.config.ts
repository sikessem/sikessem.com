import forms from "@tailwindcss/forms";
import typography from "@tailwindcss/typography";
import styliz from "styliz";
import defaultTheme from "tailwindcss/defaultTheme";

class Fonts {
  protected variants: Record<string, string[]> = {};

  all(): Record<string, string[]> {
    return this.variants;
  }

  add(name: string, variable = false): this {
    this.variants[name] = Fonts.variants_of(name, variable);
    return this;
  }

  static variants_of(name: string, variable = false): string[] {
    const variant = name
      .split("-")
      .map((name) => name[0].toUpperCase() + name.slice(1))
      .join(" ");
    return [
      variable ? `${variant} Variable` : variant,
      ...defaultTheme.fontFamily.sans,
    ];
  }
}

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./vendor/laravel/framework/src/Illuminate/Pagination/resources/views/*.blade.php",
    "./vendor/laravel/jetstream/**/*.blade.php",
    "./storage/framework/views/*.php",
    "./resources/templates/**/*.blade.php",
    "./app/View/**/*",
  ],

  theme: {
    extend: {
      fontFamily: new Fonts().add("figtree", true).all(),
    },
  },

  plugins: [forms, typography, styliz],
};
