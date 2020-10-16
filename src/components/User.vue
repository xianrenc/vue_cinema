<template>
  <div class="wrapper">
    <v-head></v-head>
    <div class="container">
      <div class="content">
        <transition name="move" mode="out-in">
          <router-view></router-view>
        </transition>
        <el-backtop target=".content"></el-backtop>
      </div>
    </div>
  </div>
</template>

<script>
import vHead from './Headline.vue'

export default {
  components: { vHead }
}
</script>

<style scoped>
  .move-enter-active, .move-leave-active {
    transition: all .5s ease;
  }

  .move-enter, .move-leave-active {
    opacity: 0;
  }
  .container {
    position: absolute;
    left: 0;
    right: 0;
    top: 70px;
    bottom: 0;
    background: #f0f0f0;
  }
</style>
