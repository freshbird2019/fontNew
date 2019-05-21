<template>
  <el-main style="padding:0;border:0;">
    <div class="con">
      <div
        style="position: relative;border: 1px solid #2c3e50"
        :style="{backgroundImage:'url('+url+')'}"
        class="bimg"
        @click="clicktimes++"
      >

        <ul>
          <li>

            <div
              v-for="pos in poss"
              :key="pos.value"
              style="position: absolute;"
              :style="'left :'+pos.minx+ 'px' +';'+ 'top :' +pos.miny+ 'px' +
                ';' + 'width :' + pos.width + 'px'+';' + 'height :' + pos.height + 'px' +';' + 'border: '+pos.bordersize+'px solid red;'"
              @click="clickonce(pos)"
            />

            <p>{{ clicktimes }}</p>
            <p>{{ usercount }}</p>
          </li>
        </ul>
      </div>
      <div id="buttons">
        <el-button type="primary" @click="showHint">提示</el-button>
        <el-button class="submit" type="primary" @click="submit($event)">完成</el-button>
      </div>
    </div>
  </el-main>
</template>

<script>
import { getToken } from '../../utils/auth'

export default {
  name: 'Trainone',
  data() {
    return {
      avatar: '',
      piclocal: '',
      picid: 0,
      url: 'ok.jpg',
      poss: [],
      clicktimes: 0,
      totallen: 0,
      usercount: 0
    }
  },
  created() {
    this.fetchData()
  },
  mounted() {

    // this.avatar = require('../../../static/trainPic/' + this.piclocal + '.jpg')
  },
  methods: {
    fetchData() {
      this.piclocal = this.$route.query.piclocal
      this.picid = this.$route.query.picid
      console.log(this.piclocal)
      console.log(this.picid)
      const u = this.url
      this.url = require('../../../static/trainPic/' + u)
      const name = this.piclocal + '.txt'
      this.$http.get('http://127.0.0.1:8088/project/getTXT/' + name).then(response => {
        this.totallen = response.data.length
        for (let i = 0; i < response.data.length; i++) {
          this.poss.push(response.data[i])
        }
      })
    },
    showHint() {
      // max - 期望的最大值
      let ok = 1
      while (ok) {
        const max = this.totallen - 1
        parseInt(Math.random() * (max + 1), 10)
        const rand = Math.floor(Math.random() * (max + 1))
        if (this.poss[rand].bordersize === 0) {
          this.poss[rand].bordersize = 1
          ok = 0
        }
      }
    },
    submit: function() {
      this.$confirm('确定提交?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        const a = this.usercount / this.totallen
        const data = { 'userid': getToken(), 'trainpicid': this.picid, 'accuracy': a }
        console.log(data)
        this.$http.post('http://127.0.0.1:8088/project/UserTrain', data).then(response => {
          console.log(response)
        }).then(
          // 跳转到显示答案及完成情况的界面
        )
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消'
        })
      })
    },
    clickonce(pos) {
      pos.bordersize = 1
      /* this.countNum()
      for (let i = 0; i < this.totallen; i++) {
        if (this.poss.bordersize === 1)console.log('okkkkkk')
      }*/
      this.usercount++
    },
    countNum() {
      let count = 0
      for (let i = 0; i < this.totallen; i++) {
        if (this.poss.bordersize === 1)count = count + 1
      }
      console.log(count)
    }
  }
}
</script>

<style scoped>
  h1, h2 {
    font-weight: normal;
  }
  ul {
    list-style-type: none;
    padding: 0;
  }
  li {
    display: inline-block;
    margin: 0 10px;
  }
  a {
    color: #42b983;
  }
  .el-main>ul>li>div{
  //background-color: blue;
    align-items:center;
    justify-content:center;
    height:400px;
    width:auto;
  }

  .bimg{
    background-size: cover;
    -moz-background-size: cover;
    background-repeat: no-repeat;
    width:512px;
    height: 512px;
  }
  p{
    color: #ffffff;
  }
  #buttons{
  //background-color:red;
    position:relative;
    margin-top: 20px;
    float:right;
  }
  .con{
    width:512px;
    height: 600px;
    margin: 50px 350px;

  }
</style>
