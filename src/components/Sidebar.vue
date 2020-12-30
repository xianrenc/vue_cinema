<template>
    <div class="sidebar">
        <el-menu
            class="sidebar-el-menu"
            :default-active="onRoutes"
            :collapse="collapse"
            background-color="#fff"
            text-color="#000"
            active-text-color="#07c4a8"
            unique-opened
            router
        >
            <template v-for="item in items">
<!--                <template v-if="item.subs">-->
<!--                    <el-submenu :index="item.index" :key="item.index">-->
<!--                        <template slot="title">-->
<!--                            <i :class="item.icon" style="font-size: larger;font-weight: bold"></i>-->
<!--                            <span slot="title">{{ item.title }}</span>-->
<!--                        </template>-->
<!--                        <template v-for="subItem in item.subs">-->
<!--                            <el-submenu-->
<!--                                v-if="subItem.subs"-->
<!--                                :index="subItem.index"-->
<!--                                :key="subItem.index"-->
<!--                            >-->
<!--                                <template slot="title">{{ subItem.title }}</template>-->
<!--                                <el-menu-item-->
<!--                                    v-for="(threeItem,i) in subItem.subs"-->
<!--                                    :key="i"-->
<!--                                    :index="threeItem.index"-->
<!--                                >{{ threeItem.title }}</el-menu-item>-->
<!--                            </el-submenu>-->
<!--                            <el-menu-item-->
<!--                                v-else-->
<!--                                :index="subItem.index"-->
<!--                                :key="subItem.index"-->
<!--                            >{{ subItem.title }}</el-menu-item>-->
<!--                        </template>-->
<!--                    </el-submenu>-->
<!--                </template>-->
<!--                <template v-else>-->
                    <el-menu-item :index="item.index" :key="item.index">
                        <el-icon :class="item.icon" style="font-size: x-large;font-weight: bolder;margin-right: 5px"></el-icon>
                        <span slot="title" style="font-size: larger;font-weight: bold">{{ item.title }}</span>
                    </el-menu-item>
<!--                </template>-->
            </template>
        </el-menu>
    </div>
</template>

<script>
import bus from './bus.js'
export default {
  data () {
    return {
      collapse: false,
      items: [
        {
          icon: 'iconfont icon-dianying',
          index: 'movieManage',
          title: '电影管理'
        },
        {
          icon: 'iconfont icon-yanchurili',
          index: 'scheduleManage',
          title: '排片管理'
        },
        {
          icon: 'iconfont icon-youhuiquan',
          index: 'promotionManage',
          title: '活动管理'
        },
        {
          icon: 'iconfont icon-yingyuan',
          index: 'cinemaManage',
          title: '影院管理'
        },
        {
          icon: 'iconfont icon-paihangbang',
          index: 'cinemaStatistic',
          title: '影院统计'
        },
        // {
        //   icon: '',
        //   index: 'refundManage',
        //   title: '票务管理'
        // },
        {
          icon: 'iconfont icon-huiyuan',
          index: 'vipManage',
          title: '会员管理'
        }
        // {
        //   icon: 'iconfont icon-wode',
        //   index: 'userManage',
        //   title: '用户管理'
        // }
      ]
    }
  },
  computed: {
    onRoutes () {
      return this.$route.path.replace('/', '')
    }
  },
  created () {
    // 通过 Event Bus 进行组件间通信，来折叠侧边栏
    bus.$on('collapse', msg => {
      this.collapse = msg
      bus.$emit('collapse-content', msg)
    })
  }
}
</script>

<style scoped>
.sidebar {
    display: block;
    position: absolute;
    left: 0;
    top: 70px;
    bottom: 0;
    overflow-y: scroll;
}
.sidebar::-webkit-scrollbar {
    width: 0;
}
.sidebar-el-menu:not(.el-menu--collapse) {
    width: 150px;
}
.sidebar > ul {
    height: 100%;
}
</style>
