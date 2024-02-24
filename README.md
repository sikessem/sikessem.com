<div align="center">

[![sikessem-logo]][sikessem-link]

<br>

[![typescript-icon]][typescript-link]
[![license-icon]][license-link]
[![actions-icon]][actions-link]
[![pr-icon]][pr-link]
[![twitter-icon]][twitter-link]

</div>

# Sikessem

The Sikessem Website.

## 🔖 Contents

-   [Sikessem Website](#sikessem-website)
    -   [🔖 Contents](#-contents)
    -   [🎉 Getting Started](#-getting-started)
        -   [⚡️ Installation](#️-installation)
        -   [🗃️ Manage Database](#️-manage-database)
        -   [🌐 Starting server](#-starting-server)
        -   [🧪 Testing and debugging](#-testing-and-debugging)
            -   [🧹 Keep a modern codebase](#-keep-a-modern-codebase)
            -   [⚗️ Run static analysis](#️-run-static-analysis)
            -   [✅ Run unit tests](#-run-unit-tests)
            -   [🐛 Check all code bugs](#-check-all-code-bugs)
    -   [📋 Requirements](#-requirements)
    -   [📖 Documentation](#-documentation)
    -   [👏 Contribution](#-contribution)
        -   [👷 Code of Conduct](#-code-of-conduct)
        -   [👥 Contributing Guide](#-contributing-guide)
        -   [🔒️ Good First Issues](#️-good-first-issues)
        -   [💬 Discussions](#-discussions)
    -   [🔐 Security Reports](#-security-reports)
    -   [📄 License](#-license)

---

## 🎉 Getting Started

### Installation

Install dependencies:

```shell
bun install
```

### Environment

Make and link the .env file:

```shell
make env
```

### Project Structure

This project is using Qwik with [QwikCity](https://qwik.builder.io/qwikcity/overview/). QwikCity is just an extra set of tools on top of Qwik to make it easier to build a full site, including directory-based routing, layouts, and more.

Inside your project, you'll see the following directory structure:

<<<<<<< HEAD
```
├── backend/
│   └── ...
├── frontend/
│   ├── public/
│   │   └── ...
│   └── src/
│       ├── components/
│       │   └── ...
│       └── routes/
│           └── ...
└── packages/
```

- `src/routes`: Provides the directory-based routing, which can include a hierarchy of `layout.tsx` layout files, and an `index.tsx` file as the page. Additionally, `index.ts` files are endpoints. Please see the [routing docs](https://qwik.builder.io/qwikcity/routing/overview/) for more info.

- `src/components`: Recommended directory for components.

- `public`: Any static assets, like images, can be placed in the public directory. Please see the [Vite public directory](https://vitejs.dev/guide/assets.html#the-public-directory) for more info.

### Add Integrations and deployment

Use the `bun qwik add` command to add additional integrations. Some examples of integrations includes: Cloudflare, Netlify or Express Server, and the [Static Site Generator (SSG)](https://qwik.builder.io/qwikcity/guides/static-site-generation/).

```shell
bun qwik add
```

### Development

Development mode uses [Vite's development server](https://vitejs.dev/). The `dev` command will server-side render (SSR) the output during development.

```shell
bun start
```

> Note: during dev mode, Vite may request a significant number of `.js` files. This does not represent a Qwik production build.

### Preview

The preview command will create a production build of the client modules, a production build of `src/entry.preview.tsx`, and run a local server. The preview server is only for convenience to preview a production build locally and should not be used as a production server.

```shell
bun preview
```

### Production

The production build will generate client and server modules by running both client and server build commands. The build command will use Typescript to run a type check on the source code.

```shell
bun run build
```

### 🌐 Starting server

This app has a minimal [Bun server](https://bun.sh/docs/api/http) implementation. After running a full build, you can preview the build using the command:

```shell
bun serve
```

Then visit [sikessem.local:8080/](sikessem.local:8080/)

### 🗃️ Manage Database

[WIP]

### 🧪 Testing and debugging

#### 🧹 Keep a modern codebase

-   with **Biome**:

```shell
bun check
```

#### ✅ Run unit tests

-   using **Bun**:

```shell
bun run test
```

#### 🚀 Execute end-to-end testing with **Playwright**:

```shell
bun e2e
```

#### 🐛 Check all code bugs

```shell
bun debug
```

## 📋 Requirements

-   **Requires [Deno ^1.41](https://deno.land/)** (at least 1.41.0 recommended to avoid potential bugs).
-   **Requires [Bun ^1.0](https://bun.sh/)** (at least 1.0.29 recommended to avoid potential bugs).
-   **Requires [Git ~2.43.2](https://git-scm.com/)** to manage source code.

## 📖 Documentation

The full documentation for the Sikessem Website can be found on [this address][docs-link].

## 👏 Contribution

The main purpose of this repository is to continue evolving Sikessem. We want to make contributing to this project as easy and transparent as possible, and we are grateful to the community for contributing bug fixes and improvements. Read below to learn how you can take part in improving Sikessem.

### [👷 Code of Conduct][conduct-link]

Sikessem has adopted a Code of Conduct that we expect project participants to adhere to.
Please read the [full text][conduct-link] so that you can understand what actions will and will not be tolerated.

### 👥 [Contributing Guide][pr-link]

Read our [**Contributing Guide**][pr-link] to learn about our development process, how to propose bugfixes and improvements, and how to build and test your changes to Sikessem.

### 🔒️ Good First Issues

We have a list of [good first issues][gfi] that contain bugs which have a relatively limited scope. This is a great place to get started, gain experience, and get familiar with our contribution process.

### 💬 Discussions

Larger discussions and proposals are discussed in [**Sikessem's GitHub discussions**][discuss-link].

## 🔐 Security Reports

If you discover a security vulnerability within [Sikessem](https://sikessem.com), please email [SIGUI Kessé Emmanuel](https://github.com/siguici) at [contact@sigui.ci](mailto:contact@sigui.ci). All security vulnerabilities will be promptly addressed.

## 📄 License

The Sikessem Website is open-sourced software licensed under the [MIT License](https://opensource.org/licenses/MIT) - see the [LICENSE][license-link] file for details.

---

<div align="center"><sub>Made with ❤︎ by <a href="https://twitter.com/intent/follow?screen_name=siguici" style="content:url(https://img.shields.io/twitter/follow/siguici.svg?label=@siguici);margin-bottom:-6px">@siguici</a>.</sub></div>

[sikessem-logo]: https://github.com/sikessem/art/blob/HEAD/images/sikessem.svg
[sikessem-link]: https://github.com/sikessem 'Sikessem'
[typescript-icon]: https://img.shields.io/badge/TypeScript-294E80.svg?logo=typescript
[typescript-link]: https://github.com/sikessem/sikessem.com/search?l=typescript 'TypeScript code'
[actions-icon]: https://github.com/sikessem/sikessem.com/workflows/CI/badge.svg
[actions-link]: https://github.com/sikessem/sikessem.com/actions 'Sikessem Web App status'
[pr-icon]: https://img.shields.io/badge/PRs-welcome-brightgreen.svg?color=brightgreen
[pr-link]: https://github.com/sikessem/.github/blob/HEAD/CONTRIBUTING.md 'PRs welcome!'
[twitter-icon]: https://img.shields.io/twitter/follow/sikessem_tweets.svg?label=@sikessem_tweets
[twitter-link]: https://twitter.com/intent/follow?screen_name=sikessem_tweets 'Ping Sikessem'
[license-icon]: https://img.shields.io/badge/license-MIT-blue.svg
[license-link]: https://github.com/sikessem/sikessem.com/blob/HEAD/LICENSE 'Sikessem Web App License'
[conduct-link]: https://github.com/sikessem/sikessem.com/blob/HEAD/CODE_OF_CONDUCT.md
[discuss-link]: https://github.com/orgs/sikessem/discussions
[docs-link]: https://github.com/sikessem/sikessem.com#readme 'Sikessem Web App Documentation'
[gfi]: https://github.com/sikessem/sikessem.com/labels/good%20first%20issue
[typescript-home]: https://www.typescriptlang.org 'TypeScript'
[tailwindcss-home]: https://tailwindcss.com 'TailwindCSS'
[vitejs-home]: https://vitejs.dev 'Vite.js'
[biome-home]: https://biomejs.dev 'Biome'
[bun-home]: https://bun.sh 'Bun'
