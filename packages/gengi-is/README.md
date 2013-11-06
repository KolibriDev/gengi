grunt-seed
==========

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
$ git clone https://github.com/Form5/grunt-seed.git
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

Form5 is a small interactive studio based in Reykjavík, Iceland. We design and build websites and apps. To learn more about us, check out [www.Form5.is](http://www.form5.is).


## License

The MIT License (MIT)

Copyright (c) 2013 Form5

Permission is hereby granted, free of charge, to any person obtaining a copy of
this software and associated documentation files (the "Software"), to deal in
the Software without restriction, including without limitation the rights to
use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of
the Software, and to permit persons to whom the Software is furnished to do so,
subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS
FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR
COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER
IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.