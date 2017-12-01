[![](https://badge.juejin.im/entry/599dc6da6fb9a0247b3b5c72/likes.svg?style=flat-square)](https://juejin.im/entry/599dc6da6fb9a0247b3b5c72/detail)
[![GitHub issues](https://img.shields.io/github/issues/surmon-china/emoji-233333.svg?style=flat-square)](https://github.com/surmon-china/emoji-233333/issues)
[![GitHub forks](https://img.shields.io/github/forks/surmon-china/emoji-233333.svg?style=flat-square)](https://github.com/surmon-china/emoji-233333/network)
[![GitHub stars](https://img.shields.io/github/stars/surmon-china/emoji-233333.svg?style=flat-square)](https://github.com/surmon-china/emoji-233333/stargazers)
[![Twitter](https://img.shields.io/twitter/url/https/github.com/surmon-china/emoji-233333.svg?style=flat-square)](https://twitter.com/intent/tweet?url=https://github.com/surmon-china/emoji-233333)

[![NPM](https://nodei.co/npm/emoji-233333.png?downloads=true&downloadRank=true&stars=true)](https://nodei.co/npm/emoji-233333/)
[![NPM](https://nodei.co/npm-dl/emoji-233333.png?months=9&height=3)](https://nodei.co/npm/emoji-233333/)

# emoji-233333

一个 2333333 插件

[Online Demo](https://surmon-china.github.io/emoji-233333/test/index.html)

### CDN

```html
<script type="text/javascript" src="../dist/233333.js"></script>
```

### NPM

```javascript
import Emoji233333 from 'emoji-233333'
```


### use

```javascript
// 实例化
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
   emoji: 'https://xxxxx',

   // 是否启用内置缓存机制
   cache: true
})

// 发射
emoji233333.launch()

// 更新配置
emoji233333.update(newOptions)
```
