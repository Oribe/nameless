export default class Biubiubiu {
  startLocaion: { x: number; y: number }

  nowLocation: { x: number; y: number }

  targetLocation: { x: number; y: number }

  targetDistance: number

  speed: number

  angle: number

  arrived: boolean

  collection: [number, number][]

  acceleration = 1

  context: CanvasRenderingContext2D

  constructor(
    context: CanvasRenderingContext2D,
    startX: number, startY: number, targetX: number, targetY: number,
  ) {
    this.context = context;
    this.startLocaion = { x: startX, y: startY };
    // 运动当前的坐标，初始默认为起点坐标
    this.nowLocation = { x: startX, y: startY };
    this.targetLocation = { x: targetX, y: targetY };
    // 到目标点的距离
    this.targetDistance = this.getDistance(
      this.startLocaion.x, this.startLocaion.y,
      this.targetLocation.x, this.targetLocation.y,
    );
    // 速度
    this.speed = 2;
    // 角度
    this.angle = Math.atan2(
      this.targetLocation.y - this.startLocaion.y,
      this.targetLocation.x - this.startLocaion.x,
    );
    // 是否到达终点
    this.arrived = false;

    this.collection = new Array(10);
  }

  // eslint-disable-next-line class-methods-use-this
  getDistance(x0: number, y0: number, x1: number, y1: number) {
    const locX = x1 - x0;
    const locY = y1 - y0;
    return Math.sqrt(locX ** 2 + locY ** 2);
  }

  draw() {
    this.context.beginPath();
    const nextStartX = this.collection?.[0]?.[0] ?? this.startLocaion.x;
    const nextStartY = this.collection?.[0]?.[1] ?? this.startLocaion.y;
    this.context.moveTo(nextStartX, nextStartY);
    const lineStyle = this.context.createLinearGradient(
      nextStartX, nextStartY,
      this.nowLocation.x, this.nowLocation.y,
    );
    lineStyle.addColorStop(0, '#fff');
    lineStyle.addColorStop(1, '#000');
    this.context.lineWidth = 3;
    this.context.lineCap = 'round';
    // 线条需要定位到当前运动的坐标才能使线条动起来
    this.context.lineTo(this.nowLocation.x, this.nowLocation.y);
    this.context.strokeStyle = lineStyle;
    this.context.stroke();
  }

  update() {
    // 计算当前x,y的路程
    this.collection.shift();
    this.collection.push([this.nowLocation.x, this.nowLocation.y]);
    this.speed *= this.acceleration;
    const vx = Math.cos(this.angle) * this.speed;
    const vh = Math.sin(this.angle) * this.speed;
    // 计算当前所运动的总路程
    const nowDistance = this.getDistance(
      this.startLocaion.x, this.startLocaion.y,
      this.nowLocation.x + vx, this.nowLocation.y + vh,
    );
    if (nowDistance > this.targetDistance) {
      this.arrived = true;
    } else {
      this.nowLocation.x += vx;
      this.nowLocation.y += vh;
      this.arrived = false;
    }
  }

  init() {
    this.draw();
    this.update();
  }
}
