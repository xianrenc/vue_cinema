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
      </el-row>
    </el-card>
    <template v-for="movie in movieList">
      <el-card class="movie-card" :key="movie.id" :body-style="{ padding: '5px' }">
        <el-row>
          <el-col :span="3">
            <img v-bind:src="movie.posterUrl" class="cover"/>
          </el-col>
          <el-col :span="21">
            <el-row class="text">
              <el-col :span="22">
                {{movie.name}}
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
  </div>
</template>

<script>
export default {
  data () {
    return {
      searchName: '',
      movieList: []
    }
  },
  created () {
    this.getMovieList()
  },
  methods: {
    async getMovieList () {
      const res = await this.$http.get('/movie/all/exclude/off')
      if (res.data.success === false) {
        this.$message.error(res.data.message)
      } else {
        // console.log(res.data.content)
        this.movieList = res.data.content
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
        console.log(this.searchName)
        console.log(res.data.content)
        this.$message.success('搜索电影成功!')
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
