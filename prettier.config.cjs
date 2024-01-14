exports.default = {
    plugins: [import('prettier-plugin-tailwindcss')],
    tailwindConfig: './tailwind.config.js',
    trailingComma: 'es5',
    semi: false,
    singleQuote: true,
    useTabs: false,
    quoteProps: 'consistent',
    bracketSpacing: true,
    arrowParens: 'always',
    printWidth: 100,
};
