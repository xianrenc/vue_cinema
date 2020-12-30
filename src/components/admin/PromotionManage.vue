<template>
  <div>
    <el-row style="margin-bottom: 10px">
      <el-col :span="19">
        <h3 style="margin: 5px 0px">活动管理</h3>
      </el-col>
      <el-col :span="3" style="padding-right: 10px;text-align: right">
        <el-button class="btn" icon="el-icon-circle-plus" @click="publishActivity=true">发布活动</el-button>
      </el-col>
      <el-col :span="2">
        <el-button class="btn" @click="giveCoupon=true">赠送优惠券</el-button>
      </el-col>
    </el-row>
    <template v-for="activity in ActivityList">
      <el-card :body-style="{ padding: '0px' }" :key="activity.id" class="activity_card">
        <el-row type="flex">
          <el-col :span="15">
            <div class="activity" style="line-height: 40px">
              <span style="font-size: large;font-weight: bolder;margin-bottom: 5%">{{activity.name}}</span><br>
              <span style="margin-bottom: 5px">{{activity.description}}</span><br>
              活动时间：{{new Date(activity.startTime).toLocaleDateString()}}至
              {{new Date(activity.endTime).toLocaleDateString()}}<br>
              参与电影：
              <div :key="movie.id" style="display: inline;margin-left: 5px;" v-for="movie in activity.movieList">
                {{movie.name}}
              </div>
            </div>
          </el-col>
          <el-col :span="9">
<!--            <div class="coupon">-->
<!--              <el-row style="font-size: x-large">{{activity.coupon.name}}</el-row>-->
<!--              <el-row>ID:{{activity.coupon.id}}</el-row>-->
<!--              <el-row>{{activity.coupon.description}}</el-row>-->
<!--              <el-row>满{{activity.coupon.targetAmount}}减{{activity.coupon.discountAmount}}</el-row>-->
<!--            </div>-->
            <div class="coupon coupon-wave-left coupon-wave-right coupon-yellow-gradient">
              <div class="coupon-info coupon-info-right-dashed">
                <div class="coupon-store">{{activity.name}} id:{{activity.coupon.id}}</div>
                <div class="coupon-price">&yen;{{activity.coupon.discountAmount}}<span>{{activity.coupon.name}}</span></div>
                <div class="coupon-description">订单满{{activity.coupon.targetAmount}}元<br/>{{activity.coupon.description}}</div>
              </div>
              <div class="coupon-get">
                <div class="coupon-desc">副券</div>
                <div class="coupon-expiry-date">{{new Date(activity.startTime).toLocaleDateString()}}<br/>
                  {{new Date(activity.endTime).toLocaleDateString()}}</div>
              </div>
            </div>
          </el-col>
        </el-row>
      </el-card>
    </template>

<!--    发布活动对话框-->
    <el-dialog
      :visible.sync="publishActivity"
      title="发布活动"
      width="40%">
      <div>
        <el-form :model="ActivityForm" ref="ActivityRef" label-width="80px">
          <el-form-item label="活动名称">
            <el-input v-model="ActivityForm.name" placeholder="请输入活动名称"></el-input>
          </el-form-item>
          <el-form-item label="活动描述">
            <el-input v-model="ActivityForm.description" placeholder="请输入活动描述"></el-input>
          </el-form-item>
          <el-form-item label="开始日期">
            <el-date-picker
              v-model="ActivityForm.startTime"
              type="date"
              style="width: 100%"
              placeholder="请选择活动开始日期">
            </el-date-picker>
          </el-form-item>
          <el-form-item label="结束日期">
            <el-date-picker
              v-model="ActivityForm.endTime"
              type="date"
              style="width: 100%"
              placeholder="请选择活动结束日期">
            </el-date-picker>
          </el-form-item>
          <el-form-item label="奖券名称">
            <el-input v-model="ActivityForm.couponForm.name" placeholder="请输入奖券名称"></el-input>
          </el-form-item>
          <el-form-item label="奖券描述">
            <el-input v-model="ActivityForm.couponForm.description" placeholder="请输入奖券描述"></el-input>
          </el-form-item>
          <el-form-item label="需要金额">
            <el-input v-model="ActivityForm.couponForm.targetAmount" placeholder="请输入活动所需金额"></el-input>
          </el-form-item>
          <el-form-item label="优惠金额">
            <el-input v-model="ActivityForm.couponForm.discountAmount" placeholder="请输入优惠金额"></el-input>
          </el-form-item>
          <el-form-item label="参与电影">
<!--            <el-input v-model="ActivityForm.name" placeholder="请选择参与活动的电影"></el-input>-->
            <el-select v-model="ActivityForm.movieList" multiple placeholder="请选择参与活动的电影" style="width: 100%">
              <el-option
                v-for="item in movieList"
                :key="item.id"
                :label="item.name"
                :value="item.id">
              </el-option>
            </el-select>
          </el-form-item>
        </el-form>
      </div>
      <span class="dialog-footer" slot="footer">
        <el-button @click="publishActivity = false">取 消</el-button>
        <el-button @click="addActivity" type="primary">确 定</el-button>
      </span>
    </el-dialog>
    <!--    赠送优惠券对话框-->
    <el-dialog
      :visible.sync="giveCoupon"
      title="赠送优惠券"
      width="40%">
      <div>
        <el-form :model="CouponForm" ref="CouponRef" label-width="90px">
          <el-form-item label="赠送对象">
            <el-input v-model="CouponForm.username" placeholder="请输入赠送用户名或ID"></el-input>
          </el-form-item>
          <el-form-item label="优惠券序号">
            <el-input v-model="CouponForm.coupon" placeholder="请输入优惠券ID"></el-input>
          </el-form-item>
        </el-form>
      </div>
      <span class="dialog-footer" slot="footer">
        <el-button @click="giveCoupon = false">取 消</el-button>
        <el-button @click="addCoupon" type="primary">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data () {
    return {
      movieList: [],
      publishActivity: false,
      giveCoupon: false,
      CouponForm: {
        username: '',
        coupon: ''
      },
      ActivityForm: {
        name: '',
        description: '',
        startTime: '',
        endTime: '',
        movieList: [],
        couponForm: {
          name: '',
          description: '',
          targetAmount: '',
          discountAmount: '',
          startTime: '',
          endTime: ''
        }
      },
      ActivityList: []
    }
  },
  created () {
    this.getMovieList()
    this.getActivity()
  },
  methods: {
    async addActivity () {
      this.publishActivity = false
      // console.log(this.ActivityForm)
      this.ActivityForm.couponForm.startTime = this.ActivityForm.startTime
      this.ActivityForm.couponForm.endTime = this.ActivityForm.endTime
      const res = await this.$http.post('/activity/publish', this.ActivityForm)
      if (res.data.success === false) {
        this.$message.error(res.data.message)
      } else {
        this.$message.success('发布活动成功!')
        this.getActivity()
      }
      this.$refs.ActivityRef.resetFields()
    },
    async addCoupon () {
      this.giveCoupon = false
      const res = await this.$http.get('/admin/promotion/coupon/present/' + this.CouponForm.username + '/' + this.CouponForm.coupon)
      if (res.data.success === false) {
        this.$message.error(res.data.message)
      } else {
        this.$message.success('赠送优惠券成功!')
      }
    },
    async getMovieList () {
      const res = await this.$http.get('/movie/all')
      if (res.data.success === false) {
        this.$message.error(res.data.message)
      } else {
        // console.log(res.data.content)
        this.movieList = res.data.content
      }
    },
    async getActivity () {
      const res = await this.$http.get('/activity/get')
      if (res.data.success === false) {
        this.$message.error(res.data.message)
      } else {
        this.ActivityList = res.data.content
      }
    }
  }
}
</script>

<style scoped>
  .activity_card {
    margin-bottom: 25px;

  }

  /*.coupon {*/
  /*  !*display: flex;*!*/
  /*  !*justify-content: center;*!*/
  /*  !*align-items: center;*!*/
  /*  background-color: orange;*/
  /*  color: white;*/
  /*  height: 100%;*/
  /*  padding: 10px;*/
  /*}*/

  .activity {
    padding: 10px;
  }

  .btn {
    color: white;
    background-color: #07c4a8;
  }
  /*优惠券格式*/
  .coupon {
    display: inline-flex;
    color: white;
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
