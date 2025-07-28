<template>
  <div class="main_skill_wrap" :class="{ disable: !active }">
    <div
      v-if="_isActive"
      ref="r_list"
      v-for="(e, i) in items"
      :id="i"
      class="skill"
      :class="{active: activeTarget == i}"
      :style="{
        zIndex: i
      }"
    >
      <img class="img" width="800" height="180" :src="`/images/${items?.[i]?.img}`">
    </div>
  </div>
</template>

<script setup>
const p_active = defineProps(["active"]);
const _isActive = ref(false);
const _onEvent = ref(false);

const items = [
  {name: 'vue', img: 'vue_icon.svg'},
  {name: 'nuxt', img: 'nuxt_icon.svg'},
  {name: 'react', img: 'react_icon.png'},
  {name: 'next', img: 'next_icon.svg'},
  {name: 'd3', img: 'd3_icon.svg'},
  {name: 'mongo', img: 'mongo_icon.svg'},
]

watch(p_active, () => {
  if (p_active.active) {
    _isActive.value = true;
    
    nextTick(() => {
      setTimeout(() => {
        r_list.value.forEach((e) => {
          e.addEventListener("mousemove", f_onMouse);
        })
      }, 2000)

    })
  } else {
    activeTarget.value = null
    r_list.value.forEach((e) => {
      e.removeEventListener("mousemove", f_onMouse);
    })
    if (_isActive.value) {
      setTimeout(() => {
        _isActive.value = false;
      }, 2000);
    }
  }
});

const r_list = ref([]);
let timer;
let currentTarget
let count = 0
const activeTarget = ref()

const f_onMouse = (evt) => {
  if (!_isActive.value) return;

  if (evt.target.id !== currentTarget){
    clearInterval(timer)
    count = 0
    currentTarget = evt.target.id
    timer = setInterval(() => {
      if (count >= 2) {
        count = 0
        activeTarget.value = currentTarget
        clearInterval(timer)
      } else count += 1
    }, 100)
  }
};

onMounted(() => {


  console.log(r_list.value);
});
</script>
<style lang="scss" scoped>
.main_skill_wrap {
  position: absolute;
  width: 100vw;
  height: 100vh;
  top: -100px;
  left: 0;
  display: flex;
  transition: all 1s ease;

  .skill {
    flex: 1 1 100%;
    height: 140%;
    transform: rotate(20deg) translateY(-5%);
    overflow: hidden;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 300ms ease-in-out;
    border-left: 1px solid gray;
    opacity: 0;
    background-color: #11120f;

    .img {
      transform: rotate(-90deg);
      transition: all 1s ease;
    }

    .skill_inner {
      background-color: antiquewhite;
      transform: rotate(-20deg);
    }

    &.active {
      flex: 1 1 300%;
      height: 140%;

      .img {
        transform: rotate(-20deg);
      }
    }

    &:nth-child(even) {
      animation: fadeDown 2s ease both;
      animation-delay: 300ms;
    }

    &:nth-child(odd) {
      animation: fadeUp 2s ease both;
      animation-delay: 300ms;
    }
  }

  &.disable {
    opacity: 0;
  }
}

@keyframes fadeUp {
  from {
    transform: rotate(20deg) translate(-100%, -100%);
  }
  to {
    transform: rotate(20deg) translateY(-5%);
    opacity: 1;
  }
}

@keyframes fadeDown {
  from {
    transform: rotate(20deg) translate(-100%, 100%);
  }
  to {
    transform: rotate(20deg) translateY(-5%);
    opacity: 1;
  }
}
</style>
