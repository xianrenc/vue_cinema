<template>
<div class="register_container">
  <div class="register_box">
    <el-form ref="registerFormRef" :model="registerForm" :rules="registerFormRules" label-width="0px" class="register_form">
      <el-form-item prop="username">
        <el-input v-model="registerForm.username" prefix-icon="iconfont icon-user" clearable></el-input>
      </el-form-item>
      <el-form-item prop="password">
        <el-input v-model="registerForm.password" prefix-icon="iconfont icon-3702mima" type="password" clearable></el-input>
      </el-form-item>
      <el-form-item class="btns">
        <el-button type="primary" @click="register" style="width: 100%" class="btn">注册</el-button>
      </el-form-item>
      <el-form-item class="btns">
        <el-button type="info" @click="resetRegisterForm" style="width: 100%">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</div>
</template>

<script>
export default {
  data () {
    return {
      registerForm: {
        username: '',
        password: ''
      },
      registerFormRules: {
        username: [
          { required: true, message: '请输入用户名称', trigger: 'blur' },
          { min: 4, max: 10, message: '长度在 3 到 10 个字符', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 6, max: 15, message: '长度在 6 到 15 个字符', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    resetRegisterForm () {
      this.$refs.registerFormRef.resetFields()
    },
    register () {
      this.$refs.registerFormRef.validate(async valid => {
        if (valid) {
          var res = await this.$http.post('/register', this.registerForm)
          if (res.data.success === false) {
            this.$message.error(res.data.message)
            this.$refs.registerFormRef.resetFields()
          } else {
            this.$message.success('注册成功!')
            this.$router.push('/login')
          }
        } else {
          this.$message.error('用户名或密码错误')
          this.$refs.registerFormRef.resetFields()
        }
      })
    }
  }
}
</script>

<style lang="less" scoped>
  .register_container{
    background-image: url(../assets/cinema.jpg);
    background-size: 100%;
    height: 100%;
  }

  .register_box{
    width: 450px;
    height: 300px;
    background-color: white;
    border-radius: 3px;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%,-50%);
  }

  .register_form {
    position: absolute;
    bottom: 0;
    width: 100%;
    padding: 0 20px;
    box-sizing: border-box;
  }

  .btns {
    text-align: center;
  }
  .btn {
    color: white;
    background-color: #07c4a8;
  }

</style>
