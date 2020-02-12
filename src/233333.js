
const defaultOptions = {
  cache: true,
  base: 'emoji',
  scale: 0.5,
  speed: 10,
  density: 3,
  staggered: true,
  increaseSpeed: 0.08,
  emoji: null
}

export class Emoji233333 {

  // constructor
  constructor(options) {
    this.emojis = []
    this.kichikuing = false
    this.repeater = null
    this.emojiImg = null
    this.options = {
      ...defaultOptions,
      ...options
    }
    this._speed = this.options.speed

    this.initialize()
  }

  // 加载图片
  preLoadImage(url) {
    return new Promise((resolve, reject) => {
      const img = new Image()
      img.src = url
      if (img.complete) {
        resolve(img)
        return
      }
      img.onload = () => {
        resolve(img)
      }
      img.onerror = () => {
        reject(img)
      }
    })
  }

  // 启动动画
  initialize() {

    // 初始化画布
    const options = this.options
    this.canvas = typeof options.base === 'string' ? document.getElementById(options.base) : options.base
    this.canvas.width = this.canvas.width || this.windowSize.width
    this.canvas.height = this.canvas.height || this.windowSize.height
    this.context = this.canvas.getContext('2d')

    // 处理在高清屏下的渲染问题
    const devicePixelRatio = window.devicePixelRatio || options.ratio || 1
    const backingStore = Emoji233333.getPixelRatio(this.context)
    const ratio = this.options.ratio || (devicePixelRatio / backingStore)

    // 尺寸调整
    this.options.ratio = ratio
    this.canvas.style.width = this.canvas.width + 'px'
    this.canvas.style.height = this.canvas.height + 'px'
    this.canvas.width *= ratio
    this.canvas.height *= ratio

    // 是否开启缓存
    if (options.cache) {
      this.createCacheCanvas()
    }

    // 生成随机表情矩阵
    this.createEmojis()
  }

  // 生成表情矩阵
  createEmojis() {
    // (容器尺寸 / 表情尺寸 / 密度 || 1) = count
    const { options, emojis } = this
    if (!options.emoji) {
      return Promise.reject(new Error('未得到有效的 emoji 地址，无法继续！'))
    }

    return this.preLoadImage(options.emoji).then(emj => {
      this.emojiImg = emj
      const cWidth = parseInt(this.canvas.style.width)
      const count = parseInt(cWidth / (emj.width * options.scale)) * options.density
      for (let i = 0; i < count; i++) {
        let emojiX = (cWidth / count) * i * options.ratio
        const emojiY = -Emoji233333.rand(this.canvas.height)
        if (options.staggered) {
          emojiX = emojiX * Math.random() * 2
        }
        let emojiSizeRandom = Emoji233333.rand(6) / 10
        emojiSizeRandom = emojiSizeRandom < 0.5 ? 0.8 : emojiSizeRandom
        const newEmoji = { 
          x: ~~ (0.5 + emojiX), 
          y: ~~ (0.5 + emojiY),
          w: ~~ (0.5 + emj.width * emojiSizeRandom),
          h: ~~ (0.5 + emj.height * emojiSizeRandom),
          scale: options.scale
        }
        // 如果要生成交错效果，则
        if (options.staggered) {
          // 如果初始化在左 1/3，则目标位置为 右 max * 随机，否则反之
          let targetX = 0
          const fullWidth = this.canvas.width
          const xWidthExtentF = fullWidth / 3
          const xWidthExtentS = xWidthExtentF * 2
          if (emojiX < xWidthExtentF) {
            targetX = emojiX + (fullWidth * 1.2 * Math.random())
          } else if (emojiX > xWidthExtentS) {
            targetX = emojiX - (xWidthExtentS * 1.2 * Math.random())
          } else {
            let random = Math.random()
            targetX = random < 0.5 ? xWidthExtentF * random : fullWidth * Math.random()
          }
          newEmoji.targetX = ~~ (0.5 + targetX)
        }
        // console.log(newEmoji)
        emojis.push(newEmoji)
      }
    })
  }

  // 发射帧
  drawStep() {
    // console.log('drawStep', this.emojis)
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height)
    let nextGoOn = false
    const targetY = this.canvas.height
    this._speed += this.options.increaseSpeed
    this.cacheCanvasContext.clearRect(0, 0, this.canvas.width, this.canvas.height)
    for (let i = 0; i < this.emojis.length; i++) {
      const emoji = this.emojis[i]
      const xSpeed = this._speed * 0.6
      if (emoji.y < targetY) {
        if (this.options.staggered) {
          if (emoji.x < emoji.targetX) {
            if (emoji.targetX - emoji.x < xSpeed) {
              emoji.x = emoji.targetX
            } else {
              emoji.x += xSpeed
            }
          } else {
            if (emoji.x - emoji.targetX < xSpeed) {
              emoji.x = emoji.targetX
            } else {
              emoji.x -= xSpeed
            }
          }
        }
        emoji.y += this._speed
        /*
        let sizeScope = this._speed / this.canvas.height * this.emojiImg.width
        sizeScope = Math.abs(sizeScope) * emoji.scale
        if (sizeScope > this.emojiImg.width) {
          sizeScope = Math.abs(sizeScope - this.emojiImg.width)
        }
        if (emoji.w * 1.3 < this.emojiImg.width * emoji.scale) {
          emoji.w += sizeScope * 2
          emoji.h += sizeScope * 2
        } else {
          emoji.w -= sizeScope * 0.8
          emoji.h -= sizeScope * 0.8
        }
        */
        if (this.options.cache) {
          this.cacheCanvasContext.drawImage(
            this.emojiImg,
            ~~ (0.5 + emoji.x),
            ~~ (0.5 + emoji.y),
            ~~ (0.5 + emoji.w * emoji.scale),
            ~~ (0.5 + emoji.h * emoji.scale)
          )
        } else {
        	this.context.drawImage(
            this.emojiImg,
            ~~ (0.5 + emoji.x),
            ~~ (0.5 + emoji.y),
            ~~ (0.5 + emoji.w * emoji.scale),
            ~~ (0.5 + emoji.h * emoji.scale)
          )
        }
        nextGoOn = true
      } else {
        this.emojis[i] = null
        this.emojis.splice(i, 1)
        // console.log('单个释放', this.emojis)
      }
    }
    if (nextGoOn) {
      // console.log('整体递归')
      if (this.options.cache) {
        this.context.drawImage(this.cacheCanvas, 0, 0, this.canvas.width, this.canvas.height)
      }
    } else {
      // console.log('整体释放')
      this.kichikuing = false
      window.cancelAnimationFrame(this.repeater)
      if (this.options.onEnded) {
        this.options.onEnded()
      }
    }
  }

  // 创建缓存
  createCacheCanvas() {
    this.cacheCanvas = document.createElement('canvas')
    this.cacheCanvas.width = this.canvas.width
    this.cacheCanvas.height = this.canvas.height
    this.cacheCanvasContext = this.cacheCanvas.getContext('2d')
  }

  // 私有发射
  _launch() {
    this.kichikuing = true
    this.repeater = window.requestAnimationFrame(this._launch.bind(this))
    this.drawStep()
  }

  // 发射拦截器
  launch() {
    if (this.kichikuing) {
      return false
    }

    this.createEmojis().then(() => {
      if (this.options.onStart) {
        this.options.onStart()
      }
      this._speed = this.options.speed
      this._launch()
    })
  }

  // 更新配置
  update(options) {
    if (options) {
      this.options = {
        ...this.options,
        ...options
      }
    }
  }

  // 获取窗口尺寸
  get windowSize() {
    return {
      width: document.documentElement.clientWidth || document.body.clientWidth,
      height: document.documentElement.clientHeight || document.body.clientHeight
    }
  }

  // 获取画布比例
  static getPixelRatio(context) {
    return (
      context.backingStorePixelRatio ||
      context.webkitBackingStorePixelRatio ||
      context.mozBackingStorePixelRatio ||
      context.msBackingStorePixelRatio ||
      context.oBackingStorePixelRatio ||
      context.backingStorePixelRatio || 1
    )
  }

  // 生成随机数
  static rand(num) {
    return Math.floor(Math.random() * num + 1)
  }
}

if (typeof window !== undefined) {
  window.Emoji233333 = Emoji233333
}

export default Emoji233333
