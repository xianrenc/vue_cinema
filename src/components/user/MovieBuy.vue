<template>
  <div>
    <el-steps :active="stepAccive" finish-status="success">
      <el-step title="选座">
      </el-step>
      <el-step title="确认订单，支付">
      </el-step>
      <el-step title="支付成功"></el-step>
    </el-steps>
    <div class="movieBuy" style="height: 400px">
      <template v-if="stepAccive===0">
      <el-row :gutter="20" style="height: 100%">
        <!--    选座区域-->
        <el-col :span="16" style="height: 100%">
          <el-card style="height: 100%">
            <div class="seatContainer">
              <el-row v-for="row in seatList.length" :key="row" type="flex" justify="center">
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
                  {{seat.rowIndex+1}}排{{seat.columnIndex+1}}座
                </el-tag>
              </el-col>
            </el-row>
            <el-row>
              总价：￥{{schedule.fare*chooseSeat.length}}
            </el-row>
          </el-card>
        </el-col>
      </el-row>
     </template>
      <template v-else-if="stepAccive===1">
        <el-card style="height: 100%">
          <el-table :data="ticket" >
            <el-table-column label="影片" prop="name"></el-table-column>
            <el-table-column label="场次" prop="time" width="200px"></el-table-column>
            <el-table-column label="座位" prop="seat"></el-table-column>
            <el-table-column label="单价" prop="fare"></el-table-column>
            <el-table-column label="总价" prop="fares"></el-table-column>
          </el-table>
          <el-row>
            优惠券：
            <el-select v-model="coupon" placeholder="请选择优惠券" @change="handleAmount">
              <el-option
                v-for="coupon in couponList"
                :key="coupon.id"
                :label="coupon.name+' 满'+coupon.targetAmount+'减'+coupon.discountAmount"
                :value="coupon.id"
              >
              </el-option>
            </el-select>
          </el-row>
          <el-row>
            <div>实付金额：￥{{amount}}</div>
          </el-row>
        </el-card>
      </template>
      <template v-else>
        <el-card style="height: 100%;display:flex;justify-content:center;align-items:center" >
          <i class="el-icon-success"></i>
        </el-card>
      </template>
    </div>
<!--    按钮区域-->
    <el-row type="flex" justify="center" style="margin-top: 25px">
      <template v-if="stepAccive===0">
        <el-button class="btn" @click="lockSeat">确认下单</el-button>
      </template>
      <template v-else-if="stepAccive===1">
        <el-button class="btn" @click="pay">确认订单，立即支付</el-button>
      </template>
      <template v-else>
        <div>支付成功，至<el-link type="primary" @click="jumpTicket">我的电影票</el-link>页面查看</div>
      </template>
    </el-row>
    <!--    支付对话框-->
    <el-dialog
      title="付款"
      :visible.sync="dialogVisable"
      width="50%">
      <div>
        <el-tabs v-model="activeTab" type="card">
          <el-tab-pane label="银行卡支付" name='card'>
            <el-form v-model="bankCardForm">
              <el-form-item label="银行卡号">
                <el-input v-model="bankCardForm.username" placeholder="请输入银行卡号"></el-input>
              </el-form-item>
              <el-form-item label="密码">
                <el-input v-model="bankCardForm.password" placeholder="请输入密码"></el-input>
              </el-form-item>
            </el-form>
          </el-tab-pane>
          <template v-if="vip===true">
            <el-tab-pane label="会员卡支付" name="vip">
              <div>
                余额：￥{{card.balance}}
              </div>
            </el-tab-pane>
          </template>
        </el-tabs>
      </div>
      <span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisable = false">取 消</el-button>
    <el-button type="primary" @click="finish">确 定</el-button>
  </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data () {
    return {
      amount: '',
      ticket: [{
        name: '',
        time: '',
        seat: '',
        fare: '',
        fares: ''
      }],
      coupon: '',
      couponList: [],
      schedule: {},
      movie: {},
      seatList: [],
      chooseSeat: [],
      ticketFrom: {
        userId: '',
        scheduleId: '',
        seats: ''
      },
      bankCardForm: {
        username: '62166102000****7010',
        password: ''
      },
      activeTab: 'card',
      stepAccive: 0,
      dialogVisable: false,
      buyForm: {
        ticketId: [],
        couponId: ''
      },
      vip: true,
      card: {
        id: '',
        balance: ''
      },
      vipCardForm: {
        vipId: '',
        amount: ''
      }
    }
  },
  created () {
    this.initSchedule()
    this.initVIPCard()
  },
  methods: {
    // 初始化会员卡数据
    async initVIPCard () {
      const userId = window.sessionStorage.getItem('userId')
      const res = await this.$http.get('/' + userId + '/get')
      if (res.data.success === false) {
        this.vip = false
      } else {
        this.card.id = res.data.content.id
        this.card.balance = res.data.content.balance
      }
    },
    async lockSeat () {
      // 调用后端完成锁座操作
      this.stepAccive = 1
      this.ticketFrom.userId = window.sessionStorage.getItem('userId')
      this.ticketFrom.scheduleId = this.schedule.id
      this.ticketFrom.seats = this.chooseSeat
      // console.log(this.ticketFrom)
      const res = await this.$http.post('/ticket/lockSeat', this.ticketFrom)
      if (res.data.success === false) {
        this.$message.error(res.data.message)
      } else {
        this.$message.success('选座成功！')
      }
      //  渲染电影票，生成数组
      this.ticket[0].name = this.movie.name
      this.ticket[0].time = this.formatDate(this.schedule.startTime) + '至' +
        this.formatDate(this.schedule.endTime) + '场'
      this.ticket[0].seat = this.getSeatString(this.chooseSeat)
      this.ticket[0].fare = this.schedule.fare + '元'
      this.ticket[0].fares = this.chooseSeat.length * this.schedule.fare + '元'
      this.amount = this.chooseSeat.length * this.schedule.fare
      //  获取用户的优惠券
      const userId = window.sessionStorage.getItem('userId')
      const coupon = await this.$http.get('/coupon/' + userId + '/get')
      if (coupon.data.success === false) {
        this.$message.error(coupon.data.message)
      } else {
        this.couponList = coupon.data.content
      }
      this.getTicketId()
    },
    handleAmount () {
      var id = this.coupon
      var target = 0
      var discount = 0
      for (var coupon of this.couponList) {
        if (coupon.id === id) {
          target = coupon.targetAmount
          discount = coupon.discountAmount
        }
      }
      var amount = this.amount
      if (amount > target) {
        this.amount = (this.amount - discount >= 0) ? (this.amount - discount) : 0
      }
    },
    async pay () {
      this.dialogVisable = true
      this.buyForm.couponId = this.coupon
      const res = await this.$http.get('/ticket/' + this.amount)
      if (res === false) {
        this.$message.error('支付失败！')
      }
    },
    async finish () {
      this.dialogVisable = false
      var res = ''
      if (this.activeTab === 'card') {
        res = await this.$http.post('/ticket/buy', this.buyForm)
      } else {
        res = await this.$http.post('/ticket/vip/buy', this.buyForm)
      }
      if (res.data.success === false) {
        this.$message.error(res.data.message)
      } else {
        this.$message.success('完成支付，购票成功！')
      }
      this.stepAccive = 3
    },
    async getTicketId () {
      for (var seat of this.chooseSeat) {
        var row = seat.rowIndex
        var col = seat.columnIndex
        const res = await this.$http.get('ticket/' + this.schedule.id + '/' + col + '/' + row)
        if (res.data.success === false) {
          this.$message.error(res.data.message)
        }
        this.buyForm.ticketId.push(res.data.content.id)
      }
    },
    jumpTicket () {
      this.stepAccive = 0
      this.$router.push('/ticket')
    },
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
      seat.rowIndex = i
      seat.columnIndex = j
      this.chooseSeat.push(seat)
      this.seatList[i][j] = 2
    },
    cancel (index) {
      var seat = this.chooseSeat[index]
      var row = seat.rowIndex
      var col = seat.columnIndex
      this.seatList[row][col] = 0
      this.chooseSeat.splice(index, 1)
    },
    cancelSeat (i, j) {
      for (var index = 0, len = this.chooseSeat.length; index < len; index++) {
        if (this.chooseSeat[index].rowIndex === i && this.chooseSeat[index].columnIndex === j) {
          this.cancel(index)
        }
      }
    },
    formatDate (date) {
      return new Date(date).toLocaleString()
    },
    getSeatString (seats) {
      let res = ''
      for (var seat of seats) {
        res += (seat.rowIndex + 1).toString() + '排' + (seat.columnIndex + 1).toString() + '座' + ' '
      }
      return res
    }
  }
}
</script>

<style scoped>
  .btn {
    background-color: #07c4a8;
    color: white;
    font-weight: bold;
  }
  .el-icon-success{
    color: #07c4a8;
    font-size: 300px;
  }
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
