<template>
  <div>
<!--    海报列表-->
    <el-row class="carousel">
      <el-carousel height="360px">
        <el-carousel-item v-for="poster in posterList" :key="poster">
          <el-image class="poster" v-bind:src="poster"></el-image>
        </el-carousel-item>
      </el-carousel>
    </el-row>
    <!--    电影列表-->
    <el-row>
      <el-col :span="18">
        <div style="margin-top: 10px;margin-bottom: 10px;font-size: larger;font-weight: bold">正在上映</div>
        <template v-for="movie in movieList">
          <el-col :key="movie.id" :span="4" style="display:flex;justify-content:center;align-items:center">
            <el-card :body-style="{ padding: '0px' }" style="margin: 5px" class="movie">
              <el-row style="text-align: center;height: 200px">
                <div class="movie-detail" @mouseenter="onMouseOver(movie.id)" @mouseleave="onMouseOut(movie.id)"
                     v-bind:style="{backgroundImage:'url(' + movie.posterUrl + ')'}">
                  <transition name="move" mode="out-in">
                    <div v-show="getSeenList(movie.id)" class="movie-info">
                      <div style="overflow: hidden;text-overflow:ellipsis;white-space: nowrap;
                      width: 140px">电影：{{movie.name}}<br></div>
                      <div style="overflow: hidden;text-overflow:ellipsis;white-space: nowrap;
                      width: 140px">导演：{{movie.director}}<br></div>
                      <div style="overflow: hidden;text-overflow:ellipsis;white-space: nowrap;
                      width: 140px">主演：{{movie.starring}}<br></div>
                      <div style="overflow: hidden;text-overflow:ellipsis;white-space: nowrap;
                      width: 140px">类型：{{movie.type}}<br></div>
                      <div style="overflow: hidden;text-overflow:ellipsis;white-space: nowrap;
                      width: 140px">地区：{{movie.country}}<br></div>
                      <div style="overflow: hidden;text-overflow:ellipsis;white-space: nowrap;
                      width: 140px">语言：{{movie.language}}<br></div>
                      <div style="overflow: hidden;text-overflow:ellipsis;white-space: nowrap;
                      width: 140px">片长：{{movie.length}} 分钟<br></div>
<!--                      类型：{{movie.type}}<br>-->
<!--                      地区：{{movie.country}}<br>-->
<!--                      语言：{{movie.language}}<br>-->
<!--                      片长：{{movie.length}} 分钟<br>-->
                    </div>
                  </transition>
                </div>
                <!--                <el-image v-bind:src="movie.posterUrl"-->
                <!--                          style="width: 150px;height: 200px"-->
                <!--                ></el-image>-->
              </el-row>
              <el-row style="display:flex;justify-content:center;align-items:center;height: 40px">
                <el-button class="buy-btn" @click="getMovieDetail(movie.name)">选座购票</el-button>
              </el-row>
            </el-card>
          </el-col>
        </template>
      </el-col>
      <el-col :span="6">
        <el-card style="margin-top: 10px;padding: 5px" :body-style="{ padding: '0px' }">
          <div style="font-size: larger;font-weight: bold">电影票房</div>
          <!--          <div v-for="movie in rankList" :key="movie.id">-->
          <!--            {{movie.name}}<br>-->
          <!--            <div style="position: absolute;right: 0">{{movie.islike}}</div>-->
          <!--          </div>-->
                    <template>
                      <el-table
                        class="rank"
                        :data="rankList"
                        :show-header="false"
                        style="width: 100%"
                        :row-class-name="tableRowClassName">
                        <el-table-column
                          prop="name">
                          <template slot-scope="scope">
                            <template v-if="scope.$index===0">
                              <el-icon class="iconfont icon-huiyuan" style="font-weight: bolder;font-size: x-large;color: orange"></el-icon>
                            </template>
                            <span style="cursor: pointer" @click="getMovieDetail(scope.row.name)">
                              {{scope.row.name}}
                            </span>
                          </template>
                        </el-table-column>
                        <el-table-column
                          align="right"
                          prop="boxOffice">
                          <template slot-scope="scope">
                            <div style="color: red">
                              {{scope.row.boxOffice===null?0:scope.row.boxOffice}}
                              <span style="font-size: small"> 万元</span>
                            </div>
                          </template>
                        </el-table-column>
                      </el-table>
<!--                      <el-row :key="movie.id"-->
<!--                              style="margin-bottom: 10px;margin-left: 10px;margin-right: 10px;cursor:pointer"-->
<!--                      >-->
<!--                        <div @click="getMovieDetail(index)">-->
<!--                          <template v-if="index===0">-->
<!--                            <div style="font-size: 25px;font-weight: bolder;display: inline">{{index+1}}  {{movie.name}}</div>-->
<!--                            <div style="color:red;font-size: 20px;display:inline;position: absolute;right: 0;bottom: 0">{{movie.boxOffice===null?0:movie.boxOffice}} 元</div>-->
<!--                          </template>-->
<!--                          <template v-else>-->
<!--                            <div style="font-size: 18px;font-weight: bold;display: inline">{{index+1}}  {{movie.name}}</div>-->
<!--                            <div style="color:red;font-size: 15px;display:inline;position: absolute;right: 0;bottom: 0">{{movie.boxOffice===null?0:movie.boxOffice}} 元</div>-->
<!--                          </template>-->
<!--                        </div>-->
<!--                      </el-row>-->
                    </template>

        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  data () {
    return {
      seenList: [],
      posterList: [
        'https://images.weserv.nl/?url=http://web-txpc.oss-cn-shanghai.aliyuncs.com/sale/sale1599462555938.jpg',
        'https://images.weserv.nl/?url=http://web-txpc.oss-cn-shanghai.aliyuncs.com/sale/sale1597142255215.jpg',
        'https://images.weserv.nl/?url=http://web-txpc.oss-cn-shanghai.aliyuncs.com/sale/sale1597142728239.jpg'
      ],
      movieList: [],
      rankList: []
    }
  },
  created () {
    this.getMovieList()
    this.initSeenList()
    this.initRankList()
  },
  methods: {
    async initRankList () {
      const res = await this.$http.get('/statistics/boxOffice/total')
      if (res.data.success === false) {
        this.$message.error(res.data.message)
      } else {
        this.rankList = res.data.content
        this.rankList = this.rankList.slice(0, 5)
      }
    },
    onMouseOver (index) {
      // this.seenList[index] = true
      this.$set(this.seenList, index, true)
      // this.seen = true
    },
    onMouseOut (index) {
      // this.seenList[index] = false
      // this.seen = false
      this.$set(this.seenList, index, false)
    },
    initSeenList () {
      this.seenList = new Array(this.movieList.length)
      for (var i = 0, len = this.seenList.length; i <= len; i++) {
        this.seenList[i] = false
      }
    },
    getSeenList (index) {
      return this.seenList[index]
    },
    getMovieDetail (name) {
      this.$router.push({ path: '/movieInfo', query: { movieName: name } })
    },
    async getMovieList () {
      const res = await this.$http.get('/movie/all/exclude/off')
      if (res.data.success === false) {
        this.$message.error(res.data.message)
      } else {
        // console.log(res.data.content)
        this.movieList = res.data.content
      }
    },
    tableRowClassName ({ row, rowIndex }) {
      row.rowIndex = rowIndex
      if (rowIndex === 0) {
        return 'first-row'
      }// else if (rowIndex === 3) {
      //   return 'success-row'
      // }
      return ''
    }
  }
}
</script>

<style scoped>
  /*.move-enter-active, .move-leave-active {*/
  /*  transition: all .5s ease;*/
  /*}*/

  /*.move-enter, .move-leave-active {*/
  /*  opacity: 0;*/
  /*}*/

  .poster {
    height: 100%;
    width: 100%;
  }

  .movie {
    padding: 0px;
    margin: 0px;
    height: 240px;
    width: 150px;
  }

  .movie-detail {
    width: 150px;
    height: 200px;
    background-size: cover;
  }

  .movie-info {
    padding: 10px;
    text-align: left;
    width: 130px;
    height: 180px;
    font-size: small;
    color: white;
    background-color: black;
    opacity: 0.7;
  }

  .buy-btn {
    width: 100%;
    height: 100%;
    background-color: #07c4a8;
    color: white;
    font-weight: bold
  }
</style>
<style>
  .el-table .first-row {
    font-size: larger;
    font-weight: bolder;
  }
</style>
