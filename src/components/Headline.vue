<template>
  <div class="header">
    <div class="logo">NJU影院</div>
    <div class="menu">
      <el-menu
          class="el-menu"
          :default-active="onRoutes"
          background-color="#07c4a8"
          text-color="white"
          active-text-color="black"
          mode="horizontal"
          router
      >
        <template v-for="item in items">
          <el-menu-item :index="item.index" :key="item.index"
                        style="height: 70px;width: 100px;text-align: center;font-size: 20px">
            <span slot="title">{{ item.title }}</span>
          </el-menu-item>
        </template>
      </el-menu>
    </div>
    <div class="header-right">
      <div class="header-user-con">
        <!-- 全屏显示 -->
        <div class="btn-fullscreen" @click="handleFullScreen">
          <el-tooltip effect="dark" :content="fullscreen?`取消全屏`:`全屏`" placement="bottom">
            <i class="el-icon-rank"></i>
          </el-tooltip>
        </div>
        <!-- 用户头像 -->
        <div class="user-avator">
          <img src="../assets/user.jpg" />
        </div>
        <!-- 用户名下拉菜单 -->
        <el-dropdown class="user-name" trigger="click" @command="handleCommand">
                    <span class="el-dropdown-link">
                        {{username}}
                        <i class="el-icon-caret-bottom"></i>
                    </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command="ticket">电影票</el-dropdown-item>
            <el-dropdown-item command="card">卡包</el-dropdown-item>
            <el-dropdown-item command="history">历史</el-dropdown-item>
            <el-dropdown-item command="info">个人信息</el-dropdown-item>
            <el-dropdown-item divided command="loginout">退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      fullscreen: false,
      name: '',
      items: [
        {
          index: 'home',
          title: '主页'
        },
        {
          index: 'movie',
          title: '电影'
        }
      ]
    }
  },
  computed: {
    username () {
      const username = window.sessionStorage.getItem('username')
      return username
    },
    onRoutes () {
      return this.$route.path.replace('/', '')
    }
  },
  methods: {
    // 用户名下拉菜单选择事件
    handleCommand (command) {
      if (command === 'loginout') {
        window.sessionStorage.clear()
        this.$router.push('/login')
      } else if (command === 'ticket') {
        this.$router.push('/ticket')
      } else if (command === 'card') {
        this.$router.push('/card')
      } else if (command === 'history') {
        this.$router.push('/history')
      } else if (command === 'info') {
        this.$router.push('/info')
      }
    },
    // 全屏事件
    handleFullScreen () {
      const element = document.documentElement
      if (this.fullscreen) {
        if (document.exitFullscreen) {
          document.exitFullscreen()
        } else if (document.webkitCancelFullScreen) {
          document.webkitCancelFullScreen()
        } else if (document.mozCancelFullScreen) {
          document.mozCancelFullScreen()
        } else if (document.msExitFullscreen) {
          document.msExitFullscreen()
        }
      } else {
        if (element.requestFullscreen) {
          element.requestFullscreen()
        } else if (element.webkitRequestFullScreen) {
          element.webkitRequestFullScreen()
        } else if (element.mozRequestFullScreen) {
          element.mozRequestFullScreen()
        } else if (element.msRequestFullscreen) {
          // IE11
          element.msRequestFullscreen()
        }
      }
      this.fullscreen = !this.fullscreen
    }
  }
}
</script>
<style scoped>
  .header {
    position: relative;
    box-sizing: border-box;
    width: 100%;
    height: 70px;
    font-size: 22px;
    color: #fff;
    background-color: #07c4a8;
  }
  .header .logo {
    padding-left: 20px;
    float: left;
    width: 170px;
    line-height: 70px;
  }
  .menu {
    padding-left: 0px;
    float: left;
  }
  .header-right {
    float: right;
    padding-right: 20px;
  }
  .header-user-con {
    display: flex;
    height: 70px;
    align-items: center;
  }
  .btn-fullscreen {
    transform: rotate(45deg);
    margin-right: 5px;
    font-size: 24px;
  }
  .user-name {
    margin-left: 10px;
  }
  .user-avator {
    margin-left: 20px;
  }
  .user-avator img {
    display: block;
    width: 40px;
    height: 40px;
    border-radius: 50%;
  }
  .el-dropdown-link {
    color: #fff;
    cursor: pointer;
  }
  .el-menu-item.is-active {
    background-color: #f0f0f0 !important;
    border-bottom-color:#f0f0f0!important;
    font-weight: bold;
  }

</style>
