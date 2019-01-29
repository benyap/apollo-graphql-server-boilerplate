# Apollo GraphQL Server Boilerplate

<div align="center"><strong>⚠️ WIP: This project is currently a work in progress. Features may be missing or incomplete.</strong></div>

<br/>

<div align="center">
  <!-- Dependency status -->
  <a href="https://david-dm.org/bwyap/apollo-graphql-server-boilerplate">
    <img src="https://david-dm.org/bwyap/apollo-graphql-server-boilerplate.svg" alt="Dependency status" />
  </a>
  <!-- devDependency status -->
  <a href="https://david-dm.org/bwyap/apollo-graphql-server-boilerplate#info=devDependencies">
    <img src="https://david-dm.org/bwyap/apollo-graphql-server-boilerplate/dev-status.svg" alt="devDependency status" />
  </a>
  <!-- Known vulnerabilities -->
  <a href="https://snyk.io/test/github/bwyap/apollo-graphql-server-boilerplate?targetFile=package.json">
    <img src="https://snyk.io/test/github/bwyap/apollo-graphql-server-boilerplate/badge.svg?targetFile=package.json" alt="Known vulnerabilities" style="max-width:100%;" />
  </a>
  <!-- Code size -->
  <img src="https://img.shields.io/github/languages/code-size/bwyap/apollo-graphql-server-boilerplate.svg" alt="Code size" />
  
  <!-- License -->
  <a href="https://github.com/bwyap/apollo-graphql-server-boilerplate/blob/master/LICENSE.md">
    <img src="https://img.shields.io/github/license/bwyap/apollo-graphql-server-boilerplate.svg" alt="License" />
  </a>
</div>
<div align="center">
  <!-- Test Coverage - Coveralls -->
  <a href="https://coveralls.io/r/bwyap/apollo-graphql-server-boilerplate">
    <img src="https://coveralls.io/repos/github/bwyap/apollo-graphql-server-boilerplate/badge.svg" alt="Test coverage (Coveralls)" />
  </a>
  <!-- Test Coverage - Codecov -->
  <a href="https://codecov.io/gh/bwyap/apollo-graphql-server-boilerplate">
    <img src="https://codecov.io/gh/bwyap/apollo-graphql-server-boilerplate/branch/master/graph/badge.svg" alt="Test coverage (Codecov)" />
  </a>
  <!-- Tests - Appveyor -->
  <a href="https://ci.appveyor.com/project/bwyap/apollo-graphql-server-boilerplate">
    <img src="https://img.shields.io/appveyor/tests/bwyap/apollo-graphql-server-boilerplate.svg" alt="Build status (Appveyor)" />
  </a>
  <!-- Build Status - Travis CI -->
  <a href="https://travis-ci.org/bwyap/apollo-graphql-server-boilerplate">
    <img src="https://travis-ci.org/bwyap/apollo-graphql-server-boilerplate.svg?branch=master" alt="Build status (Travis CI)" />
  </a>
  <!-- Build Status - Appveyor -->
  <a href="https://ci.appveyor.com/project/bwyap/apollo-graphql-server-boilerplate">
    <img src="https://ci.appveyor.com/api/projects/status/ywk6wlvw2mby5b3x?svg=true" alt="Build status (Appveyor)" />
  </a>
  <!-- Build Status - CircleCI -->
  <a href="https://circleci.com/gh/bwyap/apollo-graphql-server-boilerplate">
    <img src="https://img.shields.io/circleci/project/github/bwyap/apollo-graphql-server-boilerplate.svg?logo=CircleCI" alt="Build status (Circle CI)" />
  </a>
</div>

<div align="center">
  <sub>Created by by <a href="https://github.com/bwyap">Ben Yap</a>.</sub>
</div>

---

_An opinionated GraphQL server stack, written in Typescript._

This server boilerplate provides the scaffolding for building a
service-oriented production-ready GraphQL server, built on top of
Apollo Server 2.0 with Express integration.

## Features

<dl>
  <dt>The power of GraphQL at your fingertips</dt>
  <dd>Utilise the latest features of GraphQL to build a robust API.</dd>

  <dt>Automatic type generation</dt>
  <dd>Built-in scripts which generate Typescript typings from your schema. Say goodbye to maintaining type definitions by hand!</dd>

  <dt>Instant feedback</dt>
  <dd>Automatic reloading of the server when you make changes.</dd>

  <dt>Next generation JavaScript</dt>
  <dd>Use template strings, object destructuring, arrow functions, JSX syntax and more.</dd>

  <dt>Static code analysis</dt>
  <dd>Focus on writing new features without worrying about formatting or code quality. With the right editor setup, your code will automatically be formatted and linted as you work.</dd>
</dl>

## Quick start

1.  Make sure that you have Node.js v8.10 and npm v5 or above installed.
2.  Clone this repo using `git clone --depth=1 https://github.com/bwyap/apollo-graphql-server-boilerplate.git <YOUR_PROJECT_NAME>`
3.  Move to the appropriate directory: `cd <YOUR_PROJECT_NAME>`.<br />
4.  Run `npm run setup` in order to install dependencies and clean the git repo. (**TODO: implement this**)<br />
    _At this point you can run `npm start` to start the server at `http://localhost:4000`._
5.  Run `npm run clean` to delete the example app. (**TODO: implement this**)

Now you're ready to rumble!

> Please note that this boilerplate is **production-ready and not meant for beginners**!

## Documentation

- [**Onboarding `apollo-graphql-server-boilerplate`**](docs/general/introduction.md): An introduction for newcomers to this boilerplate.
- [Overview](docs/README.md): A short overview of the included tools
- [**Commands**](docs/general/commands.md): Getting the most out of this boilerplate
- [Testing](docs/testing/README.md): How to work with the built-in test harness

---

## License

This project is licensed under the MIT license, Copyright (c) Ben Yap.
For more information see [`LICENSE.md`](https://github.com/bwyap/apollo-graphql-server-boilerplate/blob/master/LICENSE.md).
