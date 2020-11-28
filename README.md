[![forthebadge](https://forthebadge.com/images/badges/made-with-vue.svg)](https://forthebadge.com)
[![forthebadge](https://forthebadge.com/images/badges/made-with-javascript.svg)](https://forthebadge.com)
[![forthebadge](https://forthebadge.com/images/badges/uses-html.svg)](https://forthebadge.com)
[![forthebadge](https://forthebadge.com/images/badges/uses-css.svg)](https://forthebadge.com)
[![forthebadge](https://forthebadge.com/images/badges/built-with-love.svg)](https://forthebadge.com)

# <img align="left" width="40" height="40" src="images/icon-readme.png">Data Cleaner

| ![](images/screen_01.png)  | ![](images/screen_02.png) | ![](images/screen_04.png) |
|:---:|:---:|:---:|
| ![](images/screen_05.png) | ![](images/screen_06.png) | ![](images/screen_08.png) |


A simple application to make it easier to clean csv files.

The friendly interface lets you easily apply common functions. 

The application works locally, no data leaves your machine and results can be exported out.

# Project Aim

Inital proof of concept application to provide an easy to use interface for applying common data cleaning functions for csv files quickly as well as some providing some features to gain some insight from the data. 

This application was built to expand on the knowledge of the framework vue.js including state managment with vuex.


# Built With
- Vue.js (v2)
- Vuex
- JavaScript
- HTML
- CSS


# Demo
Live demo can be found [here]()

A test dataset can be downloaded <a href="src/assets/5000 Sales Records.csv" download="file.csv">download this</a>

# Install and Running
## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

# Usage

- Uploading File
- Viewing Data
  - paging
  - undo
  - field edits
  - filtering
  - data breakdown
- Delete
- Basic Chart
- Actions


# Roadmap
- Optimise to handle larger data sets
- Additonal file types
- Undo previous actions (rather than last one only)
- Additonal charting options
- Additional cleaner functions (emails, web urls, calculations)
  

# Credits

Icons from [Remix Icon](https://remixicon.com/)

CSV file parsing from Papaparse [Papa Parse](https://www.papaparse.com/)

JS extras with [Lodash](https://lodash.com/)

DateTime handling with [Luxon](https://moment.github.io/luxon/)

Charting from [Toast UI](https://ui.toast.com/tui-chart)

Tooltips with [Tippy.js](https://atomiks.github.io/tippyjs/)


# License
Usage is provided under the [MIT License](http://opensource.org/licenses/mit-license.php). See LICENSE for the full details.
