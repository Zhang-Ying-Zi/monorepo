### install

```bash
$ npm install
$ npm install --legacy-peer-deps
$ npm install --registry=https://registry.npm.taobao.org
$ npm install --registry=https://registry.npm.taobao.org --legacy-peer-deps
# or
$ yarn install
```

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

### npm workspaces

```bash
# Run "test" script on all packages
npm run test --workspaces

# Tip - this also works:
npm run test  -ws

# Runs "test" only on package-a
npm run test --workspace package-a

# Tip - this also works:
npm run test -w package-a

# Install `lodash` on `package-a`
npm install lodash --workspace package-a

# Install `tap` on `package-b` as a dev dependency
npm install tap --workspace package-b --save-dev

# Install `package-a` on `package-b`
npm install package-a --workspace package-b

# Install `eslint` in all packages
npm install eslint --workspaces
```

### scripty

```bash
$ chmod -R u+x scripts
```

### Verdaccio

default storage path: ~/.local/share/verdaccio
remove and restart

config file - /Users/zhangyingzi/.config/verdaccio/config.yaml

```bash
$ npm install --global verdaccio

$ verdaccio

# 本地 npm 仓库
# http://localhost:4873

1. Login
npm adduser --registry http://localhost:4873/
root
123456

2. Publish (如果用lerna可跳过)
npm config set max_body_size 100mb --registry http://localhost:4873/
npm publish --registry http://localhost:4873/

3. Refresh this page

# 每当执行 lerna publish 时，子项目所构建成的 package 将会发布在本地 npm 仓库中，
# 每当执行 lerna bootstrap 时，Verdaccio 将会放行，让您成功从远程 npm 仓库中拉取相应的代码。

npm unpublish --registry http://localhost:4873/  --force yourPackage

```

### lerna

```bash
npx lerna init

npx lerna bootstrap：等同于 lerna link + yarn install，用于创建符合链接并安装依赖包；

npx lerna run：会像执行一个 for 循环一样，在所有子项目中执行 npm script 脚本，并且，它会非常智能的识别依赖关系，并从根依赖开始执行命令；

npx lerna exec：像 lerna run 一样，会按照依赖顺序执行命令，不同的是，它可以执行任何命令，例如 shell 脚本；

npx lerna publish：发布代码有变动的 package，因此首先您需要在使用 Lerna 前使用 git commit 命令提交代码，好让 Lerna 有一个 baseline；

npx lerna add：将本地或远程的包作为依赖添加至当前的 monorepo 仓库中，该命令让 Lerna 可以识别并追踪包之间的依赖关系，因此非常重要；

npx lerna clean：删除所有node_modules

# 向 @mono/project2 和 @mono/project3 中添加 @mono/project1
lerna add @mono/project1 '@mono/project{2,3}'

除了上面介绍到的常用命令外，Lerna 还提供了一些参数满足我们更灵活的需求，例如：

--concurrency <number>：参数可以使 Lerna 利用计算机上的多个核心，并发运行，从而提升构建速度；
--scope '@mono/{pkg1,pkg2}'：--scope 参数可以指定 Lerna 命令的运行环境，通过使用该参数，Lerna 将不再是一把梭的在所有仓库中执行命令，而是可以精准地在我们所指定的仓库中执行命令，并且还支持示例中的模版语法；
--stream：该参数可使我们查看 Lerna 运行时的命令执行信息；


```

### commitlint

```bash

npm i -D @commitlint/cli @commitlint/config-conventional @commitlint/config-lerna-scopes commitlint husky lerna-changelog --registry=https://registry.npm.taobao.org

# commitlint 可以帮助我们检查提交的 commit 信息，它强制约束我们的 commit 信息必须在开头附加指定类型，用于标示本次提交的大致意图

git commit -m <type>[optional scope]: <description>
git commit -m 'fix(account): 修复xxx的bug'

##### 常用type

build	编译相关的修改，例如发布版本、对项目构建或者依赖的改动
chore	其他修改, 比如改变构建流程、或者增加依赖库、工具等
ci	持续集成修改
docs	文档修改
feat	新特性、新功能
fix	修改bug
perf	优化相关，比如提升性能、体验
refactor	代码重构
revert	回滚到上一个版本
style	代码格式修改, 注意不是 css 修改
test	测试用例修改


# 检查 commit 信息是否通过 commitlint 的检查
echo "build(project1): change something" | npx commitlint

```

### husky

帮助在提交 commit 信息时自动运行 commitlint 进行检查

npm set-script prepare "husky install"
npm run prepare

npx husky add .husky/pre-commit "npm test"
git add .husky/pre-commit

### tomono

Lerna 为我们提供了 lerna import 命令，用来将我们已有的包导入到 monorepo 仓库，并且还会保留该仓库的所有 commit 信息。然而实际上，该命令仅支持导入本地项目，并且不支持导入项目的分支和标签

如果想要导入远程仓库，或是要获取某个分支或标签，应该使用 tomono，其内容是一个 shell 脚本。

使用 tomono 导入远程仓库，您所需要做的只有两件事：

1. 创建一个包含所有需要导入 repo 地址的文本文件；
2. 执行 shell 命令：cat repos.txt | ./tomono.sh

### pm2

```bash
$ npm install pm2@latest -g
$ pm2 update
$ pm2 --name verdaccio start npm -- verdaccio
$ pm2 ps
$ pm2 delete 0
$ pm2 logs
$ pm2 restart app_name
$ pm2 reload app_name
$ pm2 stop app_name
$ pm2 delete app_name
$ pm2 plus
```

### stylelint

```
/* stylelint-disable */
a {}
/* stylelint-enable */
```
