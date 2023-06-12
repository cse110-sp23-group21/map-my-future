#   Map My Future - Spring 2023

[![js-semistandard-style](https://img.shields.io/badge/code%20style-semistandard-brightgreen.svg)](https://github.com/standard/semistandard) 
[![CI/CD push to main](https://github.com/cse110-sp23-group21/map-my-future/workflows/CI%2FCD%20push%20to%20main/badge.svg)](https://github.com/cse110-sp23-group21/map-my-future/actions?query=workflow:"CI/CD+push+to+main")
[![GitHub release](https://img.shields.io/github/release/cse110-sp23-group21/map-my-future?include_prereleases=&sort=semver&color=blue)](https://github.com/cse110-sp23-group21/map-my-future/releases/)
[![issues - map-my-future](https://img.shields.io/github/issues/cse110-sp23-group21/map-my-future)](https://github.com/cse110-sp23-group21/map-my-future/issues)

This is Team 21's project repository.

##  Project Description

Welcome to Map My Future, where you can explore a mythical world of fortune telling. In it are four continents, and each continent has developed its own method of fortune telling. They are:
- Cartomancy - Fortune-telling via the use of cards;
- Fortune Stick - Fortune-telling that uses sticks to divine the future;
- Molybdomancy - Fortune-telling that involves melting a piece of tin, casting it into water, and interpreting the shape that results;
- Yin Yang Coin - Fortune-telling that involves throwing three coins 6 times and generating a hexagram which is then interpreted according to the [I Ching](https://en.wikipedia.org/wiki/Hexagram_(I_Ching)).

##  Building Instructions

Building happens automatically whenever you push to `main` - this triggers the CI/CD workflow "CI/CD push to main" and will do the following things:
- Run HTML, CSS, and JavaScript linters to make sure code in `src` meets the required code style
- Run Jest unit tests
- Generate documentation in `docs` via JSDocs integration
- Minify the files in `src` and copy them into `dist`
- Deploy the website with `dist` as the root into GitHub Pages here: https://cse110-sp23-group21.github.io/map-my-future/index.html

##  Credits

This project would not have been possible to make without the fine people of Team 21 - The Canaries!

- Saman Khadivar - Team Lead
- Zhengyu(Van) Huang - Team Lead
- Matthew Gross - Planner
- Justin Chiang - Designer
- Jun Linwu - Developer
- Minh Nhat Duong - Developer
- Francisco Gutierrez - Developer
- Gil Keidar - Developer and Main Theme Composer
- Michelle Chen - Developer
- Hayden Dinh - Developer
