<template>
  <div>
    <el-row style="margin-bottom: 8px">
      <el-col :span="21">
        <h3 style="margin: 5px 0px">电影管理</h3>
      </el-col>
      <el-col :span="3" style="text-align: right">
        <el-button class="btn" icon="el-icon-circle-plus" @click="dialogVisable=true">上架电影</el-button>
      </el-col>
    </el-row>
    <el-card style="margin-bottom: 10px">
      <!--      搜索-->
      <el-row :gutter="20">
        <el-col :span="8">
          <el-input placeholder="请输入电影名称" v-model="searchName" clearable>
            <el-button slot="append" icon="el-icon-search" @click="searchMovie"></el-button>
          </el-input>
        </el-col>
      </el-row>
    </el-card>
    <template v-for="movie in movieList">
      <el-card class="movie-card" :key="movie.id" :body-style="{ padding: '5px' }">
        <el-row>
          <el-col :span="3">
            <img v-bind:src="movie.posterUrl" class="cover"/>
          </el-col>
          <el-col :span="21">
            <el-row class="text">
              <el-col :span="22">
                {{movie.name}}
                <el-tag v-if="movie.status==0" type="success" effect="dark" size="small">热映中</el-tag>
                <el-tag v-else type="danger" effect="dark" size="small">已下架</el-tag>
              </el-col>
              <el-col :span="2">
                <i class="el-icon-star-on" style="color: orange"></i>{{movie.islike}}人想看
              </el-col>
            </el-row>
            <el-row class="text">
              {{movie.type}}
            </el-row>
            <el-row class="text">
              {{movie.country}}/{{movie.length}}
            </el-row>
            <!--            <el-row class="text">-->
            <!--              {{movie.startDate}}-->
            <!--            </el-row>-->
            <!--            <el-row class="text">-->
            <!--              导演：{{movie.director}}-->
            <!--            </el-row>-->
            <!--            <el-row class="text">-->
            <!--              编剧：{{movie.screenWriter}}-->
            <!--            </el-row>-->
            <!--            <el-row class="text">-->
            <!--              主演：{{movie.starring}}-->
            <!--            </el-row>-->
            <el-row class="text">
              {{movie.description}}
            </el-row>
            <el-row class="text">
              <div class="detail">
                <el-link @click="getDetail(movie.name)">详情</el-link>
              </div>
            </el-row>
          </el-col>
        </el-row>
      </el-card>
    </template>
    <template v-if="movieList.length==0">
      <el-card>
        <div><h4>无符合要求的电影</h4></div>
      </el-card>
    </template>
    <!--  添加影片对话框-->
    <el-dialog
      title="上架电影"
      :visible.sync="dialogVisable"
      width="40%">
      <div>
        <el-form ref="movieFormRef" v-model="movieForm" label-width="80px" size="mini">
          <el-form-item label="电影">
            <el-input v-model="movieForm.name" placeholder="请输入电影名称"></el-input>
          </el-form-item>
          <el-form-item label="海报">
            <el-input v-model="movieForm.posterUrl" placeholder="请输入图片url"></el-input>
          </el-form-item>
          <el-form-item label="导演">
            <el-input v-model="movieForm.director" placeholder="请输入电影导演"></el-input>
          </el-form-item>
          <el-form-item label="编剧">
            <el-input v-model="movieForm.screenWriter" placeholder="请输入电影编剧"></el-input>
          </el-form-item>
          <el-form-item label="主演">
            <el-input v-model="movieForm.starring" placeholder="请输入电影主演"></el-input>
          </el-form-item>
          <el-form-item label="类型">
            <el-input v-model="movieForm.type" placeholder="请输入电影类型"></el-input>
          </el-form-item>
          <el-form-item label="国家">
            <el-input v-model="movieForm.country" placeholder="请输入制作电影国家"></el-input>
          </el-form-item>
          <el-form-item label="语言">
            <el-input v-model="movieForm.language" placeholder="请输入电影对白语言"></el-input>
          </el-form-item>
          <el-form-item label="上映日期">
            <el-date-picker
              v-model="movieForm.startDate"
              type="date"
              style="width: 100%"
              placeholder="请选择电影上映日期">
            </el-date-picker>
<!--            <el-input v-model="movieForm.startDate" placeholder="请输入电影上映日期"></el-input>-->
          </el-form-item>
          <el-form-item label="片长">
            <el-input v-model="movieForm.length" placeholder="请输入电影片长"></el-input>
          </el-form-item>
          <el-form-item label="简介">
            <el-input v-model="movieForm.description" placeholder="请输入电影简介"
            type="textarea" autosize></el-input>
          </el-form-item>
        </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisable = false">取 消</el-button>
        <el-button type="primary" @click="addMovie">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data () {
    return {
      searchName: '',
      dialogVisable: false,
      movieForm: {
        name: '',
        posterUrl: '',
        director: '',
        screenWriter: '',
        starring: '',
        type: '',
        country: '',
        language: '',
        startDate: '',
        length: '',
        description: ''
      },
      movieList: [
        // {
        //   id: 1,
        //   name: '信条',
        //   posterUrl: 'https://images.weserv.nl/?url=https://bkimg.cdn.bcebos.com/pic/94cad1c8a786c9177f3ecead307467cf3bc79f3df947?x-bce-process=image/resize,m_lfit,w_268,limit_1/format,f_jpg',
        //   director: '克里斯托弗·诺兰 ',
        //   screenWriter: '克里斯托弗·诺兰',
        //   starring: '约翰·大卫·华盛顿、罗伯特·帕丁森、伊丽莎白·德比齐、迈克尔·凯恩、肯尼思·布拉纳 ',
        //   type: '科幻、动作、惊悚、喜剧',
        //   country: '美国、英国 ',
        //   language: '英语 ',
        //   startDate: '2020年9月4日',
        //   length: '150 分钟 ',
        //   description: '一群蒙面匪徒闯入乌克兰一个歌剧院劫持人质，真实目标是要抢夺一个装有神秘物质的手提箱。主角和同伴假扮成特警也要抢夺手提箱，但任务离奇失败，主角为保护秘密“被假死”。主角在假死被救后，被赋予新的更大的任务，通过女科学家的帮助，主角从射出的子弹倒着回到枪膛的实验中了解到“逆转时间”的概念，并被告知整个世界可能因为逆时间技术消失。主角从此不再有身份，加入“信条”组织，成为无名氏，他的任务是保护全世界不要被逆时间毁灭。为了阻止萨特企图毁灭人类的行为，以无名氏、尼尔和凯特为首的队伍们来到萨特的基地，利用逆时间完成了任务，毁掉了萨特手中的时间炸弹，最终阻止了人类世界在逆时间中灭亡',
        //   status: 0,
        //   islike: 25
        // },
        // {
        //   id: 2,
        //   name: '流浪地球',
        //   posterUrl: 'https://images.weserv.nl/?url=https://bkimg.cdn.bcebos.com/pic/4bed2e738bd4b31cd25411778ad6277f9f2ff896?x-bce-process=image/watermark,image_d2F0ZXIvYmFpa2UxODA=,g_7,xp_5,yp_5',
        //   director: '郭帆',
        //   screenWriter: '龚格尔、严东旭 、郭帆 、叶俊策 、杨治学 、吴荑 、叶濡畅',
        //   starring: '吴京、屈楚萧、赵今麦、李光洁、吴孟达',
        //   type: '科幻',
        //   country: '中国 ',
        //   language: '汉语普通话',
        //   startDate: '2019年2月5日',
        //   length: '125 分钟',
        //   description: '近年来，科学家们发现太阳急速衰老膨胀，短时间内包括地球在内的整个太阳系都将被太阳所吞没。为了自救，人类提出一个名为“流浪地球”的大胆计划，即倾全球之力在地球表面建造上万座发动机和转向发动机，推动地球离开太阳系，用2500年的时间奔往新家园。' +
        //       '中国航天员刘培强（吴京饰）在儿子刘启四岁那年前往领航员空间站，和国际同侪肩负起领航者的重任。转眼刘启（屈楚萧饰）长大，他带着妹妹韩朵朵（赵今麦饰）偷偷跑到地表，偷开外公韩子昂（吴孟达饰）的运输车，结果不仅遭到逮捕，还遭遇了全球发动机停摆的事件。为了修好发动机，阻止地球坠入木星，全球开始展开饱和式营救，连刘启他们的车也被强征加入。在与时间赛跑的过程中，无数的人前仆后继，奋不顾身，只为延续百代子孙生存的希望',
        //   status: 1,
        //   islike: 13
        // },
        // {
        //   id: 3,
        //   name: '八佰',
        //   posterUrl: 'https://images.weserv.nl/?url=http://web-txpc.oss-cn-shanghai.aliyuncs.com/movie/20200810175530_571.jpg',
        //   director: '管虎',
        //   screenWriter: '管虎、葛瑞',
        //   starring: '黄志忠、欧豪、王千源、姜武、张译、杜淳、魏晨、李晨、俞灏明',
        //   type: '战争 历史',
        //   country: '中国',
        //   language: '汉语普通话',
        //   startDate: '2020年8月21日',
        //   length: '147 分钟',
        //   description: '1937年淞沪会战末期，中日双方激战已持续三个月，上海濒临沦陷。第88师262旅524团团副谢晋元杜淳饰）率420余人，孤军坚守最后的防线，留守上海四行仓库。与租界一河之隔，造就了罕见的被围观的战争。为壮声势，实际人数四百人而对外号称八百人。“八百壮士”奉命留守上海闸北，在苏州河畔的四行仓库鏖战四天，直至10月30日才获令撤往英租界',
        //   status: 0,
        //   islike: 53
        // },
        // {
        //   id: 4,
        //   name: '花木兰',
        //   posterUrl: 'https://images.weserv.nl/?url=https://img.alicdn.com/bao/uploaded/i3/TB195acTuL2gK0jSZFmXXc7iXXa_.jpg_300x300.jpg',
        //   director: '妮基·卡罗',
        //   screenWriter: '劳伦·海尼克、伊丽莎白·马丁、里克·杰法、阿曼达·斯尔沃 ',
        //   starring: '刘亦菲、甄子丹、巩俐、李连杰、安柚鑫、李截、郑佩佩、赵家玲、马志、唐莎娜',
        //   type: '动作、剧情、冒险',
        //   country: '美国、中国',
        //   language: '英语、汉语普通话 ',
        //   startDate: '2020年9月11日',
        //   length: '115 分钟',
        //   description: '中国的皇帝颁布法令，要求每家出一名男子服兵役，抵御北方侵略者。作为一名受人尊敬的战士的长女，花木兰（刘亦菲饰）站出来替生病的父亲应征入伍。她装扮成男人，化名花军，经受了种种考验，同时必须利用内在的力量，接纳自己真正的潜能。这是一场史诗般的旅程，让木兰蜕变为一名受人尊敬的战士，也赢得来自国家与骄傲的父亲的尊重',
        //   status: 0,
        //   islike: 23
        // }
      ]
    }
  },
  created () {
    this.getMovieList()
  },
  methods: {
    async getMovieList () {
      const res = await this.$http.get('/movie/all')
      if (res.data.success === false) {
        this.$message.error(res.data.message)
      } else {
        // console.log(res.data.content)
        this.movieList = res.data.content
      }
    },
    getDetail (name) {
      this.$router.push({ path: 'movieDetail', query: { movieName: name } })
      // this.$router.push('/movieDetail')
    },
    async addMovie () {
      this.dialogVisable = false
      const res = await this.$http.post('/movie/add', this.movieForm)
      if (res.data.success === false) {
        this.$message.error(res.data.message)
      } else {
        this.$message.success('上架电影成功!')
      }
      this.$refs.movieFormRef.resetFields()
      this.getMovieList()
    },
    async searchMovie () {
      const res = await this.$http.get('/movie/search', { params: { keyword: this.searchName } })
      if (res.data.success === false) {
        this.$message.error(res.data.message)
      } else {
        this.movieList = res.data.content
        // console.log(res.data.content)
        // this.$message.success('搜索电影成功!')
      }
    }
  }
}
</script>

<style scoped>
  .movie-card {
    margin-bottom: 15px;
  }

  .cover {
    width: 150px;
    height: 200px;
  }

  .text {
    margin-bottom: 5px;
  }

  .detail {
    display: flex;
    justify-content: flex-end;
  }

  .btn {
    color: white;
    background-color: #07c4a8;
  }
</style>
