<template>
<div>
  <h3 style="margin: 5px 0px">用户管理</h3>
  <el-card>
<!--用户列表-->
    <el-table :data="userList" border stripe style="margin: 0px">
      <el-table-column align="center" label="序号" width="50px" type="index"></el-table-column>
      <el-table-column align="center" label="用户id" prop="id"></el-table-column>
      <el-table-column align="center" label="用户名" prop="username"></el-table-column>
      <el-table-column align="center" label="密码">******</el-table-column>
      <el-table-column align="center" label="消费额" prop="consumption"></el-table-column>
      <el-table-column
        align="right">
        <template slot="header">
          <el-input
            v-model="search"
            size="mini"
            placeholder="输入关键字搜索"/>
        </template>
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="primary"
            @click="handleEdit(scope.$index, scope.row.data())" icon="el-icon-edit"></el-button>
          <el-button
            size="mini"
            type="danger"
            @click="handleDelete(scope.$index, scope.row.data())" icon="el-icon-delete"></el-button>
        </template>
      </el-table-column>
    </el-table>
  </el-card>
<!--  修改用户对话框-->
</div>
</template>

<script>
export default {
  data () {
    return {
      search: '',
      userList: [
        {
          id: 0,
          username: 'user',
          password: 'userpwd',
          consumption: 10
        },
        {
          id: 1,
          username: 'user2',
          password: 'userpwd',
          consumption: 10
        },
        {
          id: 2,
          username: 'user3',
          password: 'userpwd',
          consumption: 10
        },
        {
          id: 3,
          username: 'user4',
          password: 'userpwd',
          consumption: 10
        }
      ]
    }
  },
  methods: {
    handleEdit (index, row) {
      // console.log(index, row)
    },
    handleDelete (index, row) {
      // console.log(index, row)
    }
  }
}
</script>

<style scoped>

</style>
