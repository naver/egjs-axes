# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

## [3.9.2](https://github.com/naver/egjs-axes/compare/3.9.1...3.9.2) (2025-06-05)
### :sparkles: Packages
* `@egjs/axes` 3.9.2
* `@egjs/react-axes` 3.3.2
* `@egjs/svelte-axes` 3.3.2
* `@egjs/vue-axes` 3.3.2
* `@egjs/vue2-axes` 3.3.2


### :bug: Bug Fix

* All
    * fix offset zero direction (#220) ([01ffe99](https://github.com/naver/egjs-axes/commit/01ffe99beda7f38028bd12251cd9b9dca9844701))
* `@egjs/axes`
    * do not enable PanInput when there is no inputType (#219) ([b75a5dc](https://github.com/naver/egjs-axes/commit/b75a5dc755d5a343c6718c3b02bd7b870a025041))



## [3.9.1](https://github.com/naver/egjs-axes/compare/3.9.0...3.9.1) (2024-07-31)
### :sparkles: Packages
* `@egjs/axes` 3.9.1
* `@egjs/react-axes` 3.3.1
* `@egjs/svelte-axes` 3.3.1
* `@egjs/vue-axes` 3.3.1
* `@egjs/vue2-axes` 3.3.1


### :bug: Bug Fix

* `@egjs/axes`
    * apply and revert styles when enables/disables PanInput (#218) ([0fcfa19](https://github.com/naver/egjs-axes/commit/0fcfa193a0db4bfd81eaee93759f094a14b21609))


### :memo: Documentation

* `@egjs/react-axes`
    * Add event handler definition to react-axes readme.md (#216) ([d5eee11](https://github.com/naver/egjs-axes/commit/d5eee11808c12b5b7d89eb9f6abf3e4669e46618))


### :mega: Other

* All
    * update packages versions ([3fc40a2](https://github.com/naver/egjs-axes/commit/3fc40a2458c72982976ac8b8f15708d9451a4b3f))



## [3.9.0](https://github.com/naver/egjs-axes/compare/3.8.5...3.9.0) (2023-07-26)
### :sparkles: Packages
* `@egjs/axes` 3.9.0
* `@egjs/react-axes` 3.3.0
* `@egjs/svelte-axes` 3.3.0
* `@egjs/vue-axes` 3.3.0
* `@egjs/vue2-axes` 3.3.0


### :rocket: New Features

* `@egjs/axes`
    * add preventDefaultOnDrag option to PanInput (#214) ([cc115a9](https://github.com/naver/egjs-axes/commit/cc115a95b06c2893844d6de146ce8b7b00573fc3))


### :bug: Bug Fix

* `@egjs/axes`
    * fix setOptions not applying to duration options (#215) ([a0b8621](https://github.com/naver/egjs-axes/commit/a0b8621fe9a06edc534efef640f7d9e09d7faa4b))


### :mega: Other

* All
    * update packages versions ([aca7cfb](https://github.com/naver/egjs-axes/commit/aca7cfb41b48d2beb1711df4446968a9e19d8d7e))



## [3.8.5](https://github.com/naver/egjs-axes/compare/3.8.4...3.8.5) (2023-06-22)
### :sparkles: Packages
* `@egjs/axes` 3.8.5
* `@egjs/react-axes` 3.2.5
* `@egjs/svelte-axes` 3.2.5
* `@egjs/vue-axes` 3.2.5
* `@egjs/vue2-axes` 3.2.5


### :rocket: New Features

* All
    * add holding as reactive property (#211) ([96ec136](https://github.com/naver/egjs-axes/commit/96ec1366a6c1d7f5b1a3c576436edb2223307d69))


### :bug: Bug Fix

* `@egjs/axes`
    * fix wrong getTouches at TouchMouseEventInput (#213) ([99e847d](https://github.com/naver/egjs-axes/commit/99e847ddcee43e94b75cdebc91a3381547022b12))


### :mega: Other

* All
    * update packages versions ([c27baeb](https://github.com/naver/egjs-axes/commit/c27baeb7d692776e54a6a9d9b0fac334bdda7792))



## [3.8.4](https://github.com/naver/egjs-axes/compare/3.8.3...3.8.4) (2023-01-12)
### :sparkles: Packages
* `@egjs/axes` 3.8.4
* `@egjs/react-axes` 3.2.4
* `@egjs/svelte-axes` 3.2.4
* `@egjs/vue-axes` 3.2.4
* `@egjs/vue2-axes` 3.2.4


### :bug: Bug Fix

* `@egjs/axes`
    * add userSelect css props for non chrome browsers (#210) ([4c2156d](https://github.com/naver/egjs-axes/commit/4c2156d18e5b15a62d3e626868d2c71638e4f717))


### :mega: Other

* All
    * update packages versions ([3a1217c](https://github.com/naver/egjs-axes/commit/3a1217c5fa49b382e1da3d9cca3542a0c1d7e28c))



## [3.8.3](https://github.com/naver/egjs-axes/compare/3.8.1...3.8.3) (2022-12-02)
### :sparkles: Packages
* `@egjs/axes` 3.8.3
* `@egjs/react-axes` 3.2.3
* `@egjs/svelte-axes` 3.2.3
* `@egjs/vue-axes` 3.2.3
* `@egjs/vue2-axes` 3.2.3


### :rocket: New Features

* `@egjs/axes`
    * add inputKey option to PanInput and WheelInput (#204) ([1169aca](https://github.com/naver/egjs-axes/commit/1169acac0259f083525da5969a8fad8db9cf04ae))


### :bug: Bug Fix

* All
    * add declaration files to package ([3a68971](https://github.com/naver/egjs-axes/commit/3a6897103594eade43d00f242fc0909bd0148a27))
* `@egjs/axes`
    * fix addEventListener (#209) ([5805c9d](https://github.com/naver/egjs-axes/commit/5805c9da599b2b8b9a6a5c243ea8eaf5743832cd))
    * fix bounce when circular set in only one direction (#207) ([4806cfa](https://github.com/naver/egjs-axes/commit/4806cfa674b2291e5d60e611287ffd58813e23d0))
    * fix preventClickOnDrag option not working when changed (#206) ([c49817d](https://github.com/naver/egjs-axes/commit/c49817d90d9a2677c13f49a901614896a281ca15))


### :mega: Other

* All
    * Release 3.8.2 ([3826ac2](https://github.com/naver/egjs-axes/commit/3826ac2e287a6edf4b4a1d136782114eb2a78bfd))
    * update packages versions ([578c4f2](https://github.com/naver/egjs-axes/commit/578c4f205ba40c2c84883d5144fddb9b1c2dff99))
    * update packages versions ([4b41de4](https://github.com/naver/egjs-axes/commit/4b41de44af6d5b7a6d7b856ad47864c43222da11))



## [3.8.2](https://github.com/naver/egjs-axes/compare/3.8.1...3.8.2) (2022-12-02)
### :sparkles: Packages
* `@egjs/axes` 3.8.2
* `@egjs/react-axes` 3.2.2
* `@egjs/svelte-axes` 3.2.2
* `@egjs/vue-axes` 3.2.2
* `@egjs/vue2-axes` 3.2.2


### :rocket: New Features

* `@egjs/axes`
    * add inputKey option to PanInput and WheelInput (#204) ([1169aca](https://github.com/naver/egjs-axes/commit/1169acac0259f083525da5969a8fad8db9cf04ae))


### :bug: Bug Fix

* `@egjs/axes`
    * fix addEventListener (#209) ([5805c9d](https://github.com/naver/egjs-axes/commit/5805c9da599b2b8b9a6a5c243ea8eaf5743832cd))
    * fix bounce when circular set in only one direction (#207) ([4806cfa](https://github.com/naver/egjs-axes/commit/4806cfa674b2291e5d60e611287ffd58813e23d0))
    * fix preventClickOnDrag option not working when changed (#206) ([c49817d](https://github.com/naver/egjs-axes/commit/c49817d90d9a2677c13f49a901614896a281ca15))


### :mega: Other

* All
    * update packages versions ([4b41de4](https://github.com/naver/egjs-axes/commit/4b41de44af6d5b7a6d7b856ad47864c43222da11))
