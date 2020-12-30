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
      <el-col :span="12" :key="card.id" style="padding: 0px;height: 240px;display:flex;justify-content:center;align-items:center">
        <template v-if="card.id%4==0">
          <div class="coupon coupon-red-gradient">
            <div class="coupon-info ">
              <div class="coupon-store">NJU影院</div>
              <div style="text-align: center">
                <div class="coupon-price">{{card.name}}</div>
                <div class="coupon-description">满{{card.full}}赠{{card.reduce}}</div>
                <div class="coupon-description">有效期：{{card.validTime}}月</div>
              </div>
              <div class="bottom" >
                <div style="float: left;text-align: left">id:{{card.id}} </div>
                <div style="float: right;text-align: right">售价:￥{{card.price}}</div>
              </div>
            </div>
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
              </div>
              <div class="bottom" >
                <div style="float: left;text-align: left">id:{{card.id}} </div>
                <div style="float: right;text-align: right">售价:￥{{card.price}}</div>
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
                <div class="coupon-description">有效期：{{card.validTime}}月</div>
              </div>
              <div class="bottom" >
                <div style="float: left;text-align: left">id:{{card.id}} </div>
                <div style="float: right;text-align: right">售价:￥{{card.price}}</div>
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
                <div class="coupon-description">有效期：{{card.validTime}}月</div>
              </div>
              <div class="bottom" >
                <div style="float: left;text-align: left">id:{{card.id}} </div>
                <div style="float: right;text-align: right">售价:￥{{card.price}}</div>
              </div>
            </div>
          </div>
        </template>

<!--        <div class="coupon coupon-red-gradient">-->
<!--          <div class="coupon-info ">-->
<!--            <div class="coupon-store">XXXXXX旗舰店</div>-->
<!--            <div class="coupon-price">{{card.name}}<span>优惠券</span></div>-->
<!--            <div class="coupon-description">有效期：{{card.validTime}}月</div>-->
<!--            <div class="bottom" >-->
<!--              <div style="float: left;text-align: left">id:{{card.id}} </div>-->
<!--              <div style="float: right;text-align: right">售价:￥{{card.price}}</div>-->
<!--            </div>-->
<!--          </div>-->
<!--        </div>-->
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
      // colorList1: [
      //   '#00A0E9',
      //   '#DA4E12',
      //   '#73B6C7',
      //   '#FFE636'
      // ],
      // colorList2: [
      //   '#0080E8',
      //   '#DB2901',
      //   '#5975C7',
      //   '#FFCB1D'
      // ],
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
  .coupon {
    display: inline-flex;
    color: white;
    width: 80%;
    height: 80%;
    position: relative;
    padding-left: .5rem;
    padding-right: .5rem;
    margin: 1rem;
    /** 弧度得用rem来计数，不能用%号，因为%是用来计数高度和宽度的 */
    border-top-right-radius: .3rem;
    border-bottom-right-radius: .3rem;
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
