<template>
  <div>
    <h3 style="margin: 5px 0px">排片管理</h3>
    <el-card class="header">
      <el-row>
        <el-col :span="8">
          <el-select v-model="hallId" placeholder="选择影厅" @change="getScheduleList">
            <el-option
              v-for="item in hallList"
              :key="item.id"
              :label="item.name"
              :value="item.id">
            </el-option>
          </el-select>
        </el-col>
        <el-col :span="14">
          <el-date-picker
            v-model="day"
            align="left"
            type="date"
            placeholder="选择日期"
            :picker-options="pickerOptions"
            @change="getScheduleList"
          >
          </el-date-picker>
        </el-col>
        <el-col :span="2">
          <el-button class="btn" @click="addDialogVisible=true">新增排片</el-button>
        </el-col>
      </el-row>
    </el-card>
    <el-card class="schedule">
      <el-row>
        <el-col :span="3">
          <div style="height: 20px"></div>
          <div v-for="n in 4" :key="n" class="timeBlock">
            <span v-if="(n-1)*6<10">
              0{{(n-1)*6}}:00
            </span>
            <span v-else>
              {{(n-1)*6}}:00
            </span>
            <div v-if="n==4" style="position: absolute;bottom: 0;left: 50%;transform: translateX(-50%)" >
              {{n*6}}:00
            </div>
          </div>
        </el-col>
        <el-col :span="3" v-for="(item,index) in scheduleList" :key="index" style="text-align: center">
          <div style="height: 20px">
<!--            {{day.getFullYear()}}-{{day.getMonth()+1}}-{{day.getDate()+n-1}}-->
            {{formatDay(item.date)}}
          </div>
          <div class="scheduleContainer">
            <template v-for="schedule in item.scheduleItemList">
                <el-button :key="schedule.id" class="scheduleItem" @click="chooseSchedule(schedule.id)"
                     :style="{'height':schedule.length*40+'px','top':schedule.position*40+20+'px'}">
                  <div class="scheduleText">
                    电影：{{schedule.movieName}}<br>
                    票价：{{schedule.fare}} 元<br>
                    {{formatDate(schedule.startTime)}}<br>
                    {{formatDate(schedule.endTime)}}<br>
                  </div>
                </el-button>
            </template>
          </div>
        </el-col>
      </el-row>
    </el-card>
<!--    修改排片对话框-->
    <el-dialog
      title="修改排片"
      :visible.sync="modifyDialogVisible"
      width="40%"
      @close="modifyDialogVisible=false">
      <el-form :model="scheduleForm" ref="modifyFormRef" label-width="100px">
        <el-form-item label="电影名称">
          <el-select v-model="scheduleForm.movieId" placeholder="请选择电影" style="width: 100%">
            <el-option
              v-for="item in movieList"
              :key="item.id"
              :label="item.name"
              :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="放映影厅" >
          <el-select v-model="scheduleForm.hallId" placeholder="请选择影厅" style="width: 100%">
            <el-option
              v-for="item in hallList"
              :key="item.id"
              :label="item.name"
              :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="开始时间">
          <el-date-picker
            v-model="scheduleForm.startTime"
            type="datetime"
            style="width: 100%"
            placeholder="选择开始时间"
            default-time="12:00:00">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="结束时间">
          <el-date-picker
            v-model="scheduleForm.endTime"
            type="datetime"
            style="width: 100%"
            placeholder="选择结束时间"
            default-time="12:00:00">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="场次票价">
          <el-input v-model="scheduleForm.fare" placeholder="请输入场次票价"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="deleteSchedule" type="danger">删除</el-button>
        <el-button @click="modifyDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="editSchedule">确 定</el-button>
  </span>
    </el-dialog>
<!--    添加排片对话框-->
    <el-dialog
      title="新增排片"
      :visible.sync="addDialogVisible"
      width="40%"
      @close="addDialogCLosed"
    >
      <el-form :model="scheduleForm" ref="addFormRef" label-width="100px">
        <el-form-item label="电影名称">
          <el-select v-model="scheduleForm.movieId" placeholder="请选择电影" style="width: 100%">
            <el-option
              v-for="item in movieList"
              :key="item.id"
              :label="item.name"
              :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="放映影厅" >
          <el-select v-model="scheduleForm.hallId" placeholder="请选择影厅" style="width: 100%">
            <el-option
              v-for="item in hallList"
              :key="item.id"
              :label="item.name"
              :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="开始时间">
          <el-date-picker
            v-model="scheduleForm.startTime"
            type="datetime"
            style="width: 100%"
            placeholder="选择开始时间"
            default-time="12:00:00">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="结束时间">
          <el-date-picker
            v-model="scheduleForm.endTime"
            type="datetime"
            style="width: 100%"
            placeholder="选择结束时间"
            default-time="12:00:00">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="场次票价">
          <el-input v-model="scheduleForm.fare" placeholder="请输入场次票价"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
    <el-button @click="addDialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="addSchedule">确 定</el-button>
  </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data () {
    return {
      modifyDialogVisible: false,
      addDialogVisible: false,
      movieList: [],
      hallList: [],
      hallId: 3,
      pickerOptions: {
        // disabledDate (time) {
        //   return time.getTime() > Date.now()
        // },
        shortcuts: [{
          text: '今天',
          onClick (picker) {
            picker.$emit('pick', new Date())
          }
        }, {
          text: '昨天',
          onClick (picker) {
            const date = new Date()
            date.setTime(date.getTime() - 3600 * 1000 * 24)
            picker.$emit('pick', date)
          }
        }, {
          text: '一周前',
          onClick (picker) {
            const date = new Date()
            date.setTime(date.getTime() - 3600 * 1000 * 24 * 7)
            picker.$emit('pick', date)
          }
        }]
      },
      day: new Date(),
      scheduleForm: {
        id: '',
        movieId: '',
        hallId: '',
        startTime: '',
        endTime: '',
        fare: ''
      },
      deleteForm: {
        scheduleIdList: []
      },
      scheduleList: []
    }
  },
  created () {
    this.initList()
  },
  methods: {
    async chooseSchedule (id) {
      const res = await this.$http.get('/schedule/' + id)
      if (res.data.success === false) {
        this.$message.error(res.data.message)
      } else {
        const tmp = res.data.content
        this.scheduleForm.id = tmp.id
        this.scheduleForm.movieId = tmp.movieId
        this.scheduleForm.hallId = tmp.hallId
        this.scheduleForm.startTime = tmp.startTime
        this.scheduleForm.endTime = tmp.endTime
        this.scheduleForm.fare = tmp.fare
      }
      this.modifyDialogVisible = true
    },
    async editSchedule () {
      this.modifyDialogVisible = false
      const res = await this.$http.post('/schedule/update', this.scheduleForm)
      if (res.data.success === false) {
        this.$message.error(res.data.message)
      } else {
        this.$message.success('修改排片信息成功！')
        this.getScheduleList()
      }
    },
    async deleteSchedule () {
      this.deleteForm.scheduleIdList.push(this.scheduleForm.id)
      this.modifyDialogVisible = false
      const res = await this.$http.post('/schedule/delete/batch', this.deleteForm)
      if (res.data.success === false) {
        this.$message.error(res.data.message)
      } else {
        this.$message.success('删除排片信息成功！')
        this.getScheduleList()
      }
    },
    async addSchedule () {
      this.addDialogVisible = false
      const res = await this.$http.post('/schedule/add', this.scheduleForm)
      if (res.data.success === false) {
        this.$message.error(res.data.message)
      } else {
        this.$message.success('上架影片成功！')
        this.getScheduleList()
      }
      this.$refs.addFormRef.resetFields()
    },
    addDialogCLosed () {
      this.$refs.addFormRef.resetFields()
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
    async getHallList () {
      const res = await this.$http.get('/hall/all')
      if (res.data.success === false) {
        this.$message.error(res.data.message)
      } else {
        this.hallList = res.data.content
      }
    },
    async getScheduleList () {
      const res = await this.$http.get('/schedule/search',
        { params: { hallId: this.hallId, startDate: this.day.toDateString() } })
      if (res.data.success === false) {
        this.$message.error(res.data.message)
      } else {
        // console.log(res.data.content)
        this.scheduleList = res.data.content
      }
    },
    initList () {
      this.getHallList()
      this.getMovieList()
      this.getScheduleList()
    },
    formatDate (date) {
      return new Date(date).toLocaleTimeString()
    },
    formatDay (date) {
      return new Date(date).toLocaleDateString()
    }
  }
}
</script>

<style scoped>
  .header {
    margin-bottom: 25px;
  }

  .btn {
    display: flex;
    justify-content: flex-end;
    margin-right: 25px;
    background-color: #07c4a8;
    color: white;
  }

  .timeBlock {
    position: relative;
    text-align: center;
    height: 240px;
  }

  .scheduleContainer {
    height: 960px;
    border-left: 2px solid grey;
  }

  .scheduleItem {
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    width: 140px;
    background-color: #00d1b2;
    color: white;
    margin: 5px;
    padding-left: 5px;
    padding-right: 5px;
    padding-bottom: 5px;
    padding-top: 5px;
    border-radius: 13px;
  }

  .scheduleText {
    text-align: center;
  }
</style>
