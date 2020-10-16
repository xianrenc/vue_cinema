<template>
  <div class="container">
    <el-row>
      <h3>常规设置</h3>
    </el-row>
    <el-row>
      <el-card class="card">
        <el-row>
          <el-col :span="3">
            <div class="text">用户可见排片日期:</div>
          </el-col>
          <el-col :span="1">
            <div class="text">{{dayNum}}</div>
          </el-col>
          <el-col :span="2">
            <el-button class="btn" size="small" @click="viewVisable=true">修改</el-button>
          </el-col>
        </el-row>
      </el-card>
    </el-row>
    <el-row style="margin-bottom: 10px;margin-top: 10px">
      <el-col :span="21">
        <h3 style="margin: 5px 0px">影院管理</h3>
      </el-col>
      <el-col :span="3" style="text-align: right">
        <el-button class="addbtn" icon="el-icon-circle-plus" @click="addHallVisable=true">新增影厅</el-button>
      </el-col>
    </el-row>
    <el-row>
      <template v-for="hall in hallList">
        <el-col :span="24" :index="hall.id" :key="hall.id">
        <el-card class="hall">
          <el-row>
            <el-col :span="2">
              <div class="text" style="font-size: large">{{hall.name}}</div>
            </el-col>
            <el-col :span="1">
              <div class="text">{{hall.row}} 排</div>
            </el-col>
            <el-col :span="1">
              <div class="text">{{hall.col}} 列</div>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="23">
            <el-row v-for="row in hall.row" :key="row">
              <div v-for="col in hall.col" :key="col" class="seat"></div>
            </el-row>
            </el-col>
            <el-col :span="1">
            <el-button icon="el-icon-edit" type="primary" @click="chooseHall(hall)"></el-button>
            </el-col>
          </el-row>
        </el-card>
        </el-col>
      </template>
    </el-row>
    <!--    修改可见排片日期的对话框-->
    <el-dialog
      title="修改可见排片日期"
      :visible.sync="viewVisable"
      width="40%"
    >
      <el-form v-model="viewForm" label-width="80px">
        <el-form-item label="天数">
          <el-input v-model="viewForm.day" placeholder="请输入可见排片日期"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
    <el-button @click="viewVisable = false">取 消</el-button>
    <el-button type="primary" @click="resetView">确 定</el-button>
  </span>
    </el-dialog>
    <!--    新增影厅对话框-->
    <el-dialog
      title="添加影厅"
      :visible.sync="addHallVisable"
      width="40%">
      <el-form v-model="hallForm" label-width="80px">
        <el-form-item label="影厅名称">
          <el-input v-model="hallForm.name" placeholder="请输入影厅名称"></el-input>
        </el-form-item>
        <el-form-item label="行数">
          <el-input v-model="hallForm.row" placeholder="请输入影厅行数"></el-input>
        </el-form-item>
        <el-form-item label="列数">
          <el-input v-model="hallForm.col" placeholder="请输入影厅列数"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
    <el-button @click="addHallVisable = false">取 消</el-button>
    <el-button type="primary" @click="addHall">确 定</el-button>
  </span>
    </el-dialog>
<!--    修改影厅对话框-->
    <el-dialog
      title="修改影厅"
      :visible.sync="editHallVisable"
      width="40%">
      <el-form v-model="editForm" label-width="80px">
        <el-form-item label="影厅名称">
          <el-input v-model="editForm.name" placeholder="请输入影厅名称"></el-input>
        </el-form-item>
        <el-form-item label="行数">
          <el-input v-model="editForm.row" placeholder="请输入影厅行数"></el-input>
        </el-form-item>
        <el-form-item label="列数">
          <el-input v-model="editForm.col" placeholder="请输入影厅列数"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
    <el-button @click="editHallVisable = false">取 消</el-button>
    <el-button type="primary" @click="editHall">确 定</el-button>
  </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data () {
    return {
      viewVisable: false,
      addHallVisable: false,
      editHallVisable: false,
      dayNum: '',
      viewForm: {
        day: ''
      },
      hallForm: {
        id: '',
        name: '',
        row: '',
        col: ''
      },
      editForm: {
        id: '',
        name: '',
        row: '',
        col: ''
      },
      hallList: [
      ]
    }
  },
  created () {
    this.getHallList()
    this.getView()
  },
  methods: {
    async getView () {
      const res = await this.$http.get('/schedule/view')
      if (res.data.success === false) {
        this.$message.error(res.data.message)
      } else {
        this.dayNum = res.data.content
      }
    },
    async getHallList () {
      const res = await this.$http.get('/hall/all')
      if (res.data.success === false) {
        this.$message.error(res.data.message)
      } else {
        // console.log(res.data.content)
        this.hallList = res.data.content
      }
    },
    async resetView () {
      this.viewVisable = false
      const res = await this.$http.post('/schedule/view/set', this.viewForm)
      if (res.data.success === false) {
        this.$message.error(res.data.message)
      } else {
        this.$message.success('修改可见排片天数成功!')
        this.getView()
      }
    },
    async addHall () {
      this.addHallVisable = false
      const res = await this.$http.post('/hall/add', this.hallForm)
      if (res.data.success === false) {
        this.$message.error(res.data.message)
      } else {
        this.$message.success('添加影厅成功!')
      }
      this.getHallList()
    },
    async editHall () {
      this.editHallVisable = false
      const res = await this.$http.post('/hall/update', this.editForm)
      if (res.data.success === false) {
        this.$message.error(res.data.message)
      } else {
        this.$message.success('修改影厅成功!')
      }
      this.getHallList()
    },
    chooseHall (hall) {
      this.editHallVisable = true
      this.editForm.id = hall.id
      this.editForm.name = hall.name
      this.editForm.col = hall.col
      this.editForm.row = hall.row
    }
  }
}
</script>

<style lang="less" scoped>
  .btn {
    display: flex;
    color: white;
    background-color: #07c4a8;
  }

  .text {
    text-align: center;
  }

  .hall {
    margin-bottom: 15px;
  }

  .seat {
    float: left;
    width: 32px;
    height: 32px;
    background-image: url(../../assets/cinema/seat.png);
    background-size: 100%;
    margin: 2px 2px;
  }

  .blank {
    float: left;
    width: 32px;
    height: 32px;
    margin: 2px 2px;
    background-color: white;
  }

  .addbtn {
    color: white;
    background-color: #07c4a8;
  }
</style>
