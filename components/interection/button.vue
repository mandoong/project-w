<template>
  <div class="button_wrap">
    <div class="circle" @click="f_active"  :class="{active: active}">
      <Icon src="/icons/heart.svg" w="70" h="70" color="lightgray" class="heart" :class="{active: active}" />
      <div class="drop_dot" :class="{active: active}"></div>
    </div>
    <div class="side t1" :class="{active: active}">
      <Icon src="/icons/heart.svg" w="30" h="30" color="white" class="item" :class="{active: active}" />
      <div class="line" :class="{active: active}" />
    </div>
    <div class="side t2" :class="{active: active}">
      <Icon src="/icons/heart.svg" w="30" h="30" color="white" class="item" :class="{active: active}" />
      <div class="line" :class="{active: active}" />
    </div>
    <div class="side t3" :class="{active: active}">
      <Icon src="/icons/heart.svg" w="30" h="30" color="white" class="item" :class="{active: active}" />
      <div class="line" :class="{active: active}" />
    </div>
    <div class="side t4" :class="{active: active}">
      <Icon src="/icons/heart.svg" w="30" h="30" color="white" class="item" :class="{active: active}" />
      <div class="line" :class="{active: active}" />
    </div>
    <div class="side t5" :class="{active: active}">
      <Icon src="/icons/heart.svg" w="30" h="30" color="white" class="item" :class="{active: active}" />
      <div class="line" :class="{active: active}" />
    </div>
    <div class="side t6" :class="{active: active}">
      <Icon src="/icons/heart.svg" w="30" h="30" color="white" class="item" :class="{active: active}" />
      <div class="line" :class="{active: active}" />
    </div>
  </div>
</template>

<script setup>

const active = ref(false)

const f_active = () => {
  active.value = false
  setTimeout(() => {
    active.value = true
  }, 10)
}
 
</script>

<style lang="scss" scoped>
.button_wrap {
  width: 100%;
  height: 100%;
  background: rgb(2,0,36);
  background: linear-gradient(90deg, rgba(2,0,36,1) 0%, rgba(96,26,101,1) 0%, rgba(188,128,207,1) 100%);
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;


  .circle {
    width: 120px;
    height: 120px;
    background-color: white;
    border-radius: 30px;
    box-shadow: -5px -5px 20px 2px rgba(0, 0, 0, 0.5) inset;
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    border-radius: 999px;

    &.active {
      animation: boom 800ms;
    }

    .drop_dot {
      position: absolute;
      opacity: 0;
      top: -20px;
      width: 10px;
      height: 10px;
      border-radius: 999px;
      background-color: rgb(255, 160, 122);

      &.active {
        animation: drop 300ms ease;
      }
    
    }

    .heart {
      width: 70px;
      height: 70px;
      border-radius: 999px;
      box-shadow: -5px -5px 20px 2px rgba(0, 0, 0, 0.3) inset;
      &.active {
        animation: spin 1s;
        animation-fill-mode: forwards;
        animation-delay: 100ms;
      }
    }
  }
  
  .side {
    position: absolute;
    top: 50%;
    left: 50%;
    width: 100px;
    height: 350px;
    pointer-events: none;
    display: flex;
    align-items: center;
    flex-direction: column;
    gap: 50px;
    
    &.active {
      animation: circle 800ms;
      animation-delay: 300ms;
    }

    .line {
      height: 0px;
      width: 5px;
      background-color: orange;
      border-radius: 999px;
      &.active {
        animation: line 1.2s ;
        animation-delay: -100ms;

      }
    }
    
    .item {
      box-shadow: -5px -5px 20px 2px rgba(0, 0, 0, 0.2) inset;
      opacity: 0.5;
    }
    &.t1 {
      transform: translate(-50%, -50%) rotate(30deg);
    }
    &.t2 {
      transform: translate(-50%, -50%) rotate(90deg);
    }
    &.t3 {
      transform: translate(-50%, -50%) rotate(150deg);
    }
    &.t4 {
      transform: translate(-50%, -50%) rotate(210deg);
    }
    &.t5 {
      transform: translate(-50%, -50%) rotate(270deg);
    }
    &.t6 {
      transform: translate(-50%, -50%) rotate(-30deg);
    }
  }
}

.icon {
  width: 20px;
  height: 20px;
  color: white;
}


@keyframes spin {
  45% {
    transform: rotate3d(0, 1, 0, 90deg);
  }
  50% {
    transform: rotate3d(0, 1, 0, 180deg);
    background-color: lightgray;
  }
  55% {
    transform: rotate3d(0, 1, 0, 90deg);
    background-color: orange;
  }
  100% {
    background-color: orange;
  }
}

@keyframes drop {

  50% {
    opacity: 1;
    height: 40px;
  }

  70% {
    height: 15px;
  }
  100% {
    opacity: 0;
    top: 50%;
  }
}

@keyframes boom {
  50% {
    scale: 1;
  }
  70% {
    scale: 0.8;
  }

  80% {
    scale: 1.2;
  }

  95% {
    scale: 0.9;
  }
}

@keyframes circle {
  40% {
    height: 350px;
  }
  60% {
    height: 420px;
  }

  80% {
    height: 330px;
  }

  95% {
    height: 360px;
  }
}

@keyframes line {
  from, 60% {
    height: 0;
    transform: translateY(150%);
  }
  61% {
    height: 15px;
  }

  100% {
    height: 0px;
  }
}
</style>