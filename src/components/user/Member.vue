<template>
  <div>
    <el-card :body-style="{ padding: '0px' }" style="padding: 15px">
      <h2>会员卡</h2>
      <template v-if="VIP===false">
        <h3>非会员用户</h3>
        <template v-for="card in cardList">
          <el-col :span="12" :key="card.id" style="margin-top:10px;padding: 0px;height: 200px;display:flex;justify-content:center;align-items:center">
            <template v-if="card.id%4==0">
              <div class="coupon coupon-red-gradient">
                <div class="coupon-info ">
                  <div class="coupon-store">NJU影院</div>
                  <div style="text-align: center">
                    <div class="coupon-price">{{card.name}}</div>
                    <div class="coupon-description">满{{card.full}}赠{{card.reduce}}</div>
                    <div class="coupon-description">有效期：{{card.validTime}}月</div>
                    <div style="float: right;text-align: right">售价:￥{{card.price}}</div>
                  </div>
                </div>
                <el-button class="btn" @click="buyCard(card.id,card.price)">购买</el-button>
              </div>
            </template>
            <template v-if="card.id%4==1">
              <div class="coupon coupon-blue-gradient">
                <div class="coupon-info ">
                  <div class="coupon-store">NJU影院</div>
                  <div style="text-align: center">
                    <div class="coupon-price">{{card.name}}</div>
                    <div class="coupon-description">满{{card.full}}赠{{card.reduce}}</div>
                    <div class="coupon-description">有效期：{{card.validTime}}月</div>
                    <div style="float: right;text-align: right">售价:￥{{card.price}}</div>
                  </div>
                </div>
                <el-button class="btn" @click="buyCard(card.id,card.price)">购买</el-button>
              </div>
            </template>
            <template v-if="card.id%4==2">
              <div class="coupon coupon-yellow-gradient">
                <div class="coupon-info ">
                  <div class="coupon-store">NJU影院</div>
                  <div style="text-align: center">
                    <div class="coupon-price">{{card.name}}</div>
                    <div class="coupon-description">满{{card.full}}赠{{card.reduce}}</div>
                    <div class="coupon-description">有效期：{{card.validTime}}月</div>
                    <div style="float: right;text-align: right">售价:￥{{card.price}}</div>
                  </div>
                </div>
                <el-button class="btn" @click="buyCard(card.id,card.price)">购买</el-button>
              </div>
            </template>
            <template v-if="card.id%4==3">
              <div class="coupon coupon-green-gradient">
                <div class="coupon-info ">
                  <div class="coupon-store">NJU影院</div>
                  <div style="text-align: center">
                    <div class="coupon-price">{{card.name}}</div>
                    <div class="coupon-description">满{{card.full}}赠{{card.reduce}}</div>
                    <div class="coupon-description">有效期：{{card.validTime}}月</div>
                    <div style="float: right;text-align: right">售价:￥{{card.price}}</div>
                  </div>
                </div>
                <el-button class="btn" @click="buyCard(card.id,card.price)">购买</el-button>
              </div>
            </template>
          </el-col>
        </template>
      </template>
      <template v-else>
        <h3>会员用户</h3>
        <el-col :span="8">
          <el-row style="display: flex" >
            <template v-if="card.id%4==0">
              <div class="coupon coupon-red-gradient">
                <div class="coupon-info ">
                  <div class="coupon-store">NJU影院</div>
                  <div style="text-align: center">
                    <div class="coupon-price">{{card.name}}</div>
                    <div class="coupon-description">满{{card.full}}赠{{card.reduce}}</div>
<!--                    <div class="coupon-description">有效期：{{card.validTime}}月</div>-->
                  </div>
                  <div class="bottom" >
                    <div style="float: left;text-align: left">id:{{card.id}} </div>
                    <div style="float: right;text-align: right">余额:￥{{card.balance}}</div>
                  </div>
                </div>
              </div>
            </template>
            <template v-if="card.id%4==1">
              <div class="coupon coupon-blue-gradient">
                <div class="coupon-info ">
                  <div class="coupon-store">NJU影院</div>
                  <div style="text-align: center">
                    <div class="coupon-price">会员卡</div>
                    <div class="coupon-description">满{{card.full}}赠{{card.reduce}}</div>
<!--                    <div class="coupon-description">有效期：{{card.validTime}}月</div>-->
                  </div>
                  <div class="bottom" >
                    <div style="float: left;text-align: left">id:{{card.id}} </div>
                    <div style="float: right;text-align: right">余额:￥{{card.balance}}</div>
                  </div>
                </div>
              </div>
            </template>
            <template v-if="card.id%4==2">
              <div class="coupon coupon-yellow-gradient">
                <div class="coupon-info ">
                  <div class="coupon-store">NJU影院</div>
                  <div style="text-align: center">
                    <div class="coupon-price">{{card.name}}</div>
                    <div class="coupon-description">满{{card.full}}赠{{card.reduce}}</div>
<!--                    <div class="coupon-description">有效期：{{card.validTime}}月</div>-->
                  </div>
                  <div class="bottom" >
                    <div style="float: left;text-align: left">id:{{card.id}} </div>
                    <div style="float: right;text-align: right">余额:￥{{card.balance}}</div>
                  </div>
                </div>
              </div>
            </template>
            <template v-if="card.id%4==3">
              <div class="coupon coupon-green-gradient">
                <div class="coupon-info ">
                  <div class="coupon-store">NJU影院</div>
                  <div style="text-align: center">
                    <div class="coupon-price">{{card.name}}</div>
                    <div class="coupon-description">满{{card.full}}赠{{card.reduce}}</div>
<!--                    <div class="coupon-description">有效期：{{card.validTime}}月</div>-->
                  </div>
                  <div class="bottom" >
                    <div style="float: left;text-align: left">id:{{card.id}} </div>
                    <div style="float: right;text-align: right">余额:￥{{card.balance}}</div>
                  </div>
                </div>
              </div>
            </template>
          </el-row>
          <el-row>
            <el-button class="btn" @click="chargeVisable=true">充值</el-button>
          </el-row>
        </el-col>
      </template>
    </el-card>
    <el-card :body-style="{ padding: '0px' }" style="padding: 15px;margin-top: 15px">
      <h3>优惠券</h3>
      <template v-for="coupon in couponList">
        <el-col :span="8" :key="coupon.id">
                  <div class="coupon coupon-wave-left coupon-wave-right coupon-yellow-gradient">
                  <div class="coupon-info coupon-info-right-dashed">
                    <div class="coupon-price">&yen;{{coupon.discountAmount}}<span>{{coupon.name}}</span></div>
                    <div class="coupon-description">订单满{{coupon.targetAmount}}元<br/>{{coupon.description}}</div>
                  </div>
                  <div class="coupon-get">
                    <div class="coupon-desc">副券</div>
                    <div class="coupon-expiry-date">{{new Date(coupon.startTime).toLocaleDateString()}}<br/>
                      {{new Date(coupon.endTime).toLocaleDateString()}}</div>
                  </div>
                </div>
        </el-col>
      </template>
<!--      <div class="coupon coupon-wave-left coupon-wave-right coupon-yellow-gradient">-->
<!--        <div class="coupon-info coupon-info-right-dashed">-->
<!--          <div class="coupon-store">{{activity.name}} id:{{activity.coupon.id}}</div>-->
<!--          <div class="coupon-price">&yen;{{activity.coupon.discountAmount}}<span>{{activity.coupon.name}}</span></div>-->
<!--          <div class="coupon-description">订单满{{activity.coupon.targetAmount}}元<br/>{{activity.coupon.description}}</div>-->
<!--        </div>-->
<!--        <div class="coupon-get">-->
<!--          <div class="coupon-desc">副券</div>-->
<!--          <div class="coupon-expiry-date">{{new Date(activity.startTime).toLocaleDateString()}}<br/>-->
<!--            {{new Date(activity.endTime).toLocaleDateString()}}</div>-->
<!--        </div>-->
<!--      </div>-->
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
  /*.coupon {*/
  /*  background-color: orange;*/
  /*  color: white;*/
  /*  height: 100%;*/
  /*  padding: 10px;*/
  /*}*/

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
/*  优惠券*/
  .coupon {
    display: inline-flex;
    color: white;
    width: 100%;
    height: 100%;
    position: relative;
    padding-left: .5rem;
    padding-right: .5rem;
    margin: 1rem;
    /** 弧度得用rem来计数，不能用%号，因为%是用来计数高度和宽度的 */
    border-top-right-radius: .3rem;
    border-bottom-right-radius: .3rem;
    border-top-left-radius: .3rem;
    border-top-right-radius: .3rem;
    overflow: hidden;
  }
  .coupon-yellow {
    background-color: #F39B00;
  }
  .coupon-yellow-gradient {
    background-image: linear-gradient(150deg, #F39B00 50%, #F39B00D8 50%);
  }
  .coupon-red-gradient {
    background-image: linear-gradient(150deg, #D24161 50%, #D24161D8 50%);
  }
  .coupon-green-gradient {
    background-image: linear-gradient(150deg, #7EAB1E 50%, #7EAB1ED8 50%);
  }
  .coupon-blue-gradient {
    background-image: linear-gradient(150deg, #50ADD3 50%, #50ADD3D8 50%);
  }
  /** 左边框波浪 **/
  .coupon-wave-left::before, .coupon-wave-right::after{
    content: '';
    position: absolute;
    top: 0;
    height: 100%;
    width: 14px;
    background-image: radial-gradient(white 0, white 4px, transparent 4px);
    /** 若只设置为r（半径）的两倍(直径)，则半圆之间没有类似堤岸的间隔 */
    background-size: 14px 14px;
    background-position: 0 2px;
    background-repeat: repeat-y;
    z-index: 1;
  }
  .coupon-wave-left::before {
    left: -7px;
  }
  .coupon-wave-right::after {
    right: -7px;
  }
  .coupon-info {
    padding-left: 1rem;
    padding-right: 1rem;
    padding-top: 1rem;
    padding-bottom: 1.5rem;
    position: relative;
    width: 100%;
    min-width: 15rem;
  }
  .coupon-info-right-dashed {
    border-right: 2px dashed white;
  }
  .coupon-info-right-solid {
    border-right: 2px solid white;
  }
  /** 使用两个边框为圆角的白色div制造半圆缺角，有个缺点是这个缺角必须与背景色相同（clip-path不好使用） **/
  .coupon-hole::before, .coupon-hole::after {
    content: '';
    width: 1rem;
    height: 1rem;
    background-color: white;
    border-radius: 50%;
    position: absolute;
    right: -.5rem;
  }
  .coupon-info::before {
    top: -.5rem;
  }
  .coupon-info::after {
    bottom: -.5rem;
  }
  .coupon-info>div {
    margin-bottom: .2rem;
  }
  .coupon-price {
    font-size: 250%;
    font-weight: bold;
  }
  .coupon-price>span {
    font-size: 40%;
    margin-left: .5rem;
    font-weight: normal;
  }
  .coupon-get {
    padding: 1rem;
    /** 这里使用flex是为了让文字居中 */
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    min-width: 5rem;
    position: relative;
  }
  .coupon-get>.coupon-desc {
    font-size: 150%;
    margin-bottom: .5rem;
    font-weight: bold;
  }
  .coupon-get-already::after {
    content: '';
    width: 5rem;
    height: 5rem;
    background-size: 5rem 5rem;
    background-image: url('data:image/png;base64,iVBORw0I=');
    position: absolute;
    top: -1rem;
    right: -1rem;
  }
</style>
