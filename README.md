# vue301

A demo project created by vue cli. Implemented a user list module with CURD actions and unit testing and E2E testing.

<img width="937" alt="image" src="https://user-images.githubusercontent.com/6148010/185306433-1adef08d-baeb-4691-860d-45c6f46ac9e6.png">

E2E Testing:
<video id="video" controls="" preload="none" poster="https://i9.ytimg.com/vi_webp/Tp5AB4-PZmE/mqdefault.webp?sqp=CLjb-ZcG&rs=AOn4CLCc4_yvj45cuCuzwED5aLQBA3gT_A">
      <source id="mp4" src="https://www.youtube.com/watch?v=Tp5AB4-PZmE" type="video/mp4">
</videos>

<video src="https://www.youtube.com/watch?v=Tp5AB4-PZmE" controls="controls" width="500" height="300"></video>
[![Watch the video](https://i9.ytimg.com/vi_webp/Tp5AB4-PZmE/mqdefault.webp?sqp=CLjb-ZcG&rs=AOn4CLCc4_yvj45cuCuzwED5aLQBA3gT_A)](https://www.youtube.com/watch?v=Tp5AB4-PZmE)

https://www.veed.io/view/c5ef021f-acd7-4a49-b0af-877c13009754?sharingWidget=true

## Recommended IDE Setup

[VSCode](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur) + [TypeScript Vue Plugin (Volar)](https://marketplace.visualstudio.com/items?itemName=Vue.vscode-typescript-vue-plugin).

## Type Support for `.vue` Imports in TS

TypeScript cannot handle type information for `.vue` imports by default, so we replace the `tsc` CLI with `vue-tsc` for type checking. In editors, we need [TypeScript Vue Plugin (Volar)](https://marketplace.visualstudio.com/items?itemName=Vue.vscode-typescript-vue-plugin) to make the TypeScript language service aware of `.vue` types.

If the standalone TypeScript plugin doesn't feel fast enough to you, Volar has also implemented a [Take Over Mode](https://github.com/johnsoncodehk/volar/discussions/471#discussioncomment-1361669) that is more performant. You can enable it by the following steps:

1. Disable the built-in TypeScript Extension
    1) Run `Extensions: Show Built-in Extensions` from VSCode's command palette
    2) Find `TypeScript and JavaScript Language Features`, right click and select `Disable (Workspace)`
2. Reload the VSCode window by running `Developer: Reload Window` from the command palette.

## Customize configuration

See [Vite Configuration Reference](https://vitejs.dev/config/).

## Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Type-Check, Compile and Minify for Production

```sh
npm run build
```

### Run Unit Tests with [Vitest](https://vitest.dev/)

```sh
npm run test:unit
```

### Run End-to-End Tests with [Cypress](https://www.cypress.io/)

```sh
npm run build
npm run test:e2e # or `npm run test:e2e:ci` for headless testing
```

### Lint with [ESLint](https://eslint.org/)

```sh
npm run lint
```
