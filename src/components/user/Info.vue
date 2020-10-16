<template>
  <div class="info-container">
    <el-card class="info">
      <h3 style="text-align: center">个人信息</h3>
      <el-form style="margin-left:50px;margin-right: 50px">
        <el-form-item prop="userid">
          <el-input disabled prefix-icon="el-icon-eleme" v-model="userForm.userid"></el-input>
        </el-form-item>
        <el-form-item prop="username">
          <el-input clearable prefix-icon="iconfont icon-user" v-model="userForm.username"></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input clearable prefix-icon="iconfont icon-3702mima" type="password"
                    v-model="userForm.password"></el-input>
        </el-form-item>
        <el-form-item class="btns" style="display: flex;justify-content: center;align-items: center">
          <el-button type="primary">保存</el-button>
          <el-button type="info">重置</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
export default {
  data () {
    return {
      userForm: {
        userid: window.sessionStorage.getItem('userId'),
        username: window.sessionStorage.getItem('username'),
        password: '123456'
      }
    }
  }
}
</script>

<style scoped>
  .info-container{
    display:flex;
    justify-content:center;
    align-items:center;
    height: 100%;
  }
.info{
  width: 50%;
}
  .btns{
    width: 100%;
  }
</style>
