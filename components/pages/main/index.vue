<template>
  <div class="main_page" :class="{ disable: !p_active.active }">
    <canvas class="canvas" ref="r_canvas" />
    <div class="main_warp">
      <div class="title">Project Woong</div>
      <div class="desc">Frontend Developer</div>
    </div>
    <div class="svg_wrap">
      <svg class="svg">
        <path :d="c_graphData.mountain_3" fill="#635985" />
      </svg>
      <svg class="svg">
        <path :d="c_graphData.mountain_2" fill="#443C68" />
      </svg>
      <svg class="svg">
        <path :d="c_graphData.mountain_1" fill="#393053" />
      </svg>
    </div>
  </div>
</template>

<script setup>
import * as d3 from "d3";

const r_canvas = ref();
const $ = ref();
const _mouse = ref({});
const p_active = defineProps(["active"]);

const items = ref([
  // {name : "Balls", url : 'balls'},
  // {name : "Move Map", url : 'movemap'},
  { name: "Interection ", url: "interection" },
  { name: "Web", url: "web" },
  { name: "Canvas", url: "canvas" },
  { name: "Three JS", url: "three" },
]);
const _opactiy = ref(0);

const timer = setInterval(() => {
  _opactiy.value = _opactiy.value + 0.01;
  if (_opactiy.value >= 1) clearInterval(timer);
}, 30);

const dots = ref();

const f_draw = () => {
  $.value.fillStyle = `rgba(200, 200, 200, ${0.5 * _opactiy.value})`;
  $.value.clearRect(0, 0, r_canvas.value.width, r_canvas.value.height);

  dots.value = dots.value.map((e) => {
    const r = e;
    if (r.x + e.ax < 0) {
      r.x = r_canvas.value.width;
    } else if (r.x + e.ax > r_canvas.value.width) {
      r.x = 0;
    } else {
      r.x = r.x + e.ax;
    }

    if (r.y + e.ay < 0) {
      r.y = r_canvas.value.height;
    } else if (r.y + e.ay > r_canvas.value.height) {
      r.y = 0;
    } else {
      r.y = r.y + e.ay;
    }

    return r;
  });

  for (let i of dots.value) {
    for (let j of dots.value) {
      const dotline = Math.abs(j.x - i.x) + Math.abs(j.y - i.y);
      const dotLength = 100;

      if (dotline < dotLength) {
        $.value.beginPath();
        $.value.moveTo(j.x, j.y);
        $.value.lineTo(i.x, i.y);
        $.value.strokeStyle = `rgba(150, 150, 150, ${
          (1 - dotline / dotLength) * _opactiy.value
        })`;
        $.value.stroke();
      }
    }

    const line =
      Math.abs(_mouse.value?.x - i.x) + Math.abs(_mouse.value?.y - i.y);
    const length = 200;

    if (line < length) {
      $.value.beginPath();
      $.value.moveTo(_mouse.value?.x, _mouse.value?.y);
      $.value.lineTo(i.x, i.y);
      $.value.strokeStyle = `rgba(150, 150, 150, ${
        (1 - line / length) * _opactiy.value
      })`;
      $.value.stroke();
    }

    $.value.fillRect(i.x, i.y, 2, 2);
  }

  requestAnimationFrame(() => f_draw());
};

const f_mouseMove = (evt) => {
  _mouse.value.x = evt.clientX;
  _mouse.value.y = evt.clientY;
};

onMounted(() => {
  $.value = r_canvas.value.getContext("2d");
  r_canvas.value.width = window.innerWidth - 10;
  r_canvas.value.height = window.innerHeight - 10;

  dots.value = Array(100)
    .fill({})
    .map((e) => {
      const r = {};
      r.x = Math.floor(Math.random() * (r_canvas.value?.width || 1000));
      r.y = Math.floor(Math.random() * (r_canvas.value?.height || 1000));
      r.ax = Math.random() - 0.5;
      r.ay = Math.random() - 0.5;

      return r;
    });

  window.addEventListener("mousemove", f_mouseMove);

  f_draw();
});

const c_linData = computed(() => {
  const result = {};

  const w = window.innerWidth;
  const h = window.innerHeight;

  for (let i = 0; i < 3; i++) {
    let dot = 0;
    let arr = [];

    while (dot <= w * 2) {
      arr.push([dot, h - (50 + (30 * i + Math.floor(Math.random() * 100)))]);
      dot += Math.floor(200 + Math.random() * 30);
      if (dot > w * 2) {
        dot = w * 2;
        arr.push([dot, h - (50 + (30 * i + Math.floor(Math.random() * 100)))]);
        break;
      }
    }

    result[i] = arr;
  }

  return result;
});

const count = ref(0);

const f_interval = () => {
  count.value += 0.005;

  requestAnimationFrame(() => f_interval());
};

const c_graphData = computed(() => {
  const result = {};

  const w = window.innerWidth;
  const h = window.innerHeight;
  for (let i = 0; i < 3; i++) {
    const arr = c_linData.value[i].map((e, _i) => {
      const num = 10 * Math.cos((count.value / (i + 1)) * Math.PI);

      if (i % 2 === 0) {
        return [e[0], e[1] + (_i % 2 === 0 ? num : -num)];
      } else {
        return [e[0], e[1] + (_i % 2 !== 0 ? num : -num)];
      }
    });

    arr.push([w, h]);
    arr.unshift([0, h]);
    // Create a d3 line generator with curve
    const lineGenerator = d3
      .line()
      .curve(d3.curveCatmullRom)
      .x((d) => d[0])
      .y((d) => d[1]);

    // Generate the path data
    result[`mountain_${i + 1}`] = lineGenerator(arr);
  }

  return result;
});

onMounted(() => {
  f_interval();
});
</script>

<style lang="scss" scoped>
.main_page {
  height: 100vh;

  position: relative;
  transition: all 2s ease;

  .canvas {
    position: absolute;
    transition: all 2s ease 500ms;
  }

  .main_warp {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;

    .title {
      color: #635985;
      font-size: 80px;
      mix-blend-mode: difference;
      text-shadow: 0px 5px 10px #443c68;
      animation-delay: 1s;
      animation: padeIn 2s ease;
      transition: all 1s ease;
    }

    .desc {
      color: #3d3065;
      font-size: 20px;
      animation-delay: 1.5s;
      animation: padeIn 2s ease;
      transition: all 1s ease;
    }
  }

  .svg_wrap {
    .svg {
      position: absolute;
      width: 100%;
      height: 100%;
      top: 0;
      transition: all 1s ease;
      &:nth-child(1) {
        transition-delay: 300ms;
      }
      &:nth-child(2) {
        transition-delay: 200ms;
      }
      &:nth-child(3) {
        transition-delay: 100ms;
      }
    }
  }

  .toggle {
    position: absolute;
    top: 0;
    left: 0;
  }

  &.disable {
    .canvas {
      opacity: 0;
    }

    .main_warp {
      .title {
        opacity: 0;
      }
      .desc {
        opacity: 0;
      }
    }

    .svg {
      transform: translateY(30%);
    }
  }
}

@keyframes padeIn {
  from {
    opacity: 0;
  }

  to {
    opacity: 1;
  }
}
</style>
