<template>
  <div>
    <h3 style="margin: 5px 0px">影院统计</h3>
    <el-row :gutter="20" style="margin-bottom: 25px">
      <el-col :span="12">
        <el-card class="container">
          <div id="FirstChart" :style="{width: '100%', height: '350px'}"></div>
        </el-card>
      </el-col>
      <el-col :span="12">
        <el-card class="container">
          <div id="SecondChart" :style="{width: '100%', height: '350px'}"></div>
        </el-card>
      </el-col>
    </el-row>
    <el-row :gutter="20">
      <el-col :span="12">
        <el-card class="container">
          <div id="ThirdChart" :style="{width: '100%', height: '350px'}"></div>
        </el-card>
      </el-col>
      <el-col :span="12">
        <el-card class="container">
          <div id="ForthChart" :style="{width: '100%', height: '350px'}"></div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
// 引入基本模板
const echarts = require('echarts/lib/echarts')
// 引入柱状图组件
require('echarts/lib/chart/bar')
require('echarts/lib/chart/pie')
require('echarts/lib/chart/line')
// 引入提示框和title组件
require('echarts/lib/component/tooltip')
require('echarts/lib/component/title')
export default {
  name: 'cinemaStatistic',
  data () {
    return {

    }
  },
  mounted () {
    this.drawFirst()
    this.drawSecond()
    this.drawThird()
    this.drawForth()
  },
  methods: {
    async drawFirst () {
      const myChart = echarts.init(document.getElementById('FirstChart'))
      var option = {
        title: { text: '今日排片率' },
        tooltip: {},
        series: [
          {
            name: '排片',
            type: 'pie', // 设置图表类型为饼图
            radius: '55%', // 饼图的半径，外半径为可视区尺寸（容器高宽中较小一项）的 55% 长度。
            data: []
          }
        ]
      }
      const res = await this.$http.get('statistics/scheduleRate')
      if (res.data.success === false) {
        this.$message.error(res.data.message)
      } else {
        for (var movie of res.data.content) {
          var data = {}
          data.value = movie.time
          data.name = movie.name
          option.series[0].data.push(data)
        }
      }
      myChart.setOption(option)
    },
    async drawSecond () {
      const myChart = echarts.init(document.getElementById('SecondChart'))
      var option = {
        title: { text: '所有电影票房' },
        tooltip: {},
        series: [
          {
            name: '票房',
            type: 'pie', // 设置图表类型为饼图
            radius: '55%', // 饼图的半径，外半径为可视区尺寸（容器高宽中较小一项）的 55% 长度。
            data: []
          }
        ]
      }
      const res = await this.$http.get('/statistics/boxOffice/total')
      if (res.data.success === false) {
        this.$message.error(res.data.message)
      } else {
        for (var movie of res.data.content) {
          var data = {}
          data.value = movie.boxOffice
          data.name = movie.name
          option.series[0].data.push(data)
        }
      }
      myChart.setOption(option)
    },
    async drawThird () {
      const myChart = echarts.init(document.getElementById('ThirdChart'))
      var option = {
        title: { text: '每日客单价' },
        tooltip: {},
        xAxis: {
          data: []
        },
        yAxis: {},
        series: [{
          name: '金额',
          type: 'line',
          data: []
        }]
      }
      const res = await this.$http.get('/statistics/audience/price')
      if (res.data.success === false) {
        this.$message.error(res.data.message)
      } else {
        for (var movie of res.data.content) {
          option.xAxis.data.push(new Date(movie.date).toLocaleDateString())
          option.series[0].data.push(movie.price)
        }
      }
      myChart.setOption(option)
    },
    async drawForth () {
      const myChart = echarts.init(document.getElementById('ForthChart'))
      var option = {
        title: { text: '每日上座率' },
        tooltip: {},
        xAxis: {
          data: []
        },
        yAxis: {},
        series: [{
          name: '座位数',
          type: 'bar',
          data: []
        }]
      }
      var date = new Date()
      const res = await this.$http.get('/admin/cinema/statistics/PlacingRate/' + date.getFullYear() +
        '/' + (date.getMonth() + 1) + '/' + date.getDate())
      if (res.data.success === false) {
        this.$message.error(res.data.message)
      } else {
        for (var movie of res.data.content) {
          option.xAxis.data.push(movie.movie)
          option.series[0].data.push(movie.seatNum)
        }
      }
      myChart.setOption(option)
    }
  }
}
</script>

<style lang="less" scoped>
.container{
  height: 350px;
}
</style>
