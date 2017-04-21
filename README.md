# gengi

[![Tests status](https://travis-ci.com/KolibriDev/gengi.svg?token=ftT64T4EP2mgju9opeD7&branch=master)](https://travis-ci.com/KolibriDev/gengi)

This is a monorepo for all things `gengi` related


## Getting started

Clone the repo and install dependencies with `yarn` or `npm install`. This will also run `lerna bootstrap` which will install dependencies for all the projects, and create symlinks for interdependent packages.

### Development

We are using [prettier](https://github.com/prettier/prettier) on `packages/**/*.js`. There is a precommit hook in place which will run `prettier` on all changed files and `git add` them after fixing them. **Note** that `applications/gengi-is` is not included in the prettier setup, since it is a legacy project with a pretty weird setup and breaks in a bunch of funny ways.


## Projects

The folder structure is pretty basic, projects are split up into `applications` and `packages`.

### Applications
**Applications** are websites, apps and other products.

### Packages
**Packages** are published npm packages.

| Package     | Version |
|-------------|-------------------|
| `gengi`     | [![NPM version](https://img.shields.io/npm/v/gengi.svg?style=flat-square)](https://www.npmjs.com/package/gengi) |
| `gengi-cli` | [![NPM version](https://img.shields.io/npm/v/gengi-cli.svg?style=flat-square)](https://www.npmjs.com/package/gengi-cli) |
