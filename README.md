#   Map My Future - Spring 2023

[![js-semistandard-style](https://img.shields.io/badge/code%20style-semistandard-brightgreen.svg)](https://github.com/standard/semistandard) 
[![CI/CD push to main](https://github.com/cse110-sp23-group21/map-my-future/workflows/CI%2FCD%20push%20to%20main/badge.svg)](https://github.com/cse110-sp23-group21/map-my-future/actions?query=workflow:"CI/CD+push+to+main")
[![GitHub release](https://img.shields.io/github/release/cse110-sp23-group21/map-my-future?include_prereleases=&sort=semver&color=blue)](https://github.com/cse110-sp23-group21/map-my-future/releases/)
[![issues - map-my-future](https://img.shields.io/github/issues/cse110-sp23-group21/map-my-future)](https://github.com/cse110-sp23-group21/map-my-future/issues)

This is Team 21's project repository.

##  Building Instructions

Building happens automatically whenever you push to `main` - this triggers the CI/CD workflow "CI/CD push to main" and will do the following things:
- Run HTML, CSS, and JavaScript linters to make sure code in `src` meets the required code style
- Run Jest unit tests
- Generate documentation in `docs` via JSDocs integration
- Minify the files in `src` and copy them into `dist`
- Deploy the website with `dist` as the root into GitHub Pages here: https://cse110-sp23-group21.github.io/map-my-future/index.html
