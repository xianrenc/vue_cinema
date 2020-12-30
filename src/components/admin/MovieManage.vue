<template>
  <div>
    <el-row style="margin-bottom: 8px">
      <el-col :span="21">
        <h3 style="margin: 5px 0px">电影管理</h3>
      </el-col>
      <el-col :span="3" style="text-align: right">
        <el-button class="btn" icon="el-icon-circle-plus" @click="dialogVisable=true">上架电影</el-button>
      </el-col>
    </el-row>
    <el-card style="margin-bottom: 10px">
      <!--      搜索-->
      <el-row :gutter="20">
        <el-col :span="8">
          <el-input placeholder="请输入" v-model="searchName" clearable>
            <el-button slot="append" icon="el-icon-search" @click="searchMovie"></el-button>
          </el-input>
        </el-col>
        <el-col :span="16" style="text-align: right">
          <el-radio-group v-model="sortType" @change="sort">
            <el-radio  label="time">按时间排序</el-radio>
            <el-radio  label="like">按评分排序</el-radio>
          </el-radio-group>
<!--          <el-button class="btn" icon="el-icon-sort" @click="sort">按时间排序</el-button>-->
        </el-col>
      </el-row>
    </el-card>
    <template v-for="movie in moviePage">
      <el-card class="movie-card" :key="movie.id" :body-style="{ padding: '5px' }">
        <el-row>
          <el-col :span="3">
            <img v-bind:src="movie.posterUrl" class="cover" @click="getDetail(movie.name)" style="cursor: pointer"/>
          </el-col>
          <el-col :span="21" style="line-height: 25px;">
            <el-row class="text" style="margin-left: 10px;margin-right: 30px" >
              <el-col :span="22" style="font-size: 20px;">
                <div @click="getDetail(movie.name)">{{movie.name}}</div>
                <el-tag v-if="movie.status==0" type="success" effect="dark" size="small">热映中</el-tag>
                <el-tag v-else type="danger" effect="dark" size="small">已下架</el-tag>
              </el-col>
              <el-col :span="2">
<!--                <i class="el-icon-star-on" style="color: orange"></i>{{movie.islike}}人想看-->
              </el-col>
            </el-row>
            <el-row class="text" style="margin-left: 10px">
              {{movie.type}}
            </el-row>
            <el-row class="text" style="margin-left: 10px">
              {{movie.country}}/{{movie.length}}分钟
            </el-row>
            <!--            <el-row class="text">-->
            <!--              {{movie.startDate}}-->
            <!--            </el-row>-->
            <!--            <el-row class="text">-->
            <!--              导演：{{movie.director}}-->
            <!--            </el-row>-->
            <!--            <el-row class="text">-->
            <!--              编剧：{{movie.screenWriter}}-->
            <!--            </el-row>-->
            <!--            <el-row class="text">-->
            <!--              主演：{{movie.starring}}-->
            <!--            </el-row>-->
            <el-row class="text" style="margin-left: 10px;margin-right: 50px">
              {{movie.description}}
            </el-row>
            <el-row class="text" style="margin-top:30px;margin-right: 60px;margin-bottom: 20px">
              <div class="detail">
                <el-link @click="getDetail(movie.name)">详情</el-link>
              </div>
            </el-row>
          </el-col>
        </el-row>
      </el-card>
    </template>
    <template v-if="movieList.length==0">
      <el-card>
        <div><h4>无符合要求的电影</h4></div>
      </el-card>
    </template>
    <el-card :body-style="{ padding: '5px' }" >
      <!--    分页区域-->
      <el-pagination
        style="margin: 5px;padding: 0px"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="queryInfo.pagenum"
        :page-sizes="[1, 2, 5,10]"
        :page-size="queryInfo.pagesize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="this.movieList.length"
        align="center"
      >
      </el-pagination>
    </el-card>
    <!--  添加影片对话框-->
    <el-dialog
      title="上架电影"
      :visible.sync="dialogVisable"
      width="40%">
      <div style="line-height: 100px">
        <el-form ref="movieFormRef" v-model="movieForm" label-width="80px" size="mini">
          <el-form-item label="电影">
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
        <el-button type="primary" @click="addMovie">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data () {
    return {
      queryInfo: {
        query: '',
        pagenum: 1,
        pagesize: 5
      },
      sortType: 'time',
      searchName: '',
      dialogVisable: false,
      movieForm: {
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
        description: ''
      },
      movieList: [],
      moviePage: []
    }
  },
  created () {
    this.getMovieList()
  },
  methods: {
    handleSizeChange (newSize) {
      this.queryInfo.pagesize = newSize
      this.getMoviePage()
    },

    handleCurrentChange (newPage) {
      this.queryInfo.pagenum = newPage
      this.getMoviePage()
    },
    getMoviePage () {
      this.moviePage = this.movieList.slice((this.queryInfo.pagenum - 1) * this.queryInfo.pagesize, (this.queryInfo.pagenum) * this.queryInfo.pagesize)
    },
    async getMovieList () {
      const res = await this.$http.get('/movie/all')
      if (res.data.success === false) {
        this.$message.error(res.data.message)
      } else {
        // console.log(res.data.content)
        this.movieList = res.data.content
        // this.movieList.sort(this.compare('status'))
        this.movieList.sort(this.compareByTime('startDate'))
        this.getMoviePage()
      }
    },
    compare (property) {
      return function (a, b) {
        var value1 = a[property]
        var value2 = b[property]
        return value1 - value2
      }
    },
    compareByTime (property) {
      return function (a, b) {
        var value1 = new Date(a[property])
        var value2 = new Date(b[property])
        return value2 - value1
      }
    },
    sort () {
      if (this.sortType === 'time') { this.movieList.sort(this.compareByTime('startDate')) }
      if (this.sortType === 'like') { this.movieList.sort(this.compare('length')) }
      this.getMoviePage()
    },
    getDetail (name) {
      this.$router.push({ path: 'movieDetail', query: { movieName: name } })
      // this.$router.push('/movieDetail')
    },
    async addMovie () {
      this.dialogVisable = false
      const res = await this.$http.post('/movie/add', this.movieForm)
      if (res.data.success === false) {
        this.$message.error(res.data.message)
      } else {
        this.$message.success('上架电影成功!')
      }
      this.$refs.movieFormRef.resetFields()
      this.getMovieList()
    },
    async searchMovie () {
      const res = await this.$http.get('/movie/search', { params: { keyword: this.searchName } })
      if (res.data.success === false) {
        this.$message.error(res.data.message)
      } else {
        this.movieList = res.data.content
        this.getMoviePage()
        // console.log(res.data.content)
        // this.$message.success('搜索电影成功!')
      }
    }
  }
}
</script>

<style scoped>
  .movie-card {
    margin-bottom: 15px;
  }

  .cover {
    width: 150px;
    height: 200px;
  }

  .text {
    margin-bottom: 5px;
  }

  .detail {
    display: flex;
    justify-content: flex-end;
  }

  .btn {
    color: white;
    background-color: #07c4a8;
  }
</style>
