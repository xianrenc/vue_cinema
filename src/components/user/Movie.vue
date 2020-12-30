<template>
  <div>
    <el-card style="margin-bottom: 10px">
      <!--      搜索-->
      <el-row :gutter="20">
        <el-col :span="8">
          <el-input placeholder="请输入搜索关键词" v-model="searchName" clearable>
            <el-button slot="append" icon="el-icon-search" @click="searchMovie"></el-button>
          </el-input>
        </el-col>
        <el-col :span="16" style="text-align: right">
          <el-radio-group v-model="sortType" @change="sort">
            <el-radio  label="time">按时间排序</el-radio>
            <el-radio  label="like">按评分排序</el-radio>
          </el-radio-group>
        </el-col>
      </el-row>
    </el-card>
    <template v-for="movie in moviePage">
      <el-card class="movie-card" :key="movie.id" :body-style="{ padding: '5px' }">
        <el-row>
          <el-col :span="3">
            <img v-bind:src="movie.posterUrl" class="cover" @click="getDetail(movie.name)"/>
          </el-col>
          <el-col :span="21">
            <el-row class="text">
              <el-col :span="22">
                <div @click="getDetail(movie.name)">{{movie.name}}</div>
                <el-tag v-if="movie.status==0" type="success" effect="dark" size="small">热映中</el-tag>
                <el-tag v-else type="danger" effect="dark" size="small">已下架</el-tag>
              </el-col>
            </el-row>
            <el-row class="text">
              {{movie.type}}
            </el-row>
            <el-row class="text">
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
            <el-row class="text">
              {{movie.description}}
            </el-row>
            <el-row class="text">
<!--              <div class="detail">-->
<!--                <el-link @click="getDetail(movie.name)">详情</el-link>-->
<!--              </div>-->
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
      const res = await this.$http.get('/movie/all/exclude/off')
      if (res.data.success === false) {
        this.$message.error(res.data.message)
      } else {
        // console.log(res.data.content)
        this.movieList = res.data.content
        this.getMoviePage()
      }
    },
    getDetail (name) {
      this.$router.push({ path: '/movieInfo', query: { movieName: name } })
      // this.$router.push('/movieDetail')
    },
    async searchMovie () {
      const res = await this.$http.get('/movie/search', { params: { keyword: this.searchName } })
      if (res.data.success === false) {
        this.$message.error(res.data.message)
      } else {
        this.movieList = res.data.content
        this.getMoviePage()
        this.$message.success('搜索电影成功!')
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
