<template>
  <div id="login">
    <div id="form_space">
      <div align="center">
        <h1>{{login_title}}</h1>
        <p>{{login_address}}</p>
      </div>
      <div style="padding: 20px">
        <el-form
          ref="dataForm"
          :model="login_form"
          :rules="rules"
        >
          <el-form-item prop="phone">
            <el-input
              v-model="login_form.phone"
              prefix-icon="el-icon-phone"
            ></el-input>
          </el-form-item>
          <el-form-item prop="password">
            <el-input
              v-model="login_form.password"
              prefix-icon="el-icon-lock"
              show-password
            ></el-input>
          </el-form-item>
          <el-form-item>
            <el-checkbox v-model="remember_password">记住密码</el-checkbox>
          </el-form-item>
          <el-form-item align="center">
            <el-button type="primary" icon="el-icon-right" @click="oasisLogin()">登录</el-button>
          </el-form-item>
        </el-form>


      </div>
    </div>
  </div>
</template>

<script>
  import {login} from "../../api/api";

  export default {
    name: "Login",
    data() {
      return {
        login_title: "Oasis",
        login_address: "绿洲",
        login_form: {
          phone: "",
          password: ""
        },
        rules: {
          phone: [
            {required: true, message: '手机号不能为空', trigger: 'blur'}
          ],
          password: [
            {required: true, message: '密码不能为空', trigger: 'blur'}
          ],
        },
        remember_password: false,
      }
    },
    methods: {
      //登录
      oasisLogin() {
        this.$refs['dataForm'].validate((valid) => {
          if (valid) {
            let loginData = this.login_form;
            login(loginData).then(res => {
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

      }

    },
  }
</script>

<style scoped>
  h1 {
    color: #606266;
  }

  p {
    color: #606266;
  }

  #login {
    min-height: 100vh;
  }

  #form_space {
    border-radius: 10px;
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    margin: auto;
    height: 400px;
    width: 400px;
  }

</style>
