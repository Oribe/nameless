export default class BgAnimate {
  canvas: HTMLCanvasElement;

  width: number

  height: number

  radius: number

  points: Point[] = [];

  counts = 100;

  constructor(radius: number) {
    const { body } = document;
    this.width = window.innerWidth;
    this.height = window.innerHeight;
    this.radius = +radius ?? 10;
    this.canvas = document.createElement('canvas');
    this.addStyles();
    body.appendChild(this.canvas);
  }

  addStyles() {
    this.canvas.style.width = '100vw';
    this.canvas.style.height = '100wh';
    this.canvas.style.position = 'absolute';
    this.canvas.style.cssText = `
      width: 100vw;
      height: 100vh;
      position: absolute;
      left: 0;
      top: 0;
      z-index: -99;
    `;
  }

  /**
   * 随机生成点的坐标，需指定radius的最大值
   * @param radius 粒子半径的最大值
   */
  createSinglePoint() {
    const x = Math.ceil(Math.random() * this.width);
    const y = Math.ceil(Math.random() * this.height);
    const r = +(Math.random() * this.radius).toFixed(4);
    const rateX = +(Math.random() * 2 - 1).toFixed(4);
    const rateY = +(Math.random() * 2 - 1).toFixed(4);
    return {
      x, y, r, rateX, rateY,
    };
  }

  createLotPoint() {
    let i = 0;
    while (i > this.counts) {
      this.points.push(this.createSinglePoint());
      i += 1;
    }
  }
}

interface Point {
  x: number;
  y: number;
  r: number;
  rateX: number;
  rateY: number;
}
