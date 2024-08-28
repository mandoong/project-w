<template>
  <div class="box">
    <div class="circle"></div>
  </div>
</template>

<style lang="scss" scoped>
.box {
  width: 100%;
  height: 100%;
  background: rgb(194 206 219);
  background: linear-gradient(205deg, rgb(238 233 245) 0%, rgb(30 34 42) 100%);
  display: flex;
  justify-content: center;
  align-items: center;

  .circle {
    width: 200px;
    height: 200px;
    background: rgb(194 206 219);
    background: linear-gradient(205deg, rgb(30 50 60) 0%, rgb(20 24 32) 100%);
    border-radius: 999px;
    box-shadow: -5px 5px 5px 2px rgb(30 50 60) inset, -50px 50px 20px -5px rgb(20 24 32), -15px 15px 20px 0px rgb(20 24 32), -5px 5px 20px 5px rgb(20 24 32);
    
    
  }
}

</style>