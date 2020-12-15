<template>

  <div class="home">

    <el-container>
      <router-view name="aside"></router-view>
      <el-container>
        <el-header>
          header
        </el-header>
        <router-view name="main"></router-view>
        <el-footer>
          footer
        </el-footer>
      </el-container>
    </el-container>
  </div>
</template>

<script>
  import {get_user} from "../../api/api";
  import AppFooter from "../../components/Footer"
  import AppHeader from "../../components/Header";

  export default {
    name: "Home",
    components: {
      AppFooter,
      AppHeader,
    },
    mounted() {
      get_user().then(res => console.log(res)).catch(err => console.log(err))
    },
    data() {
      return {}
    }
  }
</script>

<style scoped>

  .home {
    height: 100%;
    width: 100%;
  }

  .el-header, .el-footer {
    background-color: #B3C0D1;
    color: #333;
    text-align: center;
    line-height: 60px;
  }

  .el-aside {
    background-color: #D3DCE6;
    color: #333;
    text-align: center;
  }


  body > .el-container {
    margin-bottom: 40px;
  }


</style>
