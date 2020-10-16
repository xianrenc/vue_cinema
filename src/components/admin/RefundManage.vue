<template>
<div>
  <el-row style="margin-bottom: 8px" >
    <el-col :span="20">
      <h3 style="margin: 5px 0px">票务管理</h3>
    </el-col>
    <el-col :span="4" style="text-align: right">
      <el-button class="btn" icon="el-icon-edit" @click="dialogVisable=true">修改退票策略</el-button>
    </el-col>
  </el-row>
  <el-card>
    <el-row style="margin-bottom: 10px">退还比例：{{percentage}} %</el-row>
    <el-row>有效时间：{{validTime}} 分钟</el-row>
  </el-card>
<!--  修改退票策略对话框-->
  <el-dialog
  title="修改退票策略"
  :visible.sync="dialogVisable"
  width="40%">
    <el-form v-model="refundForm" label-width="80px">
      <el-form-item label="退还比例">
        <el-input v-model="refundForm.discount" placeholder="请输入退还百分比"></el-input>
      </el-form-item>
      <el-form-item label="有效时间">
        <el-input v-model="refundForm.beforeMinutes" placeholder="请输入退票时距离开场的最短时间"></el-input>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisable = false">取 消</el-button>
    <el-button type="primary" @click="modifyRefund">确 定</el-button>
  </span>
  </el-dialog>
</div>
</template>

<script>
export default {
  data () {
    return {
      dialogVisable: false,
      refundForm: {
        discount: '',
        beforeMinutes: ''
      },
      percentage: '',
      validTime: ''
    }
  },
  created () {
    this.initRefund()
  },
  methods: {
    async modifyRefund () {
      this.dialogVisable = false
      const res = await this.$http.post('/refund/strategy', this.refundForm)
      if (res.data.success === false) {
        this.$message.error(res.data.message)
      } else {
        this.$message.success('修改退票策略成功！')
        this.initRefund()
      }
    },
    async initRefund () {
      const res = await this.$http.get('/refund/get')
      if (res.data.success === false) {
        this.$message.error(res.data.message)
      } else {
        // console.log(res.data.content)
        this.percentage = res.data.content.discount
        this.validTime = res.data.content.beforeMinutes
        this.refundForm.discount = res.data.content.discount
        this.refundForm.beforeMinutes = res.data.content.beforeMinutes
      }
    }
  }
}
</script>

<style scoped>
  .btn{
    color: white;
    background-color: #07c4a8;
  }
</style>
