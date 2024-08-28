<template>
  <div class="toggle_wrap" :class="{ active: _toggle }">
    <div
      class="item btn_circle"
      :class="{ active: _toggle }"
      @click="_toggle = !_toggle"
    >
      <div class="item circle" :class="{ active: _toggle }"></div>
      <div class="item crater type_1" :class="{ active: _toggle }"></div>
      <div class="item crater type_2" :class="{ active: _toggle }"></div>
      <div class="item crater type_3" :class="{ active: _toggle }"></div>
    </div>
    <div class="item bg type_1" :class="{ active: _toggle }"></div>
    <div class="item bg type_2" :class="{ active: _toggle }"></div>
    <div class="item bg type_3" :class="{ active: _toggle }"></div>
    <div class="item cloud type_4 sub" :class="{ active: _toggle }"></div>
    <div class="item cloud type_5 sub" :class="{ active: _toggle }"></div>
    <div class="item cloud type_6 sub" :class="{ active: _toggle }"></div>
    <div class="item cloud type_9 sub" :class="{ active: _toggle }"></div>
    <div class="item cloud type_10 sub" :class="{ active: _toggle }"></div>
    <div class="item cloud type_1" :class="{ active: _toggle }"></div>
    <div class="item cloud type_2" :class="{ active: _toggle }"></div>
    <div class="item cloud type_3" :class="{ active: _toggle }"></div>
    <div class="item cloud type_7" :class="{ active: _toggle }"></div>
    <div class="item cloud type_8" :class="{ active: _toggle }"></div>

    <div class="item star type_1" :class="{ active: _toggle }">
      <div class="item rect_2 type_1"></div>
      <div class="item rect_2 type_2"></div>
      <div class="item rect_2 type_3"></div>
    </div>
    <div class="item star type_2" :class="{ active: _toggle }">
      <div class="item rect_2 type_1"></div>
      <div class="item rect_2 type_2"></div>
      <div class="item rect_2 type_3"></div>
    </div>
    <div class="item star type_3" :class="{ active: _toggle }">
      <div class="item rect type_1"></div>
      <div class="item rect type_2"></div>
      <div class="item rect type_3"></div>
    </div>
    <div class="item star type_4" :class="{ active: _toggle }">
      <div class="item rect type_1"></div>
      <div class="item rect type_2"></div>
      <div class="item rect type_3"></div>
    </div>
    <div class="item star type_5" :class="{ active: _toggle }">
      <div class="item rect type_1"></div>
      <div class="item rect type_2"></div>
      <div class="item rect type_3"></div>
    </div>
    <div class="item star type_6" :class="{ active: _toggle }">
      <div class="item rect type_1"></div>
      <div class="item rect type_2"></div>
      <div class="item rect type_3"></div>
    </div>
    <div class="item star type_7" :class="{ active: _toggle }">
      <div class="item rect_2 type_1"></div>
      <div class="item rect_2 type_2"></div>
      <div class="item rect_2 type_3"></div>
    </div>
    <div class="item star type_8" :class="{ active: _toggle }">
      <div class="item rect_2 type_1"></div>
      <div class="item rect_2 type_2"></div>
      <div class="item rect_2 type_3"></div>
    </div>
    <div class="item star type_9" :class="{ active: _toggle }">
      <div class="item rect_3 type_1"></div>
      <div class="item rect_3 type_2"></div>
      <div class="item rect_3 type_3"></div>
    </div>
    <div class="item star type_10" :class="{ active: _toggle }">
      <div class="item rect_3 type_1"></div>
      <div class="item rect_3 type_2"></div>
      <div class="item rect_3 type_3"></div>
    </div>
    <div class="item star type_11" :class="{ active: _toggle }">
      <div class="item rect_3 type_1"></div>
      <div class="item rect_3 type_2"></div>
      <div class="item rect_3 type_3"></div>
    </div>
  </div>
</template>

<script setup>
const _toggle = ref(false);
</script>

<style lang="scss" scoped>
.toggle_wrap {
  width: 280px;
  height: 120px;
  background: white;
  overflow: hidden;
  position: relative;
  border-radius: 999px;
  border: 10px solid rgba(230, 230, 230);
  background-color: skyblue;
  transition: all 1000ms;
  transform: scale(0.3, 0.3);

  &.active {
    background-color: rgba(31, 34, 49);
  }

  .item {
    position: absolute;
    transition: all 800ms;
  }

  .btn_circle {
    height: 100px;
    aspect-ratio: 1/1;
    box-shadow: 0 0 5px 2px rgba(0, 0, 0, 0.2) inset;
    top: 50%;
    transform: translateY(-50%);
    left: 10px;
    right: auto;
    border-radius: 999px;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: white;
    z-index: 10;
    cursor: pointer;

    &.active {
      left: 170px;
    }

    .circle {
      width: 80%;
      aspect-ratio: 1/1;
      background-color: rgba(236, 205, 81);
      box-shadow: -2px -4px 1px 1px rgba(0, 0, 0, 0.1) inset,
        4px 4px 1px 1px rgba(255, 255, 255, 0.3) inset;
      border-radius: 999px;

      &.active {
        background-color: rgba(201, 206, 213);
      }
    }

    .crater {
      position: absolute;
      background-color: rgba(158, 164, 182);
      box-shadow: -1px -2px 1px 1px rgba(0, 0, 0, 0.1) inset,
        1px 2px 1px 1px rgba(255, 255, 255, 0.3) inset;
      aspect-ratio: 1/1.2;
      border-radius: 50%;
      opacity: 0;

      &.type_1 {
        width: 10px;
        top: 40px;
        left: 60px;
      }

      &.type_2 {
        width: 15px;
        top: 60px;
        left: 40px;
      }

      &.type_3 {
        width: 20px;
        top: 30px;
        left: 30px;
      }

      &.active {
        opacity: 1;
      }
    }
  }

  .bg {
    top: 50%;
    aspect-ratio: 1/1;
    left: 80px;
    transform: translateY(-50%) translateX(-50%) scale(1);
    border-radius: 999px;
    z-index: 1;
    opacity: 1;

    &.active {
      left: 220px;
    }

    &.type_1 {
      width: 150px;
      background-color: rgba(255, 255, 255, 0.1);
    }

    &.type_2 {
      width: 210px;
      background-color: rgba(255, 255, 255, 0.1);
    }

    &.type_3 {
      width: 270px;
      background-color: rgba(255, 255, 255, 0.1);
    }
  }

  .cloud {
    border-radius: 999px;
    background-color: rgba(255, 255, 255, 1);
    transform: translateY(50%) translateX(0);
    aspect-ratio: 1/1;

    &.sub {
      background-color: rgba(203, 230, 244, 1);
    }

    &.active {
      transform: translateY(150%) translateX(50%);
    }

    &.type_1 {
      bottom: -20px;
      width: 80px;
      right: 80px;
      transition-delay: 200ms;
    }

    &.type_2 {
      bottom: -5px;
      width: 100px;
      right: 20px;
      transition-delay: 150ms;
    }

    &.type_3 {
      bottom: 20px;
      width: 100px;
      right: -50px;
      transition-delay: 100ms;
    }

    &.type_4 {
      bottom: -20px;
      width: 130px;
      right: 70px;
      transition-delay: 100ms;
    }

    &.type_5 {
      bottom: -5px;
      width: 130px;
      right: 20px;
      transition-delay: 100ms;
    }

    &.type_6 {
      bottom: 20px;
      width: 130px;
      right: -50px;
      transition-delay: 100ms;
    }

    &.type_7 {
      bottom: -30px;
      width: 100px;
      right: 120px;
      transition-delay: 100ms;
    }

    &.type_8 {
      bottom: 20px;
      width: 130px;
      right: -50px;
      transition-delay: 100ms;
    }

    &.type_9 {
      bottom: -20px;
      width: 130px;
      right: 120px;
      transition-delay: 100ms;
    }

    &.type_10 {
      bottom: 30px;
      width: 140px;
      right: -50px;
      transition-delay: 100ms;
    }
  }

  .star {
    width: 20px;
    height: 30px;
    animation: lighting 3000ms infinite;
    transform: translateY(-500%);

    &.active {
      transform: translateY(0%);
    }

    &.type_1 {
      left: 60px;
      top: 70px;
      animation-delay: 200ms;
      transition-delay: 50ms;
    }

    &.type_2 {
      left: 20px;
      top: 40px;
      animation-delay: 700ms;
      transition-delay: 20ms;
    }

    &.type_3 {
      left: 80px;
      top: 20px;
      animation-delay: 400ms;
      transition-delay: 110ms;
    }

    &.type_4 {
      left: 120px;
      top: 60px;
      animation-delay: 800ms;
      transition-delay: 90ms;
    }

    &.type_5 {
      left: 20px;
      top: 10px;
      animation-delay: 800ms;
      transition-delay: 45ms;
    }

    &.type_6 {
      left: 40px;
      top: 90px;
      animation-delay: 200ms;
      transition-delay: 40ms;
    }

    &.type_7 {
      left: 100px;
      top: 100px;
      animation-delay: 500ms;
      transition-delay: 80ms;
    }

    &.type_8 {
      left: 140px;
      top: 10px;
      animation-delay: 100ms;
      transition-delay: 55ms;
    }

    &.type_9 {
      left: 50px;
      top: 25px;
      animation-delay: 800ms;
      transition-delay: 50ms;
    }

    &.type_10 {
      left: 75px;
      top: 85px;
      animation-delay: 600ms;
      transition-delay: 60ms;
    }

    &.type_11 {
      left: 135px;
      top: 25px;
      animation-delay: 400ms;
      transition-delay: 80ms;
    }

    .rect {
      width: 0;
      height: 0;
      border-top: 5px solid white;
      border-left: 7px solid transparent;
      border-right: 7px solid transparent;

      &.type_1 {
        transform: rotate(70deg);
      }

      &.type_2 {
        transform: rotate(-70deg);
      }

      &.type_3 {
        transform: rotate(0deg);
      }
    }

    .rect_2 {
      width: 0;
      height: 0;
      border-top: 2px solid white;
      border-left: 4px solid transparent;
      border-right: 4px solid transparent;

      &.type_1 {
        transform: rotate(70deg);
      }

      &.type_2 {
        transform: rotate(-70deg);
      }

      &.type_3 {
        transform: rotate(0deg);
      }
    }

    .rect_3 {
      width: 0;
      height: 0;
      border-top: 1px solid white;
      border-left: 2px solid transparent;
      border-right: 2px solid transparent;

      &.type_1 {
        transform: rotate(70deg);
      }

      &.type_2 {
        transform: rotate(-70deg);
      }

      &.type_3 {
        transform: rotate(0deg);
      }
    }
  }
}

@keyframes lighting {
  40% {
    opacity: 1;
  }
  50% {
    opacity: 0.5;
  }

  60% {
    opacity: 1;
  }
}
</style>
