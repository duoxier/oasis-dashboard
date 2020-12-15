<template>
  <div class="choose-login">
    <div class="top">
      <div class="header">
        <el-link href="www.baidu.com" :underline="false">
          <img src="../../assets/logo.png" class="img-logo">
          <span class="title">绿洲Oasis</span>
        </el-link>
      </div>
      <p class="desc">来绿洲发现美好世界～</p>
      <el-row>
        <el-button style="width: 350px" size="large" type="primary" @click="sina_login()">请使用新浪口袋扫描登录</el-button>
      </el-row>
      <el-button type="text" @click="dialogFormVisible = true" class="other-login">外包员工及实习生登录</el-button>
      <el-dialog title="登录"
                 center
                 width="400px"
                 :visible.sync="dialogFormVisible">
        <el-form
          class="dialog_form"
          ref="dataForm"
          :rules="rules"
          :model="login_form">
          <el-form-item label="手机号:"
                        :label-width="formLabelWidth" prop="phone">
            <el-input style="width: 200px" v-model="login_form.phone" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="密码:" :label-width="formLabelWidth" prop="password">
            <el-input style="width: 200px" type="password" v-model="login_form.password" autocomplete="off"></el-input>
          </el-form-item>
        </el-form>
        <el-row style="padding-left: 125px">
          <!--          <el-button type="primary" size="small" style="width: 150px" @click="dialogFormVisible = false">登 陆</el-button>-->
          <el-button type="primary" size="small" style="width: 150px" @click="login()">登 陆</el-button>
        </el-row>
        <el-row style="padding-left: 22%; margin-top: 15px">
          <a class="text-tips">忘记密码？联系fangjie3@staff.weibo.com</a>
        </el-row>
      </el-dialog>

      <div>
      </div>
    </div>
  </div>
</template>

<script>
  import {user_login} from "../../api/api";

  export default {
    watch:{
      // data:'dialogFormVisible'
      init(){
        if (this.dialogFormVisible){
          this.rules={}
          this.login_form={}
        }
      }

    },
    name: "Login",
    data() {
      return {
        title: "绿洲Oasis",
        background_image: "https://gw.alipayobjects.com/zos/rmsportal/TVYTbAXWheQpRcWDaDMu.svg",
        dialogFormVisible: false,
        formLabelWidth: '120px',
        login_form: {
          phone: "",
          password: "",
        },
        rules: {
          phone: [
            {required: true, message: '请输入手机号', trigger: 'blur'},
          ],
          password: [
            {required: true, message: '请输入密码', trigger: 'blur'},
          ]
        },

      }
    },
    methods:{
      login(){
        this.$refs['dataForm'].validate((valid) => {
          if (valid) {
            let loginData = this.login_form;
            user_login(loginData).then(res => {
              let _data = res.data
              if (_data.status === 'SUCCEED') {
                const token = _data.data['token'];
                //存储token
                this.$cookies.set('token', token, "100s"); //vue-cookie
                //登录成功，页面跳转
                this.$message.success("登录成功")
                // this.$router.push({path: ''})
                setTimeout(() => {
                  this.$router.push("/home")
                }, 1500)
              } else if (_data.status === 'FAILED') {
                this.$message.error(_data.errorMessage)
              }
            })

          }
        })
      },

      sina_login(){
        this.$message.error("抱歉，暂未开放")
      },
    }
  }
</script>

<style scoped>
  .choose-login {
    background: #f0f2f5;
    background-image: url('https://gw.alipayobjects.com/zos/rmsportal/TVYTbAXWheQpRcWDaDMu.svg');
    width: 100%;
    min-height: 100%;
    background-repeat: no-repeat;
    background-position: center;
    background-size: 100%;
    padding: 110px 0 144px 0;
    position: relative;
  }

  .top {
    text-align: center;
  }

  .header {
    height: 44px;
    line-height: 44px;
  }

  a {
    text-decoration: none;
  }

  .img-logo {
    height: 44px;
    vertical-align: top;
    margin-right: 16px;
  }

  .title {
    font-size: 33px;
    color: rgba(0, 0, 0, 0.85);
    font-family: 'Myriad Pro', 'Helvetica Neue', Arial, Helvetica, sans-serif;
    font-weight: 600;
    position: relative;
    top: 2px;
  }

  .desc {
    font-size: 14px;
    color: rgba(0, 0, 0, 0.45);
    margin-top: 12px;
    margin-bottom: 40px;
  }

  .other-login {
    margin-top: 20px;
  }

  .text-tips {
    font-size: 11px;
  }

</style>
