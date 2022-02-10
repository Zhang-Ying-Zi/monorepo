{
  "name": "generator-zyz-<%= appname %>",
  "version": "1.0.0",
  "description": "generator for <%= appname %>",
  "main": "generators/app/index.js",
  "scripts": {
    "link": "npm link",
    "generate": "yo zyz-<%= appname %>",
    "postpublish": "git push origin master"
  },
  "keywords": [
    "yeoman-generator"
  ],
  "author": {
    "name": "Zhang-Ying-Zi",
    "email": "489573239@qq.com",
    "url": "https://github.com/Zhang-Ying-Zi"
  },
  "license": "MIT",
  "dependencies": {
    "lodash": "^4.17.21",
    "mkdirp": "^1.0.4",
    "yeoman-generator": "^4.13.0",
    "yeoman-remote": "^1.0.1"
  }
}
