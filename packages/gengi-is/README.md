grunt-seed
==========

This is our badass and customized front-end development workflow that uses [Grunt](http://gruntjs.com/) for task automation. This is a project seed that you can use to build your own projects on.


## Features

* Development web server
* Live reload on file changes
* [Jade](http://jade-lang.com/) for templates
* [ScSS](http://sass-lang.com/) for stylesheets
* Uses [Require.js](http://requirejs.org/) for asynchronous module loading
* Install bower dependencies with `grunt bower` and packages will be automatically placed in the correct directories
* JSHint with grunt. See options in `.jshintrc`
* Minifies jpg, png, gif and svg
* Desktop notifications on Grunt errors:

![ScreenShot](http://clients.form5.is/assets/grunt-seed-notifications.jpg)


## Setup

```shell
$ git init your-project-name
$ cd your-project-name
$ git pull https://github.com/Form5/grunt-seed.git
$ npm install
$ grunt bower
$ grunt server
```


## Structure

```
app
├── css
│   └── main.scss
│   └── vendor
├── fonts
├── img
├── js
│   ├── main.js
│   └── vendor
└── views
    ├── index.jade
    └── shared
        ├── _head.jade
        └── layout.jade
```


## Todo

* Add support for production packaging with more minification, uglification etc.


## Author

Kolibri is a digital product development company based in Reykjavík, Iceland. To learn more about us, check out [www.kolibri.is](http://www.kolibri.is).


## [License](LICENSE)
