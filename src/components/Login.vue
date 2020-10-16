<template>
  <div class="login_container">
    <div class="login_box">
      <!--    表单-->
      <el-form ref="loginFormRef" :model="loginForm" :rules="loginFormRules" label-width="0px"  class="login_from">
        <!--        用户名-->
        <el-form-item prop="username">
          <el-input v-model="loginForm.username" prefix-icon="iconfont icon-user" clearable></el-input>
        </el-form-item>
        <!--        密码-->
        <el-form-item prop="password">
          <el-input v-model="loginForm.password" prefix-icon="iconfont icon-3702mima" type="password" clearable></el-input>
        </el-form-item>
        <!--        按钮-->
        <el-form-item class="btns">
          <el-button @click="login"
                     style="width: 100%;color: white;
    background-color: #07c4a8;">
            登陆
          </el-button>
<!--          <el-button type="info" @click="resetLoginForm">重置</el-button>-->
        </el-form-item>
        <el-form-item class="link">
          <el-link  style="color: #07c4a8" @click="register">免费注册</el-link>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      loginForm: {
        username: '',
        password: ''
      },
      loginFormRules: {
        username: [
          { required: true, message: '请输入登陆名称', trigger: 'blur' },
          { min: 4, max: 10, message: '长度在 4 到 10 个字符', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入登陆密码', trigger: 'blur' },
          { min: 6, max: 15, message: '长度在 6 到 15 个字符', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    resetLoginForm () {
      this.$refs.loginFormRef.resetFields()
    },
    login () {
      this.$refs.loginFormRef.validate(async valid => {
        if (valid) {
          var res = await this.$http.post('/login', this.loginForm)
          if (res.data.success === false) {
            this.$message.error(res.data.message)
            this.$refs.loginFormRef.resetFields()
          } else {
            this.$message.success('登陆成功!')

            if (this.loginForm.username === 'root') {
              window.sessionStorage.setItem('token', 'admin')
              this.$router.push('/admin')
            } else {
              window.sessionStorage.setItem('token', 'user')
              this.$router.push('/user')
            }
            window.sessionStorage.setItem('username', res.data.content.username)
            window.sessionStorage.setItem('userId', res.data.content.id)
          }
        } else {
          this.$message.error('用户名或密码错误!')
          this.$refs.loginFormRef.resetFields()
        }
      })
    },
    register () {
      this.$router.push('/signUp')
    }
  }
}

</script>

<style lang="less" scoped>
  .login_container{
    background-image: url(../assets/cinema.jpg);
    background-size: 100%;
    height: 100%;
  }

  .login_box{
    width: 450px;
    height: 300px;
    background-color: white;
    border-radius: 3px;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%,-50%);
  }

  .login_from {
    position: absolute;
    bottom: 0;
    width: 100%;
    padding: 0 20px;
    box-sizing: border-box;
  }

  .btns {
    text-align: center;
  }

  .link {
    text-align: center;
  }
</style>
