<template>
  <div class="space_wrap" :class="{ disable: !props.active }">
    <img class="space_img" src="/public/images/space.jpg" />
    <canvas class="canvas" ref="r_canvas" ></canvas>
  </div>
</template>

<script setup>
const r_canvas = ref();
const _onDraw = ref(false)
const props = defineProps({
  active: Boolean
})


const $ = ref();
const view = {
  x: 0,
  y: 0,
  z: -400,
  reg: -90,
};

const middle = {
  x: 0,
  y: 0,
  z: 0,
};

const _canvasObjs = {};
let focusTarget
let count = 0;

const circles = {
  1: {
    x: 0,
    y: 0,
    z: -300,
    r: 50,
    color: '#2e3c5b',
    img: '/images/EarthMap.jpg',
  },
  2:{
    x: 0,
    y: 0,
    z: -100,
    r: 20,
    color: '#633122',
    img: '/images/MarsMap.jpg',
  },
  3:{
    x: 0,
    y: 0,
    z: 400,
    r: 50,
    color: '#7d6343',
    img: '/images/SaturnMap.jpg',
  },
  4: {
    x: 0,
    y: 0,
    z: -200,
    r: 20,
    color: '#7d4321',
    img: '/images/venusMap.jpg',
  },
  5: {
    x: 0,
    y: 0,
    z: 0,
    r: 150,
    color: '#c7720f',
    shadow: 'rgba(200, 100, 20, 1)',
    img: '/images/sunMap.jpg',
  },
}

const f_distance = (z, size) => {
  const distance = view.z - z < 0 ? 0 : view.z - z;
  if (distance === 0) return 1;

  return r_canvas.value.width * (size / (distance * 2))
}

const drawCircleImage = (img, x, y, r, count) => {

  $.value.drawImage(
    img, 
    count % img.width,
    0,
    img.width / 2,
    img.height,
    x - r,
    y - r,
    r * 2,
    r * 2
  );

  $.value.drawImage(
    img, 
    (-1 * (img.width -5)) + (count % img.width),
    0,
    img.width / 2,
    img.height,
    x - r ,
    y - r,
    r * 2,
    r * 2
  );
}

const images = ref({});

const preloadImages = () => {
  Object.keys(circles).forEach((key) => {
    const circle = circles[key];
    if (circle.img) {
      const img = new Image();
      img.src = circle.img;
      images.value[key] = img; 
    }
  });
};


const draw = () => {
  $.value.clearRect(0, 0, r_canvas.value.width, r_canvas.value.height);

  const newCircles = Object.keys(circles).map((key) => {
    const circle = circles[key];
    const {x, y, z} = rotate3d(circle.x, circle.y, circle.z, 0, 0, 0, { x: count / 4, y: 0, z: 0 }, 'px');
    const { x: resultX, y: resultY } = canvas3dDraw({x, y, z}, view, r_canvas.value)

    return {
      ...circle,
      x: resultX,
      y: resultY,
      z: z,
      index: key
    }
  })

  newCircles.sort((a, b) => a.z - b.z).forEach((circle) => {
    const {x, y, z} = rotate3d(circle.x, circle.y, circle.z, 0, 0, 0, { z: view.reg }, 'px');
    if (z + 100 > view.z) return
    const obj = new Path2D();

    if (circle.color) {
      $.value.shadowColor = circle.color;
      $.value.shadowBlur = 50;  
    } else {
      $.value.shadowBlur = 0;
    }

    const r = f_distance(z, circle.r)


    obj.arc(x, y, r, 0, 2 * Math.PI);
    $.value.fill(obj);

    $.value.save();        // 현재 상태 저장
    $.value.clip(obj);  // 원 경로에 대해 clip() 적용
    $.value.shadowColor = 'none';
    $.value.shadowBlur = 0;

    drawCircleImage(images.value[circle.index], x, y, r, count * 2)

    $.value.fillStyle = 'transparent';
    const shadowGradient = $.value.createRadialGradient(x - (r/3), y - (r/2), r/5, x, y, r);
    shadowGradient.addColorStop(0, 'rgba(0, 0, 0, 0.1)');
    shadowGradient.addColorStop(1, 'rgba(0, 0, 0, 0.8)');
    $.value.fillStyle = shadowGradient;

    $.value.fillRect(x - r, y - r, r * 2, r * 2); // 그림자 부분 채우기


    $.value.restore(); 

    _canvasObjs[circle.index] = obj
    
  })

  if (focusTarget) {
    const {x, y, z} = rotate3d(circles[focusTarget].x, circles[focusTarget].y, circles[focusTarget].z, 0, 0, 0, { x: count /4 , y: 0, z: 0 }, 'px');
    targetZoom({ x, y, z: z+ 100 })
  } else if (!props.active) {
    targetZoom({ x:0, y:0, z:-2000}, 1.005)
  } else {
    targetZoom({ x:0, y:0, z:1000}, 1.01)
  }

  count++

  requestAnimationFrame(() => draw());
};

const targetZoom = ({ x, y, z }, speed = 1.1) => {
  view.x = x - ((x- view.x )/ speed)
  view.y = y - ((y- view.y )/ speed)
  view.z = z - ((z- view.z )/ speed)
} 


const zoom = () => {
  if (!props.active) return
  view.z = 1100 -(( 1100 - view.z )/ 1.01)

  if (view.z < 1000) {
    requestAnimationFrame(() => zoom())
  }
}

const zoomOut = () => {
  if (props.active) return
  view.z = -2100 - (((-2100) - view.z )/ 1.01)
  view.x = Math.abs(view.x) < 0.1 ? 0 : 0 - (((0) - view.x )/ 1.2)
  view.y = Math.abs(view.y) < 0.1 ? 0 : 0 - (((0) - view.y )/ 1.2)

  console.log(view.x)

  if (view.z > -2000) {
    requestAnimationFrame(() => zoomOut())
  }
}

const f_onClickObj = (e) => {
  let target

  Object.keys(_canvasObjs).forEach((key) => {
    const isTarget = $.value.isPointInPath(_canvasObjs[key], e.offsetX, e.offsetY)
    if (isTarget) { 
      focusTarget = key
      target = true
    }
  })

  if (!target) {
    focusTarget = null
    view.reg = -90  
  }
}

watch(props, () => {
  if (props.active) {
    zoom()
  } else {
    zoomOut()
  }
  _onDraw.value = props.active

  console.log(props.active)
})

onMounted(() => {  
  $.value = r_canvas.value.getContext("2d")
  r_canvas.value.width = window.innerWidth;
  r_canvas.value.height = window.innerHeight;

  preloadImages()

  setTimeout(() => {
    draw();
  }, 1000)

  r_canvas.value.addEventListener('click', f_onClickObj)
})
onBeforeUnmount(() => {
  r_canvas.value.removeEventListener('click', f_onClickObj)
})  

</script>

<style lang="scss">
.space_wrap {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-size: cover;
  transition: all 2s ease;
  transition-delay: 500ms;

  .space_img {
    position: absolute;
    width: 100%;
    height: 100%;
    background-size: cover;
    filter: brightness(0.7);
  }

  .canvas {
    position: absolute;
    width: 100%;
    height: 100%;
  }

  &.disable {
    opacity: 0;
  }
}
</style>