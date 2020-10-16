<template>
  <div>
    <el-card :body-style="{ padding: '0px' }" style="padding: 15px">
      <h3>会员卡</h3>
      <template v-if="VIP===false">
        <h3>非会员用户</h3>
        <template v-for="card in cardList">
          <el-col :span="12" :key="card.id" style="padding: 10px">
            <el-card :body-style="{ padding: '0px' }">
              <el-row style="display: flex">
                <div class="top" :style="{'background-color':colorList1[card.id%4]}">
                  id:{{card.id}} <br>
                  {{card.name}} <br>
                  <!--                  <template v-if="card.full==0">-->
                  <!--                    <el-tag :style="{'background-color':colorList2[card.id%4]}"-->
                  <!--                            style="border: 0px"-->
                  <!--                            effect="dark">折扣卡-->
                  <!--                    </el-tag>-->
                  <!--                    <br>-->
                  <!--                    {{card.reduce}}折<br>-->
                  <!--                  </template>-->
                  <!--                  <template v-else>-->
                  <el-tag :style="{'background-color':colorList2[card.id%4]}"
                          style="border: 0px"
                          effect="dark">充值卡
                  </el-tag>
                  <br>
                  满{{card.full}}减{{card.reduce}}<br>
                  <!--                  </template>-->
                  <template v-if="card.validTime!=0">
                    有效期{{card.validTime}}个月
                  </template>
                  <template v-else>
                    永久有效
                  </template>
                </div>
              </el-row>
              <el-row style="display: flex">

                <div class="bottom" style="text-align: right" :style="{'background-color':colorList2[card.id%4]}">
                  售价:￥{{card.price}}
                </div>
                <el-button class="btn" @click="buyCard(card.id,card.price)">购买</el-button>
              </el-row>
            </el-card>
          </el-col>
        </template>
      </template>
      <template v-else>
        <h3>会员用户</h3>
        <el-col :span="8">
        <el-card :body-style="{ padding: '0px' }">
          <el-row style="display: flex" >
            <div class="top" :style="{'background-color':colorList1[card.id%4]}">
              会员卡 <br>
              <el-tag :style="{'background-color':colorList2[card.id%4]}"
                      style="border: 0px"
                      effect="dark">充值卡
              </el-tag>
              <br>
              满{{card.full}}减{{card.reduce}}<br>
<!--              <template v-if="card.validTime!=0">-->
<!--                有效期{{card.validTime}}个月-->
<!--              </template>-->
<!--              <template v-else>-->
<!--                永久有效-->
<!--              </template>-->
            </div>
          </el-row>
          <el-row style="display: flex">

            <div class="bottom" style="text-align: right" :style="{'background-color':colorList2[card.id%4]}">
              余额:￥{{card.balance}}
            </div>
            <el-button class="btn" @click="chargeVisable=true">充值</el-button>
          </el-row>
        </el-card>
        </el-col>
      </template>
    </el-card>
    <el-card :body-style="{ padding: '0px' }" style="padding: 15px;margin-top: 15px">
      <h3>优惠券</h3>
      <template v-for="coupon in couponList">
        <el-col :span="8" :key="coupon.id">
          <el-card :body-style="{ padding: '0px' }">
            <div class="coupon">
              <el-row style="font-size: x-large">{{coupon.name}}</el-row>
              <el-row>{{coupon.description}}</el-row>
              <el-row>满{{coupon.targetAmount}}减{{coupon.discountAmount}}</el-row>
            </div>
          </el-card>
        </el-col>
      </template>
    </el-card>
    <el-dialog
      title="支付"
      :visible.sync="dialogVisable"
      width="50%">
      <div>
        <el-form ref="payRef" v-model="bankCardForm">
          <el-form-item label="银行卡号" prop="username">
            <el-input v-model="bankCardForm.username" placeholder="请输入银行卡号"></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="password">
            <el-input v-model="bankCardForm.password" placeholder="请输入密码"></el-input>
          </el-form-item>
        </el-form>
        <div>金额：￥{{amount}}</div>
      </div>
      <span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisable = false">取 消</el-button>
    <el-button type="primary" @click="charge">确 定</el-button>
  </span>
    </el-dialog>
<!--    充值-->
    <el-dialog
      title="会员卡充值"
      :visible.sync="chargeVisable"
      width="50%">
      <div>
        <el-form ref="chargeFormRef" :model="bankCardForm">
          <el-form-item label="金额" prop="amount">
            <el-input placeholder="请输入充值金额" v-model="bankCardForm.amount"></el-input>
          </el-form-item>
          <el-form-item label="银行卡号" prop="username">
            <el-input v-model="bankCardForm.username" placeholder="请输入银行卡号"></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="password">
            <el-input v-model="bankCardForm.password" placeholder="请输入密码" type="password"></el-input>
          </el-form-item>
        </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
    <el-button @click="chargeVisable = false">取 消</el-button>
    <el-button type="primary" @click="charge">确 定</el-button>
  </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data () {
    return {
      chargeVisable: false,
      dialogVisable: false,
      bankCardForm: {
        username: '62166102000****7010',
        password: '',
        amount: ''
      },
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
      couponList: [],
      card: {
        id: ''
      },
      VIP: false,
      cardList: [],
      amount: 0,
      VIPform: {
        vipId: '',
        amount: ''
      }
    }
  },
  created () {
    this.initCoupon()
    this.initVIP()
  },
  methods: {
    async initCoupon () {
      var userId = window.sessionStorage.getItem('userId')
      const res = await this.$http.get('/coupon/' + userId + '/get')
      if (res.data.success === false) {
        this.$message.error(res.data.message)
      } else {
        this.couponList = res.data.content
      }
    },
    async initVIP () {
      var userId = window.sessionStorage.getItem('userId')
      const res = await this.$http.get('/' + userId + '/get')
      if (res.data.success === true) {
        this.VIP = true
        this.getCard()
      } else {
        this.getVIPType()
      }
    },
    async getVIPType () {
      const res = await this.$http.get('/getVIPInfo')
      if (res.data.success === false) {
        this.$message.error(res.data.message)
      } else {
        this.cardList = res.data.content
      }
    },
    async buyCard (id, amount) {
      this.amount = amount
      var userId = window.sessionStorage.getItem('userId')
      const res = await this.$http.get('/add/' + userId + '/' + id)
      if (res.data.success === false) {
        this.$message.error(res.data.message)
      } else {
        this.card.id = res.data.content.id
        this.$message.success('下单成功！')
      }
      this.dialogVisable = true
    },
    async charge () {
      this.dialogVisable = false
      this.chargeVisable = false
      // 第一次购买会员卡
      if (this.VIP === false) {
        this.bankCardForm.amount = this.amount
        this.$refs.payRef.resetFields()
      }
      this.VIPform.amount = this.bankCardForm.amount
      this.VIPform.vipId = this.card.id
      // console.log(this.VIPform)
      const res = await this.$http.post('/charge', this.VIPform)
      if (res.data.success === false) {
        this.$message.error(res.data.message)
      } else {
        this.$message.success('支付成功！')
      }
      this.initVIP()
    },
    async getCard () {
      var userId = window.sessionStorage.getItem('userId')
      const res = await this.$http.get('/' + userId + '/get')
      if (res.data.success === false) {
        this.$message.error(res.data.message)
      } else {
        this.card = res.data.content
      }
    }
  }
}

</script>

<style scoped>
  .coupon {
    background-color: orange;
    color: white;
    height: 100%;
    padding: 10px;
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

  .btn {
    color: white;
    background-color: #07c4a8;
  }
</style>
