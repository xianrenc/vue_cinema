<template>
  <div>
    <el-row style="margin-bottom: 10px">
      <el-col :span="18">
        <h3 style="margin: 5px 0px">会员卡管理</h3>
      </el-col>
      <el-col :span="3" style="text-align: right">
        <el-button class="btn"  icon="el-icon-edit" @click="modifyVisable=true">修改会员卡</el-button>
      </el-col>
      <el-col :span="3" style="text-align: right">
        <el-button class="btn" icon="el-icon-circle-plus" @click="dialogVisable=true">发布会员卡</el-button>
      </el-col>
    </el-row>

    <template v-for="card in cardList">
      <el-col :span="12" :key="card.id" style="padding: 10px">
        <el-card :body-style="{ padding: '0px' }">
          <el-row style="display: flex">
            <div class="top" :style="{'background-color':colorList1[card.id%4]}">
              id:{{card.id}} <br>
              {{card.name}} <br>
              <template v-if="card.full==0">
                <el-tag :style="{'background-color':colorList2[card.id%4]}"
                        style="border: 0px"
                        effect="dark">折扣卡
                </el-tag>
                <br>
                {{card.reduce}}折<br>
              </template>
              <template v-else>
                <el-tag :style="{'background-color':colorList2[card.id%4]}"
                        style="border: 0px"
                        effect="dark">充值卡
                </el-tag>
                <br>
                满{{card.full}}减{{card.reduce}}<br>
              </template>
              <template v-if="card.validTime!=0">
                有效期{{card.validTime}}个月
              </template>
              <template v-else>
                永久有效
              </template>
            </div>
          </el-row>
          <el-row style="display: flex">
            <!--          <template v-if="card.full==0">-->
            <!--            <div>-->
            <!--              不可储值不可退换-->
            <!--            </div>-->
            <!--          </template>-->

            <div class="bottom" style="text-align: right" :style="{'background-color':colorList2[card.id%4]}">
              售价:￥{{card.price}}
            </div>
          </el-row>
        </el-card>
      </el-col>
    </template>
    <!--    发布会员卡对话框-->
    <el-dialog
      title="发布会员卡"
      :visible.sync="dialogVisable"
      width="40%">
      <el-form v-model="cardForm" label-width="80px">
        <el-form-item label="名称">
          <el-input v-model="cardForm.name" placeholder="请输入会员卡名称"></el-input>
        </el-form-item>
        <el-form-item label="价格">
          <el-input v-model="cardForm.price" placeholder="请输入会员卡价格"></el-input>
        </el-form-item>
        <el-form-item label="满">
          <el-input v-model="cardForm.full" placeholder="请输入可获得优惠的最低金额"></el-input>
        </el-form-item>
        <el-form-item label="减">
          <el-input v-model="cardForm.reduce" placeholder="请输入优惠金额"></el-input>
        </el-form-item>
        <el-form-item label="有效天数">
          <el-input v-model="cardForm.validTime" placeholder="请输入有效时间（单位：月），0表示为永久有效"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisable = false">取 消</el-button>
          <el-button type="primary" @click="publish">确 定</el-button>
      </span>
    </el-dialog>
<!--    修改会员卡对话框-->
    <el-dialog
      title="修改会员卡"
      :visible.sync="modifyVisable"
      width="40%">
      <el-form v-model="cardForm" label-width="80px">
        <el-form-item label="id">
          <el-input v-model="cardForm.id" placeholder="请输入会员卡序号"></el-input>
        </el-form-item>
        <el-form-item label="名称">
          <el-input v-model="cardForm.name" placeholder="请输入会员卡名称"></el-input>
        </el-form-item>
        <el-form-item label="价格">
          <el-input v-model="cardForm.price" placeholder="请输入会员卡价格"></el-input>
        </el-form-item>
        <el-form-item label="满">
          <el-input v-model="cardForm.full" placeholder="请输入可获得优惠的最低金额"></el-input>
        </el-form-item>
        <el-form-item label="减">
          <el-input v-model="cardForm.reduce" placeholder="请输入优惠金额"></el-input>
        </el-form-item>
        <el-form-item label="有效时间">
          <el-input v-model="cardForm.validTime" placeholder="请输入有效时间（单位：月），0表示为永久有效"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
          <el-button @click="modifyVisable = false">取 消</el-button>
          <el-button type="primary" @click="modify">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data () {
    return {
      colorList1: [
        '#4169e1',
        '#48d1cc',
        '#a9a9aa',
        '#ffd700'
      ],
      colorList2: [
        '#00008b',
        '#008b8b',
        '#808080',
        '#daa520'
      ],
      modifyVisable: false,
      dialogVisable: false,
      cardForm: {
        id: '',
        name: '',
        price: '',
        full: '',
        reduce: '',
        validTime: ''
      },
      cardList: []
    }
  },
  created () {
    this.getVIPType()
  },
  methods: {
    async publish () {
      this.dialogVisable = false
      const res = await this.$http.post('/card/add', this.cardForm)
      if (res.data.success === false) {
        this.$message.error(res.data.message)
      } else {
        this.$message.success('发布会员卡成功！')
      }
      this.getVIPType()
    },
    async modify () {
      this.modifyVisable = false
      const res = await this.$http.post('/card/update', this.cardForm)
      if (res.data.success === false) {
        this.$message.error(res.data.message)
      } else {
        this.$message.success('修改会员卡成功！')
      }
      this.getVIPType()
    },
    async getVIPType () {
      const res = await this.$http.get('/getVIPInfo')
      if (res.data.success === false) {
        this.$message.error(res.data.message)
      } else {
        this.cardList = res.data.content
      }
    }
  }
}
</script>

<style scoped>
  .btn {
    color: white;
    background-color: #07c4a8;
  }

  .top {
    color: white;
    width: 100%;
    padding: 10px;
  }

  .bottom {
    color: white;
    width: 100%;
    padding: 10px;
  }
</style>
