export default class Boom {
  startLocation: { x: number; y: number }

  nowLocation: { x: number; y: number }

  speed: number

  acceleration: number

  angle: number

  targetCount: number

  nowNum: number

  alpha: number

  gravity: number

  decay: number

  arrived: boolean

  collection: [number, number][]

  context: CanvasRenderingContext2D

  constructor(context: CanvasRenderingContext2D, startX: number, startY: number) {
    this.context = context;
    this.startLocation = { x: startX, y: startY };
    this.nowLocation = { x: startX, y: startY };
    // 初始速度
    this.speed = Math.random() * 10 + 2;
    // 加速度
    this.acceleration = 0.95;
    // 没有确定的结束点，没有固定的角度，随机扩散
    this.angle = Math.random() * Math.PI * 2;
    // 这里设置阀值
    this.targetCount = 100;
    // 当前计算为1，用于判断是否会超出阀值
    this.nowNum = 1;
    // 透明度
    this.alpha = 1;
    // 重力系数
    this.gravity = 0.98;
    this.decay = 0.015;
    // 线段集合, 每次存10个，取10个帧的距离
    this.collection = new Array(10);

    // 是否到达目标点
    this.arrived = false;
  }

  draw() {
    this.context.beginPath();
    try {
      this.context.moveTo(this.collection[0][0], this.collection[0][1]);
    } catch (e) {
      this.context.moveTo(this.nowLocation.x, this.nowLocation.y);
    }
    this.context.lineWidth = 3;
    this.context.lineCap = 'round';
    this.context.lineTo(this.nowLocation.x, this.nowLocation.y);
    // 设置由透明度减小产生的渐隐效果，看起来没这么突兀
    this.context.strokeStyle = `rgba(0, 0, 0, ${this.alpha})`;
    this.context.stroke();
  }

  update() {
    this.collection.shift();
    this.collection.push([this.nowLocation.x, this.nowLocation.y]);
    this.speed *= this.acceleration;

    const vx = Math.cos(this.angle) * this.speed;
    const vy = Math.sin(this.angle) * this.speed + this.gravity;

    if (this.nowNum >= this.targetCount) {
      this.alpha -= this.decay;
    } else {
      this.nowLocation.x += vx;
      this.nowLocation.y += vy;
      this.nowNum += 1;
    }
    if (this.alpha <= 0) {
      this.arrived = true;
    }
  }

  init() {
    this.draw();
    this.update();
  }
}
