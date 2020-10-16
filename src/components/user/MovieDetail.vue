<template>
  <div>
<!--    电影信息视图-->
    <el-card>
      <el-row :gutter="15">
        <el-col :span="4">
          <img v-bind:src="movie.posterUrl" class="cover"/>
        </el-col>
        <el-col :span="20">
          <el-row class="text">
            名称：{{movie.name}}
          </el-row>
          <el-row class="text">
            类型：{{movie.type}}
          </el-row>
          <el-row class="text">
            地区：{{movie.country}}
          </el-row>
          <el-row class="text">
            时长：{{movie.length}} 分钟
          </el-row>
          <el-row class="text">
            上映：{{formatTime(movie.startDate)}}
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
          <el-row style="display: flex;justify-content: flex-end">
            <template v-if="this.isLike===false">
              <i class="el-icon-star-on" style="font-size: 35px;color:gainsboro"></i>
              <el-button  class="btn" @click="like">收藏</el-button>
            </template>
            <template v-else>
              <i class="el-icon-star-on" style="font-size: 35px;color: orange"></i>
              <el-button  class="btn" @click="unLike">取消</el-button>
            </template>
          </el-row>
        </el-col>
      </el-row>
    </el-card>
<!--    电影排片信息视图-->
    <el-card style="margin-top: 15px">
      <el-tabs v-model="activeIndex" type="border-card">
        <template v-for="(item,index) in scheduleList">
          <el-tab-pane :key="index" :name="index" :label="formatDate(item.date)">
           <el-table
             :data="item.scheduleItemList" border stripe style="color: black">
              <el-table-column align="center" label="放映开始时间" prop="startTime" :formatter="formatStartTime"></el-table-column>
              <el-table-column align="center" label="放映结束时间" prop="endTime" :formatter="formatEndTime"></el-table-column>
              <el-table-column align="center" label="放映厅" prop="hallName"></el-table-column>
              <el-table-column align="center" label="票价" prop="fare"></el-table-column>
              <el-table-column align="center" label="选座购票">
                <template slot-scope="scope">
                  <el-button class="btn" @click="buyTicket(scope.row.id)">选座购票</el-button>
                </template>
              </el-table-column>
            </el-table>
          </el-tab-pane>
        </template>
      </el-tabs>
    </el-card>
  </div>
</template>

<script>
import qs from 'qs'
export default {
  data () {
    return {
      isLike: false,
      activeIndex: 0,
      movie: {},
      scheduleList: []
    }
  },
  created () {
    this.initMovie()
  },
  methods: {
    async initMovie () {
      var movieName = this.$route.query.movieName
      const res = await this.$http.get('/movie/search', { params: { keyword: movieName } })
      if (res.data.success === false) {
        this.$message.error(res.data.message)
      } else {
        this.movie = res.data.content[0]
      }
      this.initLike()
      this.initScheduleList()
    },
    async initLike () {
      var userId = window.sessionStorage.getItem('userId')
      const res = await this.$http.get('/movie/' + this.movie.id + '/' + userId)
      if (res.data.success === false) {
        this.$message.error(res.data.message)
      } else {
        if (res.data.content.islike === 0) {
          this.isLike = false
        } else {
          this.isLike = true
        }
      }
    },
    async initScheduleList () {
      const res = await this.$http.get('/schedule/search/audience', { params: { movieId: this.movie.id } })
      if (res.data.success === false) {
        this.$message.error(res.data.message)
      } else {
        this.scheduleList = res.data.content
      }
    },
    getDate (n) {
      var dateTime = new Date()
      dateTime = dateTime.setDate(dateTime.getDate() + n - 1)
      dateTime = new Date(dateTime)
      return dateTime.toLocaleDateString()
    },
    // getScheduleListByDate (n) {
    //   var res = []
    //   var dateTime = new Date()
    //   dateTime = dateTime.setDate(dateTime.getDate() + n - 1)
    //   dateTime = new Date(dateTime)
    //   for (var i = 0, len = this.scheduleList.length; i < len; i++) {
    //     if (this.scheduleList[i].startTime.getDate() === dateTime.getDate()) {
    //       var schedule = {}
    //       schedule.movieName = this.scheduleList[i].movieName
    //       schedule.hallName = this.scheduleList[i].hallName
    //       schedule.startTime = this.formatTime(this.scheduleList[i].startTime)
    //       schedule.endTime = this.formatTime(this.scheduleList[i].endTime)
    //       schedule.fare = this.scheduleList[i].fare
    //       res.push(schedule)
    //     }
    //   }
    //   return res
    // },
    buyTicket (id) {
      this.$router.push({ path: '/movieBuy', query: { scheduleId: id } })
    },
    formatDate (date) {
      return new Date(date).toLocaleDateString()
    },
    formatTime (date) {
      return new Date(date).toLocaleString()
    },
    formatStartTime (row, column) {
      return this.formatTime(row.startTime)
    },
    formatEndTime (row, column) {
      return this.formatTime(row.endTime)
    },
    async like () {
      this.isLike = true
      var userId = window.sessionStorage.getItem('userId')
      const res = await this.$http.post('/movie/' + this.movie.id + '/like', qs.stringify({
        userId: userId
      }))
      if (res.data.success === false) {
        this.$message.error(res.data.message)
      } else {
        this.$message.success('收藏成功！')
      }
    },
    async unLike () {
      this.isLike = false
      var userId = window.sessionStorage.getItem('userId')
      const res = await this.$http.post('/movie/' + this.movie.id + '/unlike', qs.stringify({
        userId: userId
      }))
      if (res.data.success === false) {
        this.$message.error(res.data.message)
      } else {
        this.$message.success('取消收藏成功！')
      }
    }
  }
}
</script>

<style scoped>
  .btn {
    display: flex;
    justify-self: right;
  }
  .cover {
    width: 220px;
    height: 300px;
  }
  .text{
    margin-bottom: 5px;
  }
  .btn{
    background-color: #07c4a8;
    color: white;
    font-weight: bold;
  }
  .move-enter-active, .move-leave-active {
    transition: all .5s ease;
  }

  .move-enter, .move-leave-active {
    opacity: 0;
  }
</style>
