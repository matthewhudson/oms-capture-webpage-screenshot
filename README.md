# Microservice template for NodeJS

![Microservice](https://img.shields.io/badge/microservice-ready-brightgreen.svg?style=for-the-badge)
[![Build status](https://img.shields.io/travis/com/microservices/node/master.svg?style=for-the-badge)](https://travis-ci.com/microservices/node)

An OMS template for NodeJS + ExpressJS.

## Setup

Latest LTS version of Node.js 10.
[See Releases](https://nodejs.org/en/about/releases/).

```sh
yarn
```

First, install the [Commitizen cli](https://github.com/commitizen/cz-cli) tools:

```shell
npm install commitizen -g
```

Next, initialize your project to use the `cz-conventional-changelog` adapter by
typing

```sh
commitizen init cz-conventional-changelog --yarn --dev --exact
```

Use the following to replace `git commit`:

```sh
yarn run commit
```

## Test

## OMS Test Runner

```sh
> omg run message -a name=Service
ℹ Building Docker image
…
✔ Built Docker image with name: omg/l2hvbwuvc2vil2fzew5jes9ydwj5
✔ Started Docker container: 1c8a91688261
✔ Health check passed
✔ Ran action: `message` with output: {"message":"Hello Service"}
✔ Stopped Docker container: 1c8a91688261
```

docker run -d -it -p 80:8080

```sh
docker build . -t matthewhudson/oms-nodejs-app
docker run -p 49162:8080 -d e93a6b4e5d68 # matthewhudson/oms-nodejs-app
docker logs 4801a1874b29aae8dc4f48587535eedf3d227d3d4d284f84d237cff52cf3f931
docker push matthewhudson/oms-nodejs-app
```
