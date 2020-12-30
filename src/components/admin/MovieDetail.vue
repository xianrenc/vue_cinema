<template>
  <div>
    <el-card>
      <el-row :gutter="15">
        <el-col :span="5">
          <img v-bind:src="movie.posterUrl" class="cover"/>
        </el-col>
        <el-col :span="19" style="line-height: 30px">
          <el-row class="text">
            <div  style="font-size: 20px">名称：{{movie.name}}</div>
          </el-row>
          <el-row class="text">
            类型：{{movie.type}}
          </el-row>
          <el-row class="text">
            地区：{{movie.country}}
          </el-row>
          <el-row class="text">
            语言：{{movie.language}}
          </el-row>
          <el-row class="text">
            时长：{{movie.length}}分钟
          </el-row>
          <el-row class="text">
            上映：{{formatDate(movie.startDate)}}
          </el-row>
          <el-row class="text">
            导演：{{movie.director}}
          </el-row>
          <el-row class="text">
            编剧：{{movie.screenWriter}}
          </el-row>
          <el-row class="text">
            主演：{{movie.starring}}
          </el-row>
          <el-row class="text">
            简介：{{movie.description}}
          </el-row>
          <el-row style="text-align: right">
            <template v-if="movie.status==0">
              <el-button type="primary" icon="el-icon-edit" @click="dialogVisable=true">修改</el-button>
              <el-button type="danger" icon="el-icon-delete" @click="deleteMovie(movie.id)">下架</el-button>
            </template>
            <template v-else>
              <el-button type="primary" icon="el-icon-edit" @click="dialogVisable=true">上架</el-button>
            </template>
          </el-row>
        </el-col>
      </el-row>
    </el-card>
    <el-card style="margin-top: 15px">
      <div id="Chart" :style="{width: '100%', height: '350px'}"></div>
    </el-card>
<!--    修改电影对话框-->
    <el-dialog
      title="修改电影"
      :visible.sync="dialogVisable"
      width="40%">
      <div style="line-height: 0px">
        <el-form ref="movieFormRef" v-model="movieForm" label-width="80px" size="mini">
          <el-form-item label="电影" style="font-size: 100px">
            <el-input v-model="movieForm.name" placeholder="请输入电影名称"></el-input>
          </el-form-item>
          <el-form-item label="海报">
            <el-input v-model="movieForm.posterUrl" placeholder="请输入图片url"></el-input>
          </el-form-item>
          <el-form-item label="导演">
            <el-input v-model="movieForm.director" placeholder="请输入电影导演"></el-input>
          </el-form-item>
          <el-form-item label="编剧">
            <el-input v-model="movieForm.screenWriter" placeholder="请输入电影编剧"></el-input>
          </el-form-item>
          <el-form-item label="主演">
            <el-input v-model="movieForm.starring" placeholder="请输入电影主演"></el-input>
          </el-form-item>
          <el-form-item label="类型">
            <el-input v-model="movieForm.type" placeholder="请输入电影类型"></el-input>
          </el-form-item>
          <el-form-item label="国家">
            <el-input v-model="movieForm.country" placeholder="请输入制作电影国家"></el-input>
          </el-form-item>
          <el-form-item label="语言">
            <el-input v-model="movieForm.language" placeholder="请输入电影对白语言"></el-input>
          </el-form-item>
          <el-form-item label="上映日期">
            <el-date-picker
              v-model="movieForm.startDate"
              type="date"
              style="width: 100%"
              placeholder="请选择电影上映日期">
            </el-date-picker>
            <!--            <el-input v-model="movieForm.startDate" placeholder="请输入电影上映日期"></el-input>-->
          </el-form-item>
          <el-form-item label="片长">
            <el-input v-model="movieForm.length" placeholder="请输入电影片长"></el-input>
          </el-form-item>
          <el-form-item label="简介">
            <el-input v-model="movieForm.description" placeholder="请输入电影简介"
                      type="textarea" autosize></el-input>
          </el-form-item>
        </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisable = false">取 消</el-button>
        <el-button type="primary" @click="updateMovie">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
// 引入基本模板
const echarts = require('echarts/lib/echarts')
// 引入柱状图组件
require('echarts/lib/chart/line')
// 引入提示框和title组件
require('echarts/lib/component/tooltip')
require('echarts/lib/component/title')
export default {
  data () {
    return {
      dialogVisable: false,
      movie: {
      },
      movieForm: {
        id: '',
        name: '',
        posterUrl: '',
        director: '',
        screenWriter: '',
        starring: '',
        type: '',
        country: '',
        language: '',
        startDate: '',
        length: '',
        description: '',
        status: 0
      },
      deleteForm: {
        movieIdList: []
      }
    }
  },
  created () {
    this.getMovie()
  },
  methods: {
    async draw () {
      const myChart = echarts.init(document.getElementById('Chart'))
      var option = {
        title: { text: '想看人数变化表' },
        tooltip: {},
        xAxis: {
          data: []
        },
        yAxis: {},
        series: [{
          name: '人数',
          type: 'line',
          data: []
        }]
      }
      const res = await this.$http.get('/movie/' + this.movie.id + '/like/date')
      if (res.data.success === false) {
        this.$message.error(res.data.message)
      } else {
        for (var movie of res.data.content) {
          option.xAxis.data.push(new Date(movie.likeTime).toLocaleDateString())
          option.series[0].data.push(movie.likeNum)
        }
      }
      myChart.setOption(option)
    },
    async getMovie () {
      var movieName = this.$route.query.movieName
      const res = await this.$http.get('/movie/search', { params: { keyword: movieName } })
      if (res.data.success === false) {
        this.$message.error(res.data.message)
      } else {
        this.movie = res.data.content[0]
        this.movieForm.id = this.movie.id
        this.movieForm.name = this.movie.name
        this.movieForm.startDate = this.movie.startDate
        this.movieForm.length = this.movie.length
        this.movieForm.language = this.movie.language
        this.movieForm.country = this.movie.country
        this.movieForm.type = this.movie.type
        this.movieForm.posterUrl = this.movie.posterUrl
        this.movieForm.director = this.movie.director
        this.movieForm.starring = this.movie.starring
        this.movieForm.screenWriter = this.movie.screenWriter
        this.movieForm.description = this.movie.description
      }
      this.draw()
    },
    async deleteMovie (id) {
      this.deleteForm.movieIdList.push(id)
      const res = await this.$http.post('/movie/off/batch', this.deleteForm)
      if (res.data.success === false) {
        this.$message.error(res.data.message)
      } else {
        this.$message.success('下架影片成功！')
      }
      this.getMovie()
    },
    async updateMovie () {
      this.dialogVisable = false
      const res = await this.$http.post('/movie/update', this.movieForm)
      if (res.data.success === false) {
        this.$message.error(res.data.message)
      }
      this.getMovie()
    },
    formatDate (date) {
      return new Date(date).toLocaleDateString()
    }
  }
}
</script>

<style scoped>
  .cover {
    width: 250px;
    height: 350px;
  }
  .text{
    margin-bottom: 5px;
  }
</style>
