<template>
  <div>
    <template v-for="(ticket,index) in ticketList">
      <el-card :key="index" :body-style="{ padding: '0px' }" style="margin-bottom: 25px;padding: 10px">
        <el-row :gutter="20" style="height: 180px">
          <el-col :span="3" class="text">
            <el-image v-bind:src="ticket.posterUrl" class="cover"/>
          </el-col>
          <el-col :span="10" style="height: 100%">
            <span>{{ticket.moviename}}<br></span>
            <span>{{ticket.hallname}}<br></span>
            <span>{{ticket.rowIndex+1}}排{{ticket.columnIndex+1}}座<br></span>
            <span>{{formatTime(ticket.startTime)}} {{formatTime(ticket.endTime)}}场</span>
          </el-col>
          <el-col :span="3" style="height: 100%">
            <div style="width: 100%;height: 100%;" class="center">
              ￥{{ticket.fare}}
            </div>
          </el-col>
          <el-col :span="6" style="height: 100%">
            <div style="height: 100%">
              <span>{{ticket.state}}</span><br>
              购买时间：{{formatTime(ticket.time)}}
            </div>
          </el-col>
          <el-col :span="2" style="height: 100%">
            <div class="center" style="height: 100%">
            <template v-if="ticket.state=== '已失效'">
              <el-button type="primary" icon="el-icon-delete" @click="refund(ticket.id)" disabled>退票</el-button>
            </template>
            <template v-else>
              <el-button type="primary" icon="el-icon-delete" @click="refund(ticket.id)">退票</el-button>
            </template>
            </div>
          </el-col>
        </el-row>
      </el-card>
    </template>
  </div>
</template>

<script>
export default {
  data () {
    return {
      ticketList: []
    }
  },
  created () {
    this.initTicket()
  },
  methods: {
    async refund (ticketId) {
      const res = await this.$http.get('/ticket/refund/' + ticketId)
      if (res.data.success === false) {
        this.$message.error(res.data.message)
      } else {
        this.$message.success('退票成功！')
        this.initTicket()
      }
    },
    async initTicket () {
      var userId = window.sessionStorage.getItem('userId')
      const res = await this.$http.get('/ticket/get/' + userId)
      if (res.data.success === false) {
        this.$message.error(res.data.message)
      } else {
        this.ticketList = res.data.content
      }
    },
    formatTime (date) {
      return new Date(date).toLocaleString()
    }
  }
}
</script>

<style scoped>
  .center {
    display: flex;
    justify-content: center;
    align-items: center
  }
  .cover {
    width: 150px;
    height: 180px;
  }
</style>
