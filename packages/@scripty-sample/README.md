package.json

```json
// 目前版本找不到路径
"scripty": {
    "path": "../../scripts"
  },

$ chmod -R u+x scripts


// 替换方案: /monorepo/node_modules/scripty/scripts 制作link软链接放到根目录
```

运行示例

```bash
$ npm run sample:hello -- world
```
