### Volta

Volta’s job is to manage your JavaScript command-line tools, such as `node`, `npm`, `yarn`, or executables shipped as part of JavaScript packages.

```bash
# install Volta
curl https://get.volta.sh | bash

# install Node
volta install node
volta install node@14
volta install node@14.15.5

# start using Node
node

# allows you to choose your Node engine and package manager versions for a project:
volta pin node@12
# Volta stores this in your package.json so you can commit your choice of tools to version control:
"volta": {
  "node": "12.20.2",
  "yarn": "1.19.2"
}

```

### install

```bash
$ npm install
$ npm install --legacy-peer-deps
# or
$ yarn install
```

### scripty

```bash
$ chmod -R u+x scripts
```

### lerna

```bash
$ npx lerna init

lerna bootstrap：等同于 lerna link + yarn install，用于创建符合链接并安装依赖包；

lerna run：会像执行一个 for 循环一样，在所有子项目中执行 npm script 脚本，并且，它会非常智能的识别依赖关系，并从根依赖开始执行命令；

lerna exec：像 lerna run 一样，会按照依赖顺序执行命令，不同的是，它可以执行任何命令，例如 shell 脚本；

lerna publish：发布代码有变动的 package，因此首先您需要在使用 Lerna 前使用 git commit 命令提交代码，好让 Lerna 有一个 baseline；

lerna add：将本地或远程的包作为依赖添加至当前的 monorepo 仓库中，该命令让 Lerna 可以识别并追踪包之间的依赖关系，因此非常重要；

```
