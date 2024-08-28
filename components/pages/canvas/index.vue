<template>
  <div class="canvas_wrap">
    <canvas ref="r_canvas"></canvas>
  </div>
</template>

<script setup>
const r_canvas = ref();
const $ = ref();

let box;

const view = {
  x: 0,
  y: 0,
  z: 2000,
  reg: 0,
};

const middle = {
  x: 0,
  y: 0,
  z: 0,
};

const _canvasObjs = {};

const content = {};
const items = {};
const slant = ref({});
let newBox;
const objects = ref([]);

const click = (evt) => {
  // Object.values(items)[0].small(500, 500, 60);
  const { offsetX, offsetY } = evt;
  const target = Object.entries(content).findLast(([k, v]) =>
    $.value.isPointInPath(v, offsetX, offsetY)
  );

  for (const key in _canvasObjs) {
    if (_canvasObjs[key].onMouse(offsetX, offsetY)) {
      _canvasObjs[key].transform(1.2, 1000);
      break;
    }
  }
};

const draw = () => {
  $.value.clearRect(0, 0, r_canvas.value.width, r_canvas.value.height);

  Object.keys(_canvasObjs).map((key) => {
    _canvasObjs[key].draw({
      rotate: {
        x: slant.value.x,
        z: slant.value.y,
      },
    });
  });

  requestAnimationFrame(() => draw());
};

const mouseover = (evt) => {
  const { clientX, clientY } = evt;
  slant.value.x = ((clientX - r_canvas.value.width / 2) / 20) * -1;
  slant.value.y = ((clientY - r_canvas.value.height / 2) / 20) * -1;
};

const mouseleave = (evt) => {};

onMounted(() => {
  $.value = r_canvas.value.getContext("2d");
  r_canvas.value.width = window.innerWidth - 10;
  r_canvas.value.height = window.innerHeight - 10;

  _canvasObjs.backGround = new Canvas3d({
    dots: [
      { x: -500, y: -500, z: 0 },
      { x: 500, y: -500, z: 0 },
      { x: 500, y: 500, z: 0 },
      { x: -500, y: 500, z: 0 },
    ],
    fill: "green",
    shadow: true,
    canvas: r_canvas.value,
    image: "/images/시계탑.jpg",
  });

  _canvasObjs.newBox = new Canvas3d({
    dots: [
      { x: -50, y: -50, z: 0 },
      { x: 50, y: -50, z: 0 },
      { x: 50, y: 50, z: 0 },
      { x: -50, y: 50, z: 0 },
    ],
    fill: "green",
    shadow: true,
    canvas: r_canvas.value,
  });

  Canvas3d.view = view;

  r_canvas.value.addEventListener("click", click);
  r_canvas.value.addEventListener("mousemove", mouseover);
  r_canvas.value.addEventListener("mouseleave", mouseleave);

  draw();
});
</script>

<style lang="scss" scoped>
.canvas_wrap {
  background-color: black;
}
</style>
