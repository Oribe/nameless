export default class Kirakira {
  targetLocation: { x: number; y: number }

  radius = 1

  context: CanvasRenderingContext2D

  constructor(context: CanvasRenderingContext2D, x: number, y: number) {
    this.context = context;
    this.targetLocation = { x, y };
  }

  draw() {
    this.context.beginPath();
    this.context.arc(this.targetLocation.x, this.targetLocation.y, this.radius, 0, Math.PI * 2);
    this.context.lineWidth = 2;
    this.context.strokeStyle = '#000';
    this.context.stroke();
  }

  update() {
    if (this.radius < 5) {
      this.radius += 0.3;
    } else {
      this.radius = 1;
    }
  }

  init() {
    this.draw();
    this.update();
  }
}
