# emoji-233333

一个 2333333 插件

[Online Demo](https://surmon-china.github.io/emoji-233333/test/index.html)

## install

```bash
npm i emoji-233333 --save
```


## use

```javascript
const Emoji233333 = require('emoji-233333')
const emoji233333 = new Emoji233333({
    // 文档：DOM / String
   base: 'emoji',
   // 显示器分辨率：默认不需要指定自动分析
   // ratio: 1,
   // 表情缩放程度
   scale: 0.7,
   // 动画速度
   speed: 12,
   // 递增速度
   increaseSpeed: 0.06,
   // 表情密度
   density: 0.3,
   // 是否启用交错效果
   staggered: true,
   // 自定义表情图片地址 url || base64
   emoji: 'https://xxxxx'
})

// 发射
emoji233333.launch()

// 更新配置
emoji233333.update(newOptions)
```