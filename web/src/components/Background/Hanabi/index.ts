import Boom from './boom';
import Biubiubiu from './biubiubiu';
import Kirakira from './kirakira';

export default class Animate {
  canvas: HTMLCanvasElement

  canvasWidth: number = window.innerWidth

  canvasHeight: number = window.innerHeight

  context: CanvasRenderingContext2D

  startX = 0

  startY = 0

  targetX = 0

  targetY = 0

  kiras: Kirakira[] = []

  bius: Biubiubiu[] = []

  /* 定义一个数组做为爆炸类的集合 */
  booms: Boom[] = []

  timerTarget: number

  timerNum: number

  constructor(canvas: HTMLCanvasElement) {
    this.canvas = canvas;
    this.context = this.canvas.getContext('2d') as CanvasRenderingContext2D;
    // 避免每帧都进行绘制导致过量绘制，设置阀值，到达阀值的时候再进行绘制
    this.timerTarget = 10;
    this.timerNum = 0;
  }

  pushBoom(x: number, y: number) {
    // 实例化爆炸效果，随机条数的射线扩散
    for (let bi = Math.random() * 10 + 30; bi > 0; bi -= 1) {
      this.booms.push(new Boom(this.context, x, y));
    }
  }

  clearPreviousRect() {
    this.context.clearRect(0, 0, this.canvasWidth, this.canvasHeight);
  }

  run() {
    window.requestAnimationFrame(this.run.bind(this));
    this.clearPreviousRect();

    let biuNum = this.bius.length;

    while (biuNum > 0) {
      biuNum -= 1;
      this.bius[biuNum].init();
      this.kiras[biuNum].init();
      if (this.bius[biuNum].arrived) { // 到达目标点
        this.pushBoom(
          this.bius[biuNum].nowLocation.x,
          this.bius[biuNum].nowLocation.y,
        );
        this.bius.splice(biuNum, 1); // 删除线
        this.kiras.splice(biuNum, 1); // 删除光圈
      }
    }

    let bnum = this.booms.length;
    while (bnum > 0) {
      bnum -= 1;
      this.booms[bnum].init(); // 触发动画
      if (this.booms[bnum].arrived) {
        // 到达目标后，把炸点移除，释放空间
        this.booms.splice(bnum, 1);
      }
    }

    if (this.timerNum >= this.timerTarget) {
      // 到达阀值后开始绘制实例化射线
      this.startX = Math.random() * (this.canvasWidth / 2);
      this.startY = this.canvasHeight;
      this.targetX = Math.random() * this.canvasWidth;
      this.targetY = Math.random() * (this.canvasHeight / 2);
      const exBius = new Biubiubiu(
        this.context,
        this.startX, this.startY,
        this.startX, this.targetY,
      );
      const exKira = new Kirakira(
        this.context,
        this.startX, this.targetY,
      );
      this.bius.push(exBius);
      this.kiras.push(exKira);
      this.timerNum = 0;
    } else {
      this.timerNum += 1;
    }
  }
}
