<template>
  <div class="card_wrap" :class="{ disable: !p_props.active, onCard: _onCard }">
    <div class="rotate_card" @click="_onProject = !_onProject">
      <div class="card front" :class="{ onCard: _onProject }">
        <div class="card_inner">
          Projects
          <div class="border _1"></div>
          <div class="border _2"></div>
          <div class="border _3"></div>
        </div>
      </div>
      <div class="card back" :class="{ onCard: _onProject }">
        <div class="card_inner">
          <div class="border _1"></div>
          <div class="border _2"></div>
          <div class="border _3"></div>
        </div>
      </div>
    </div>

    <div class="project_wrap" ref="r_wrap" :class="{ onCard: _onCard }">
      <div
        v-for="(e, i) of projectArr"
        class="project_card_wrap"
        :style="{
          top: _onCard
            ? `${Math.floor(i / 4) * Math.floor(c_size.height / 2)}px`
            : `25%`,
          left: _onCard
            ? `${(i % 4) * Math.floor(c_size.width / 4)}px`
            : `${(100 / 8) * 3}%`,
          width: Math.floor(c_size.width / 4) + 'px',
          height: Math.floor(c_size.height / 2) + 'px',
          opacity: _onCard ? 1 : 0,
          transitionDelay: `${100 * i}ms`,
        }"
      >
        <div
          ref="r_cards"
          class="project_card"
          :style="{
            backgroundImage: `url(/images/${e.img})`,
          }"
        >
          <div class="light"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const p_props = defineProps(["active"]);

const projectArr = ref([
  { name: "MovieMange", img: "001.png" },
  { name: "GolfAndChat", img: "002.png" },
  { name: "chareter", img: "003.png" },
]);

watch(p_props, () => {
  _onProject.value = false;
});

const r_wrap = ref();

const c_size = computed(() => {
  return {
    width: r_wrap.value?.clientWidth || 0,
    height: r_wrap.value?.clientHeight || 0,
  };
});

const c_cardPosition = computed(() => {});

const _onProject = ref(false);
const _onCard = ref(false);

watch(_onProject, () => {
  console.log(_onCard.value);

  if (_onProject.value) {
    setTimeout(() => {
      _onCard.value = true;
    }, 1500);
  } else {
    _onCard.value = false;
  }
});

function mouseMove(e) {
  const { target } = e;
  let { x, y, width, height } = target.getBoundingClientRect();

  const left = e.clientX - x;
  const top = e.clientY - y;
  const centerX = left - width / 2;
  const centerY = top - height / 2;
  const d = Math.sqrt(centerX ** 2 + centerY ** 2);

  target.style.boxShadow = `
    ${-centerX / 5}px ${-centerY / 5}px 10px rgba(0, 0, 0, 0.2)
  `;

  target.style.transform = `
    rotate3d(
      ${-centerY / 100}, ${centerX / 100}, 0, ${d / 10}deg
    )
    translateZ(50px)
  `;

  target.style.transition = "none";

  const light = target.querySelector(".light");

  if (light) {
    light.style.backgroundImage = `
    radial-gradient(
      circle at ${left}px ${top}px, #00000010, #ffffff00, #ffffff50
    )
  `;
  }
}

const r_cards = ref([]);

onMounted(() => {
  console.log(r_cards.value);

  r_cards.value.forEach((card) => {
    card.addEventListener("mouseenter", () => {
      card.addEventListener("mousemove", mouseMove);
    });

    card.addEventListener("mouseleave", () => {
      card.removeEventListener("mousemove", mouseMove);
      card.style.boxShadow = "10px 10px 10px rgba(0, 0, 0, 0.2)";
      card.style.transform = "rotate3d(0,0,0,0deg)";
      card.style.transition = "all 200ms ease";
      const light = card.querySelector(".light");
      if (light) {
        light.style.backgroundImage = `
          radial-gradient(
            circle at ${0}px ${0}px, #00000010, #ffffff00, #ffffff50
          )
        `;
      }

      // light.style.backgroundImage = "";
    });
  });
});
</script>

<style lang="scss">
.card_wrap {
  width: 100vw;
  height: 100vh;
  top: 0;
  left: 0;
  position: absolute;
  transition: background-color 500ms ease;

  &.onCard {
    background-color: rgb(242, 242, 242);
  }

  .rotate_card {
    opacity: 1;
    transition: all 2s ease;

    .card {
      position: absolute;
      color: wheat;
      left: calc(50% - 75px);
      top: calc(50% - 120px);
      width: 150px;
      height: 240px;
      backface-visibility: hidden;
      transition: all 2s ease;
      z-index: 1;

      .card_inner {
        width: 150px;
        height: 240px;
        background-color: rgb(242, 242, 242);
        backface-visibility: hidden;

        cursor: pointer;
        display: flex;
        justify-content: center;
        align-items: center;
        border-radius: 5px;
        transition: all 2s ease;
      }

      .border {
        display: block;
        position: absolute;
        border: 1px solid white;
        border-radius: 10px;
        box-sizing: border-box;

        &._1 {
          width: calc(100% + 20px);
          height: calc(100% + 20px);
          top: -10px;
          left: -10px;
          animation: borderFade1 infinite 3s;
        }
        &._2 {
          width: calc(100% + 40px);
          height: calc(100% + 40px);
          top: -20px;
          left: -20px;
          animation: borderFade2 infinite 3s;
        }
        &._3 {
          width: calc(100% + 60px);
          height: calc(100% + 60px);
          top: -30px;
          left: -30px;
          animation: borderFade3 infinite 3s;
        }
      }

      &.front {
        animation: roate infinite 10s linear;
        .card_inner {
          transform: rotate(30deg);
        }
      }

      &.back {
        animation: roate_back infinite 10s linear;
        .card_inner {
          transform: rotate(-30deg);
        }
      }

      &.onCard {
        perspective: 500px;
        .card_inner {
          transform: translateZ(500px);
        }
      }
    }
  }

  .project_wrap {
    opacity: 0;
    position: absolute;
    top: 10%;
    left: 0%;
    width: 100%;
    height: 80%;
    transition: opacity 500ms ease;

    &.onCard {
      opacity: 1;
    }

    .project_card_wrap {
      position: absolute;
      display: flex;
      justify-content: center;
      align-items: center;
      transition: all 2s ease;
      perspective: 500px;

      .project_card {
        width: 160px;
        height: 250px;
        border-radius: 5px;
        box-shadow: 5px 5px 5px rgba(0, 0, 0, 0.2);
        position: relative;
        background-size: cover;

        .light {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          pointer-events: none;
          background-image: radial-gradient(
            circle at 0px 0px,
            #00000010,
            #ffffff00,
            #ffffff50
          );
        }
      }
    }
  }

  &.disable {
    pointer-events: none;
    .card {
      opacity: 0;
      top: -100%;
    }

    .project_wrap {
      opacity: 0;
      pointer-events: none;
    }
  }
}

@keyframes roate {
  from {
    transform: rotateY(0deg);
  }
  to {
    transform: rotateY(360deg);
  }
}

@keyframes roate_back {
  from {
    transform: rotateY(180deg);
  }
  50% {
    transform: rotateY(360deg);
  }
  to {
    transform: rotateY(180deg);
  }
}

@keyframes borderFade1 {
  0% {
    opacity: 0;
  }
  10% {
    opacity: 1;
  }
  30% {
    opacity: 0;
  }
  100% {
    opacity: 0;
  }
}
@keyframes borderFade2 {
  from {
    opacity: 0;
  }
  5% {
    opacity: 0;
  }
  15% {
    opacity: 1;
  }
  35% {
    opacity: 0;
  }
  100% {
    opacity: 0;
  }
}
@keyframes borderFade3 {
  from {
    opacity: 0;
  }
  10% {
    opacity: 0;
  }
  20% {
    opacity: 1;
  }
  50% {
    opacity: 0;
  }
  100% {
    opacity: 0;
  }
}
</style>
