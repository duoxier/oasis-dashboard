<template>
  <el-main>
    <div class="welcome">
      <el-image class="bgsrc"
                src='http://img.iot.sina.cn/oasis/TZkXBpHTsA6SOaF21koVGWnO9ChG4xeD00gtysY2.png'></el-image>
    </div>
  </el-main>

</template>

<script>
  export default {
    name: "welcome"
  }
</script>

<style scoped>
  .el-main {
    color: #333;
    line-height: 160px;
  }

  .bgsrc {
    height: 360px;
    width: 100%;
    max-width: 430px;
    padding-left: 20%;
    background-repeat: no-repeat;
    background-position: 50% 50%;
    background-size: 100% 100%;
  }

  .welcome {
    background-color: rgb(254, 254, 254);

    padding: 100px 0px;
  }

</style>
