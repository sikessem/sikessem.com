<div align="center">

[![sikessem-logo]][sikessem-link]

<br>

[![typescript-icon]][typescript-link]
[![javascript-icon]][javascript-link]
[![packagist-version-icon]][packagist-version-link]
[![packagist-download-icon]][packagist-download-link]
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

## 🎉 Getting Started

### ⚡️ Installation

[Use this template](https://github.com/sikessem/sikessem.com/generate) or create a new [Sikessem project](https://packagist.org/packages/sikessem/sikessem.com) via the [Composer](https://getcomposer.org/) `create-project` command (recommended):

```shell
composer create-project sikessem/sikessem.com sikessem
```

Where **_sikessem_** is the name of your app.

Access the working directory:

```shell
cd sikessem
```

Install PHP dependencies:

```shell
composer install
```

Install JS / TS dependencies:

```shell
bun install
```

🍱 Build assets

The production build will generate client and server modules by running both client and server build commands:

```shell
bun run build
```

### 🗃️ Manage Database

Install migrations:

```shell
php artisan migrate:install && php artisan migrate
```

### 🌐 Starting server

Run the server in development mode:

```shell
php artisan serve --host=sikessem.local --port=8000
```

Then visit [http://sikessem.local:8000/](http://sikessem.local:8000/)

### 🧪 Testing and debugging

#### 🧹 Keep a modern codebase

-   with **Biome**:

```shell
bun check
```

-   with **Pint**:

```shell
composer check
```

#### ⚗️ Run static analysis

-   Using **PHPStan**:

```shell
composer analyse
```

#### ✅ Run unit tests

-   using **Bun**:

```shell
bun run test
```

-   using **PEST**:

```shell
composer test
```

🚀 Execute end-to-end testing with **Playwright**:

```shell
bun e2e
```

#### 🐛 Check all code bugs

-   Frontend:

```shell
bun debug
```

-   Backend:

```shell
composer debug
```

## 📋 Requirements

-   **Requires [PHP 8.3+](https://php.net/releases/)** (at least 8.3.1 recommended to avoid potential bugs).
-   **Requires [PostgreSQL 16.1+](https://www.postgresql.org/)** as Relational Database Management System.
-   **Requires [Bun 1.0+](https://bun.sh/)** (at least 1.0.22 recommended to avoid potential bugs).
-   **Requires [Composer >=2.6.6](https://getcomposer.org/)** to manage [PHP][php-link] dependencies.
-   **Requires [Git ~2.43.0](https://git-scm.com/)** to manage source code.

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
[javascript-icon]: https://img.shields.io/badge/JavaScript-yellow.svg?logo=javascript
[javascript-link]: https://github.com/sikessem/sikessem.com/search?l=javascript 'JavaScript code'
[packagist-version-icon]: https://img.shields.io/packagist/v/sikessem/sikessem.com
[packagist-version-link]: https://packagist.org/packages/sikessem/sikessem.com 'Website Releases'
[packagist-download-icon]: https://img.shields.io/packagist/dt/sikessem/sikessem.com
[packagist-download-link]: https://packagist.org/packages/sikessem/sikessem.com 'Website Downloads'
[actions-icon]: https://github.com/sikessem/sikessem.com/workflows/Tests/badge.svg
[actions-link]: https://github.com/sikessem/sikessem.com/actions 'Website status'
[pr-icon]: https://img.shields.io/badge/PRs-welcome-brightgreen.svg?color=brightgreen
[pr-link]: https://github.com/sikessem/.github/blob/HEAD/CONTRIBUTING.md 'PRs welcome!'
[twitter-icon]: https://img.shields.io/twitter/follow/sikessem_tweets.svg?label=@sikessem_tweets
[twitter-link]: https://twitter.com/intent/follow?screen_name=sikessem_tweets 'Ping Sikessem'
[license-icon]: https://img.shields.io/badge/license-MIT-blue.svg
[license-link]: https://github.com/sikessem/sikessem.com/blob/HEAD/LICENSE 'Website License'
[conduct-link]: https://github.com/sikessem/sikessem.com/blob/HEAD/CODE_OF_CONDUCT.md
[discuss-link]: https://github.com/orgs/sikessem/discussions
[docs-link]: https://github.com/sikessem/sikessem.com#readme 'Website Documentation'
[gfi]: https://github.com/sikessem/sikessem.com/labels/good%20first%20issue
[typescript-home]: https://www.typescriptlang.org 'TypeScript'
[tailwindcss-home]: https://tailwindcss.com 'TailwindCSS'
[vitejs-home]: https://vitejs.dev 'Vite.js'
[biome-home]: https://biomejs.dev 'Biome'
[bun-home]: https://bun.sh 'Bun'
