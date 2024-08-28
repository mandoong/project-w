export const useCount = () =>
  useState("count", () =>
    reactive({
      count: 0,
      num: 0,
    })
  );
export class Canvas2d {
  constructor({ x, y, z, w, h }) {
    this.x = x;
    this.y = y;
    this.z = z;
    this.w = w;
    this.h = h;
    this.timer = 0;
    this.onTransition = false;
    this.dx = x;
    this.dy = y;
    this.dz = z;
    this.dw = w;
    this.dh = h;
  }

  cancle() {
    this.onTransition = false;
  }

  small(w, h, duration = 60, on = false) {
    // if (this.onTransition === false && on === false) {

    // } else {
    //   this.x = this.dx;
    //   this.y = this.dy;
    //   this.w = this.dw;
    //   this.h = this.dh;
    //   return;
    // }

    this.onTransition = "small";
    this.x = this.dx;
    this.y = this.dy;
    this.w = this.dw;
    this.h = this.dh;

    const per = Math.floor((this.timer / duration) * 100);

    if (per <= 10) {
      this.w = this.dw - (20 * per) / 10;
      this.h = this.dh - (20 * per) / 10;
      this.x = this.dx + (10 * per) / 10;
      this.y = this.dy + (10 * per) / 10;
    }

    if (per > 10) {
      this.w = this.dw + ((w + 20) * (per - 10)) / 90;
      this.h = this.dh + ((h + 20) * (per - 10)) / 90;
      this.x = this.dx - (((w + 20) / 2) * (per - 10)) / 90;
      this.y = this.dy - (((h + 20) / 2) * (per - 10)) / 90;
    }

    if (this.timer >= duration) {
      this.w = w;
      this.h = h;
      this.dw = w;
      this.dh = h;
      this.dx = this.x;
      this.dy = this.y;

      this.timer = 0;
      this.onTransition = false;
      return;
    } else {
      this.timer += 1;
    }

    requestAnimationFrame(() => this.small(w, h, duration));
  }
}

export class Canvas3d {
  static view = { x: 0, y: 0, z: 0 };

  constructor({
    dots = [{ x: 0, y: 0, z: 0 }],
    canvas,
    view,
    shadow,
    fill,
    stroke = "white",
    image,
  }) {
    this.dots = dots;
    this.canvas = canvas;
    this.obj = new Path2D();
    this.onTransition = false;
    this.fill = fill;
    this.stroke = stroke;
    this.shadow = shadow;

    this.image = image;
    if (view) Canvas3d.view = view;
  }

  draw({ rotate = { x: 0, y: 0, z: 0 } }) {
    this.obj = new Path2D();
    const transformedDots = this.dots.map(({ x, y, z }) => {
      const rotateDot = rotate3d(
        x,
        y,
        z,
        Canvas3d.view.x,
        Canvas3d.view.y,
        0,
        rotate
      );

      const { x: resultX, y: resultY } = canvas3dDraw(
        { x: rotateDot.x, y: rotateDot.y, z: rotateDot.z },
        Canvas3d.view,
        this.canvas
      );

      return { x: resultX, y: resultY };
    });

    transformedDots.forEach(({ x, y }, i) => {
      if (i === 0) this.obj.moveTo(x, y);
      else this.obj.lineTo(x, y);
    });

    this.obj.closePath();

    const ctx = this.canvas.getContext("2d");

    if (this.image) {
      const img = new Image();
      img.src = this.image;

      const [p0, p1, p2, p3] = transformedDots;
      const width = img.width;
      const height = img.height;

      const deltaX1 = p1.x - p0.x;
      const deltaY1 = p1.y - p0.y;
      const deltaX2 = p3.x - p0.x;
      const deltaY2 = p3.y - p0.y;

      const deltaU1 = width;
      const deltaV1 = 0;
      const deltaU2 = 0;
      const deltaV2 = height;

      const det = deltaU1 * deltaV2 - deltaU2 * deltaV1;
      const a = (deltaX1 * deltaV2 - deltaX2 * deltaV1) / det;
      const b = (deltaY1 * deltaV2 - deltaY2 * deltaV1) / det;
      const c = (deltaX2 * deltaU1 - deltaX1 * deltaU2) / det;
      const d = (deltaY2 * deltaU1 - deltaY1 * deltaU2) / det;
      const e = p0.x;
      const f = p0.y;

      ctx.setTransform(a, b, c, d, e, f);
      ctx.drawImage(img, 0, 0, width, height);
      ctx.setTransform(1, 0, 0, 1, 0, 0);
    }

    if (this.stroke) {
      ctx.strokeStyle = this.stroke;
      ctx.stroke(this.obj);
    }
    if (this.shadow) {
      ctx.shadowColor = "white";
      ctx.shadowBlur = 10;
    }
  }

  transform(multiply = 2, duration = 300) {
    if (this.onTransition) return;
    this.onTransition = true;

    let time = 0;
    const timePerDuration = Math.floor(duration / (1000 / 60));
    const defaultDots = this.dots;
    const { length } = this.dots;
    const cx = defaultDots.reduce((a, c) => a + c.x, 0) / length;
    const cy = defaultDots.reduce((a, c) => a + c.y, 0) / length;
    const max = Math.PI;

    const f = () => {
      this.dots = this.dots.map(({ x, y, z }, i) => {
        const v = (2 - (Math.cos((max / timePerDuration) * time) + 1)) / 2;
        return {
          x: defaultDots[i].x + (defaultDots[i].x - cx) * (multiply * v),
          y: defaultDots[i].y + (defaultDots[i].y - cy) * (multiply * v),
          z,
        };
      });

      time++;
      if (time > timePerDuration) {
        this.onTransition = false;
        return;
      }
      return requestAnimationFrame(() => f());
    };

    f();
  }

  onMouse(ClinetX, ClinetY) {
    const ctx = this.canvas.getContext("2d");
    return ctx.isPointInPath(this.obj, ClinetX, ClinetY);
  }
}

export const useAddCount = () => {
  const data = useCount();
  data.value.count++;
};

export const rotate3d = (x, y, z, rx, ry, rz, angles, type = "angle") => {
  const tmp = {
    x: x - rx,
    y: y - ry,
    z: z - rz,
  };
  if (angles?.x) {
    let angle = angles?.x;

    if (type !== "angle") {
      const r =
        Math.sqrt(
          Math.pow(Math.abs(x - rx), 2) + Math.pow(Math.abs(z - rz), 2)
        ) * Math.PI;
      angle = 360 * (r !== 0 ? angles?.x / r : 0);
    }
    let radians = (angle * Math.PI) / 180;

    const tmps = {
      x: tmp.x,
      y: tmp.y,
      z: tmp.z,
    };

    tmp.x = tmps.x * Math.cos(radians) - tmps.z * Math.sin(radians);
    tmp.z = tmps.x * Math.sin(radians) + tmps.z * Math.cos(radians);
  }

  if (angles?.y) {
    let angle = angles?.y;

    if (type !== "angle") {
      const r =
        Math.sqrt(
          Math.pow(Math.abs(x - rx), 2) + Math.pow(Math.abs(y - ry), 2)
        ) * Math.PI;
      angle = 360 * (r !== 0 ? angles?.y / r : 0);
    }

    let radians = (angle * Math.PI) / 180;

    const tmps = {
      x: tmp.x,
      y: tmp.y,
      z: tmp.z,
    };

    tmp.x = tmps.x * Math.cos(radians) - tmps.y * Math.sin(radians);
    tmp.y = tmps.x * Math.sin(radians) + tmps.y * Math.cos(radians);
  }

  if (angles?.z) {
    let angle = angles?.z;

    if (type !== "angle") {
      const r =
        Math.sqrt(
          Math.pow(Math.abs(y - ry), 2) + Math.pow(Math.abs(z - rz), 2)
        ) * Math.PI;
      angle = 360 * (r !== 0 ? angles.z / r : 0);
    }

    let radians = (angle * Math.PI) / 180;

    const tmps = {
      x: tmp.x,
      y: tmp.y,
      z: tmp.z,
    };

    tmp.y = tmps.y * Math.cos(radians) - tmps.z * Math.sin(radians);
    tmp.z = tmps.y * Math.sin(radians) + tmps.z * Math.cos(radians);
  }

  return { x: tmp.x + rx, y: tmp.y + ry, z: tmp.z + rz };
};

export const canvas3dDraw = ({ x, y, z }, view, canvas) => {
  const rotateView = { x, y, z };
  const ratio = view.z === rotateView.z ? 1 : view.z / (view.z - rotateView.z);

  const resultX =
    view.z !== 0
      ? canvas.width / 2 +
        (((rotateView.x - view.x) * ratio) / view.z) * canvas.width
      : canvas.width / 2;
  const resultY =
    view.z !== 0
      ? canvas.height / 2 +
        (((rotateView.y - view.y) * ratio) / view.z) * canvas.width
      : canvas.height / 2;

  return { x: resultX, y: resultY };
};
