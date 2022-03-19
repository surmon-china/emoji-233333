
<p></p>
<p align="center">
  <a href="#" target="_blank">
    <img width="66px" src="/dev/666.png" />
  </a>
</p>

# emoji-233333
[![GitHub stars](https://img.shields.io/github/stars/surmon-china/emoji-233333.svg?style=for-the-badge)](https://github.com/surmon-china/emoji-233333/stargazers)
&nbsp;
[![npm](https://img.shields.io/npm/v/emoji-233333?color=%23c7343a&label=npm&style=for-the-badge)](https://www.npmjs.com/package/emoji-233333)
&nbsp;
[![GitHub issues](https://img.shields.io/github/issues-raw/surmon-china/emoji-233333.svg?style=for-the-badge)](https://github.com/surmon-china/emoji-233333/issues)
&nbsp;
[![license](https://img.shields.io/github/license/mashape/apistatus.svg?style=for-the-badge)](/LICENSE)

**[😂 2333333.](https://surmon-china.github.io/emoji-233333/dev)**

---

**NPM**

```javascript
import Emoji233333 from 'emoji-233333'
```

#### Usage

```javascript
const emoji233333 = new Emoji233333({

  // DOM / 选择器
  base: 'emoji', // string | HTMLElement

  // 显示器分辨率, 默认不需要指定自动分析
  ratio: 1, // number

  // 表情缩放程度
  scale: 0.7, // number

  // 动画速度
  speed: 12, // number

  // 递增速度
  increaseSpeed: 0.06, // number

  // 表情密度
  density: 0.3, // number

  // 是否启用交错效果
  staggered: true, // boolean
  
  // 自定义表情图片地址 url || base64
  emoji: 'https://xxxxx', // string

  // 是否启用内置缓存机制
  cache: true // boolean
})

// 发射
emoji233333.launch()

// 更新配置
emoji233333.update(newOptions)
```

### License

[MIT](/LICENSE)
