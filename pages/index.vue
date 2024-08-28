<template>
  <div class="main_wrap" :class="`back_${_currentView}`">
    <div class="header">
      <div class="logo">LOGO</div>
      <div class="top_menu_wrap">
        <div class="menu">About</div>
        <div class="menu">Project</div>
        <div class="menu">Skill</div>
      </div>
    </div>
    <div class="number">{{ _currentView }}</div>
    <PagesMain :active="_currentView === 0" />
    <PagesMainSkill :active="_currentView === 1" />
    <PagesMainCard :active="_currentView === 2" />
  </div>
</template>

<script setup>
const _currentView = ref(0);

let wheelTimer;
let wheelDelay = false;

const f_wheel = (evt) => {
  if (!wheelDelay) {
    wheelDelay = true;
    console.log("wheel");

    if (evt.deltaY > 0) {
      _currentView.value += 1;
    } else {
      if (_currentView.value > 0) _currentView.value -= 1;
    }

    wheelTimer = setTimeout(() => {
      wheelDelay = false;
      clearTimeout(wheelTimer);
    }, 1000);
  }
};

onMounted(() => {
  window.addEventListener("wheel", f_wheel);
});

onBeforeUnmount(() => {
  window.removeEventListener("wheel", f_wheel);
});
</script>

<style lang="scss">
.main_wrap {
  height: 100vh;
  width: 100vw;
  position: relative;
  overflow: hidden;
  box-sizing: border-box;
  background-color: white;
  transition: background-color 1s ease;

  &.back_0 {
    background-color: #18122b;
  }
  &.back_1 {
    background-color: #11120f;
  }
  &.back_2 {
    background-color: #11120f;
  }

  .header {
    position: fixed;
    width: 100%;
    height: 60px;
    padding: 0 60px 0 20px;
    box-sizing: border-box;
    display: flex;
    align-items: center;
    color: white;
    justify-content: space-between;
    mix-blend-mode: difference;
    z-index: 999;

    .logo {
    }
    .top_menu_wrap {
      display: flex;
      gap: 50px;

      .menu {
        &:hover {
        }
      }
    }
  }

  .number {
    position: absolute;
    top: 10px;
    right: 10px;
    z-index: 2;
    color: white;
    mix-blend-mode: lighten;
  }
}
</style>
