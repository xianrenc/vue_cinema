<template>
  <div style="height: 100%">
    <el-row :gutter="20" style="height: 100%">
      <!--    选座区域-->
      <el-col :span="16" style="height: 100%">
        <el-card style="height: 100%">
          <div class="seatContainer">
            <el-row v-for="row in seatList.length" :key="row" type="flex" justify="center">
              <!--              <div v-for="col in 6" :key="col" class="seat">{{seatList[row-1][col-1]}}</div>-->
              <template v-for="col in seatList[0].length">
                <template v-if="seatList[row-1][col-1]===0">
                  <div :key="col" class="seat" style="cursor:pointer" @click="choose(row-1,col-1)"></div>
                </template>
                <template v-else-if="seatList[row-1][col-1]===1">
                  <div :key="col" class="lockSeat"></div>
                </template>
                <template v-else-if="seatList[row-1][col-1]===2">
                  <div :key="col" class="chooseSeat" style="cursor: pointer" @click="cancelSeat(row-1,col-1)"></div>
                </template>
                <template v-else>
                  <div :key="col" class="empty"></div>
                </template>
              </template>
            </el-row>
          </div>
        </el-card>
      </el-col>
      <!--    电影信息-->
      <el-col :span="8" style="height: 100%">
        <el-card style="height: 100%">
          <el-row>
            <el-col :span="8">
              <el-image v-bind:src="movie.posterUrl" class="cover"/>
            </el-col>
            <el-col :span="16" style="padding-left: 10px">
              <el-row style="font-weight: bold;font-size: 25px">
                {{movie.name}}
              </el-row>
              <el-row>
                语言：{{movie.language}}
              </el-row>
              <el-row>
                类型：{{movie.type}}
              </el-row>
              <el-row>
                片长：{{movie.length}}分钟
              </el-row>
              <el-row>
                票价：{{schedule.fare}}元
              </el-row>
            </el-col>
          </el-row>
          <el-row>
            影厅：{{schedule.hallName}}
          </el-row>
          <el-row>
            场次：{{formatDate(schedule.startTime)}} {{formatDate(schedule.endTime)}}场
          </el-row>
          <!--        已选座位-->
          <el-row>
            <el-col :span="3">座位：</el-col>
            <el-col v-for="(seat,index) in chooseSeat" :key="index" :span="4"
            style="margin: 5px">
              <el-tag class="seat-tag" closable @close="cancel(index)">
                {{seat.row+1}}排{{seat.col+1}}座
              </el-tag>
            </el-col>
          </el-row>
          <el-row>
            总价：￥{{schedule.fare*chooseSeat.length}}
          </el-row>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  data () {
    return {
      schedule: {},
      movie: {},
      seatList: [],
      chooseSeat: [],
      ticketFrom: {
        userId: '',
        scheduleId: '',
        seats: ''
      }
    }
  },
  created () {
    this.initSchedule()
  },
  methods: {
    async initSchedule () {
      var id = this.$route.query.scheduleId
      const res = await this.$http.get('/ticket/get/occupiedSeats', { params: { scheduleId: id } })
      if (res.data.success === false) {
        this.$message.error(res.data.message)
      } else {
        this.schedule = res.data.content.scheduleItem
        this.seatList = res.data.content.seats
      }
      var movieName = this.schedule.movieName
      const res2 = await this.$http.get('/movie/search', { params: { keyword: movieName } })
      if (res2.data.success === false) {
        this.$message.error(res2.data.message)
      } else {
        this.movie = res2.data.content[0]
      }
    },
    choose (i, j) {
      var seat = {}
      seat.row = i
      seat.col = j
      this.chooseSeat.push(seat)
      this.seatList[i][j] = 2
    },
    cancel (index) {
      var seat = this.chooseSeat[index]
      var row = seat.row
      var col = seat.col
      this.seatList[row][col] = 0
      this.chooseSeat.splice(index, 1)
    },
    cancelSeat (i, j) {
      this.seatList[i][j] = 0
      for (var index = 0, len = this.chooseSeat.length; index < len; index++) {
        if (this.chooseSeat[index].row === i && this.chooseSeat[index].col === j) {
          this.chooseSeat.splice(index, 1)
        }
      }
    },
    formatDate (date) {
      return new Date(date).toLocaleString()
    }
  }
}
</script>

<style scoped>
  .seat {
    float: left;
    width: 32px;
    height: 32px;
    background-image: url(../../assets/cinema/seatChoose.png);
    background-size: 100%;
    margin: 2px 2px;
  }

  .chooseSeat {
    float: left;
    width: 32px;
    height: 32px;
    background-image: url(../../assets/cinema/seat.png);
    background-size: 100%;
    margin: 2px 2px;
  }

  .lockSeat {
    float: left;
    width: 32px;
    height: 32px;
    background-image: url(../../assets/cinema/seatLock.png);
    background-size: 100%;
    margin: 2px 2px;
  }

  .empty {
    float: left;
    width: 32px;
    height: 32px;
    background-color: white;
    margin: 2px 2px;
  }
  .cover{
    width: 150px;
    height: 200px;
  }
</style>
