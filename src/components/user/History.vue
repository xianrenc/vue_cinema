<template>
  <div style="height: 100%">
    <el-tabs v-model="activeName" tab-position="left" type="border-card" style="height: 100%">
      <el-tab-pane label="充值历史" name="first">
        <el-table :data="chargeHistory" border stripe style="margin: 0px">
          <el-table-column align="center" label="充值金额" prop="amount"></el-table-column>
          <el-table-column align="center" label="充值日期" prop="chargeTime" :formatter="formatCharge"></el-table-column>
        </el-table>
      </el-tab-pane>
      <el-tab-pane label="消费历史" name="second">
        <el-table :data="spendHistory" border stripe style="margin: 0px">
          <el-table-column align="center" label="电影" prop="movie"></el-table-column>
          <el-table-column align="center" label="消费金额" prop="amount"></el-table-column>
          <el-table-column align="center" label="消费日期" prop="spendTime" :formatter="formatSpend"></el-table-column>
        </el-table>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
export default {
  data () {
    return {
      activeName: 'first',
      chargeHistory: [
        // {
        //   id: 0,
        //   amount: 100,
        //   chargeTime: new Date('2020/09/18').toLocaleDateString()
        // },
        // {
        //   id: 1,
        //   amount: 300,
        //   chargeTime: new Date('2020/09/19').toLocaleDateString()
        // },
        // {
        //   id: 2,
        //   amount: 200,
        //   chargeTime: new Date('2020/09/20').toLocaleDateString()
        // }
      ],
      spendHistory: [
        // {
        //   id: 0,
        //   movie: '信条',
        //   amount: 50,
        //   spendTime: new Date('2020/09/18').toLocaleDateString()
        // },
        // {
        //   id: 1,
        //   movie: '信条',
        //   amount: 100,
        //   spendTime: new Date('2020/09/18').toLocaleDateString()
        // },
        // {
        //   id: 2,
        //   movie: '信条',
        //   amount: 150,
        //   spendTime: new Date('2020/09/19').toLocaleDateString()
        // }
      ]
    }
  },
  created () {
    this.initChargeHistory()
    this.initSpendHistory()
  },
  methods: {
    async initChargeHistory () {
      var userId = window.sessionStorage.getItem('userId')
      const res = await this.$http.get('/user/history/charge/' + userId)
      if (res.data.success === false) {
        this.$message.error(res.data.message)
      } else {
        this.chargeHistory = res.data.content
      }
    },
    async initSpendHistory () {
      var userId = window.sessionStorage.getItem('userId')
      const res = await this.$http.get('/user/history/spend/' + userId)
      if (res.data.success === false) {
        this.$message.error(res.data.message)
      } else {
        this.spendHistory = res.data.content
      }
    },
    formatCharge (row, column) {
      return new Date(row.chargeTime).toLocaleString()
    },
    formatSpend (row, column) {
      return new Date(row.spendTime).toLocaleString()
    }
  }
}
</script>

<style scoped>

</style>
