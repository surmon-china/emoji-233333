(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(['exports'], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports);
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports);
    global.Emoji233333 = mod.exports;
  }
})(this, function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var _createClass = function () {
    function defineProperties(target, props) {
      for (var i = 0; i < props.length; i++) {
        var descriptor = props[i];
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ("value" in descriptor) descriptor.writable = true;
        Object.defineProperty(target, descriptor.key, descriptor);
      }
    }

    return function (Constructor, protoProps, staticProps) {
      if (protoProps) defineProperties(Constructor.prototype, protoProps);
      if (staticProps) defineProperties(Constructor, staticProps);
      return Constructor;
    };
  }();

  var Emoji233333 = exports.Emoji233333 = function () {

    // constructor
    function Emoji233333(options) {
      _classCallCheck(this, Emoji233333);

      this.emojis = [];
      this.kichikuing = false;
      this.repeater = null;
      this.emojiImg = null;
      this.defaultOptions = {
        cache: true,
        base: 'emoji',
        scale: 0.5,
        speed: 10,
        density: 3,
        staggered: true,
        increaseSpeed: 0.08,
        emoji: null
      };
      this.options = Object.assign({}, this.defaultOptions, options);
      this._speed = this.options.speed;

      this.initialize();
    }

    // 加载图片


    _createClass(Emoji233333, [{
      key: 'preImage',
      value: function preImage(url, callback) {
        var img = new Image();
        img.src = url;
        if (img.complete) {
          return callback(img);
        }
        img.onload = function () {
          return callback(img);
        };
      }

      // 启动动画

    }, {
      key: 'initialize',
      value: function initialize() {

        // 初始化画布
        var options = this.options;
        this.canvas = typeof options.base === 'string' ? document.getElementById(options.base) : options.base;
        this.canvas.width = this.canvas.width || this.windowSize.width;
        this.canvas.height = this.canvas.height || this.windowSize.height;
        this.context = this.canvas.getContext('2d');

        // 处理在高清屏下的渲染问题
        var devicePixelRatio = window.devicePixelRatio || options.ratio || 1;
        var backingStore = Emoji233333.getPixelRatio(this.context);
        var ratio = this.options.ratio || devicePixelRatio / backingStore;

        // 尺寸调整
        this.options.ratio = ratio;
        this.canvas.style.width = this.canvas.width + 'px';
        this.canvas.style.height = this.canvas.height + 'px';
        this.canvas.width *= ratio;
        this.canvas.height *= ratio;

        // 是否开启缓存
        if (options.cache) {
          this.createCacheCanvas();
        }

        // 生成随机表情矩阵
        this.createEmojis();
      }

      // 生成表情矩阵

    }, {
      key: 'createEmojis',
      value: function createEmojis() {
        var _this = this;

        // (容器尺寸 / 表情尺寸 / 密度 || 1) = count
        this.emojis = [];
        var options = this.options;
        if (!options.emoji) {
          throw new Error('缺少 emoji 表情，无法继续！');
        }

        this.preImage(options.emoji, function (emj) {
          _this.emojiImg = emj;
          var cWidth = parseInt(_this.canvas.style.width);
          var count = parseInt(cWidth / (emj.width * options.scale)) * options.density;
          for (var i = 0; i < count; i++) {
            var emojiX = cWidth / count * i * options.ratio;
            var emojiY = -Emoji233333.rand(_this.canvas.height);
            if (options.staggered) {
              emojiX = emojiX * Math.random() * 2;
            }
            var emojiSizeRandom = Emoji233333.rand(6) / 10;
            emojiSizeRandom = emojiSizeRandom < 0.5 ? 0.8 : emojiSizeRandom;
            var newEmoji = {
              x: ~~(0.5 + emojiX),
              y: ~~(0.5 + emojiY),
              w: ~~(0.5 + emj.width * emojiSizeRandom),
              h: ~~(0.5 + emj.height * emojiSizeRandom),
              scale: options.scale
              // 如果要生成交错效果，则
            };if (options.staggered) {
              // 如果初始化在左 1/3，则目标位置为 右 max * 随机，否则反之
              var targetX = 0;
              var fullWidth = _this.canvas.width;
              var xWidthExtentF = fullWidth / 3;
              var xWidthExtentS = xWidthExtentF * 2;
              if (emojiX < xWidthExtentF) {
                targetX = emojiX + fullWidth * 1.2 * Math.random();
              } else if (emojiX > xWidthExtentS) {
                targetX = emojiX - xWidthExtentS * 1.2 * Math.random();
              } else {
                var random = Math.random();
                targetX = random < 0.5 ? xWidthExtentF * random : fullWidth * Math.random();
              }
              newEmoji.targetX = ~~(0.5 + targetX);
            }
            // console.log(newEmoji)
            _this.emojis.push(newEmoji);
          }
        });
      }

      // 发射帧

    }, {
      key: 'drawStep',
      value: function drawStep() {
        // console.log('开始帧')
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
        var nextGoOn = false;
        var targetY = this.canvas.height;
        this._speed += this.options.increaseSpeed;
        this.cacheCanvasContext.clearRect(0, 0, this.canvas.width, this.canvas.height);
        for (var i = 0; i < this.emojis.length; i++) {
          var emoji = this.emojis[i];
          var xSpeed = this._speed * 0.6;
          if (emoji.y < targetY) {
            if (this.options.staggered) {
              if (emoji.x < emoji.targetX) {
                if (emoji.targetX - emoji.x < xSpeed) {
                  emoji.x = emoji.targetX;
                } else {
                  emoji.x += xSpeed;
                }
              } else {
                if (emoji.x - emoji.targetX < xSpeed) {
                  emoji.x = emoji.targetX;
                } else {
                  emoji.x -= xSpeed;
                }
              }
            }
            emoji.y += this._speed;
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
              this.cacheCanvasContext.drawImage(this.emojiImg, ~~(0.5 + emoji.x), ~~(0.5 + emoji.y), ~~(0.5 + emoji.w * emoji.scale), ~~(0.5 + emoji.h * emoji.scale));
            } else {
              this.context.drawImage(this.emojiImg, ~~(0.5 + emoji.x), ~~(0.5 + emoji.y), ~~(0.5 + emoji.w * emoji.scale), ~~(0.5 + emoji.h * emoji.scale));
            }
            nextGoOn = true;
          } else {
            this.emojis[i] = null;
            this.emojis.splice(i, 1);
            // console.log('单个释放', this.emojis)
          }
        }
        if (nextGoOn) {
          // console.log('整体递归')
          if (this.options.cache) {
            this.context.drawImage(this.cacheCanvas, 0, 0, this.canvas.width, this.canvas.height);
          }
        } else {
          // console.log('整体释放')
          this.kichikuing = false;
          window.cancelAnimationFrame(this.repeater);
        }
      }

      // 创建缓存

    }, {
      key: 'createCacheCanvas',
      value: function createCacheCanvas() {
        this.cacheCanvas = document.createElement('canvas');
        this.cacheCanvas.width = this.canvas.width;
        this.cacheCanvas.height = this.canvas.height;
        this.cacheCanvasContext = this.cacheCanvas.getContext('2d');
      }

      // 私有发射

    }, {
      key: '_launch',
      value: function _launch() {
        this.kichikuing = true;
        this.repeater = window.requestAnimationFrame(this._launch.bind(this));
        this.drawStep();
      }

      // 发射拦截器

    }, {
      key: 'launch',
      value: function launch() {
        if (this.kichikuing) {
          return false;
        } else {
          this._speed = this.options.speed;
          this.createEmojis();
          this._launch();
        }
      }

      // 更新配置

    }, {
      key: 'update',
      value: function update(options) {
        if (!options) {
          this.options = Object.assign({}, this.defaultOptions);
        } else {
          this.options = Object.assign(this.options, options);
        }
      }

      // 获取窗口尺寸

    }, {
      key: 'windowSize',
      get: function get() {
        return {
          width: document.documentElement.clientWidth || document.body.clientWidth,
          height: document.documentElement.clientHeight || document.body.clientHeight
        };
      }

      // 获取画布比例

    }], [{
      key: 'getPixelRatio',
      value: function getPixelRatio(context) {
        return context.backingStorePixelRatio || context.webkitBackingStorePixelRatio || context.mozBackingStorePixelRatio || context.msBackingStorePixelRatio || context.oBackingStorePixelRatio || context.backingStorePixelRatio || 1;
      }

      // 生成随机数

    }, {
      key: 'rand',
      value: function rand(num) {
        return Math.floor(Math.random() * num + 1);
      }
    }]);

    return Emoji233333;
  }();

  exports.default = Emoji233333;
});
