<template>
  <div v-if="flag === 1">
    <div class="usercenter">

      <div class="user-style">

        <div class="userimg-style">

          <img :src="require('../../../static/xxyl.jpg')">

        </div>
        <div class="username-plus">

          <span><b>{{ nowxyinfo.username }}</b></span>

        </div>
        <el-button type="primary" style="background:#3A71A8;border:none" @click="setCurrent()">修改与完善</el-button>

      </div>
      <div class="mymess">

        <i class="icon-el-icon-people" aria-hidden="true" />

        &nbsp;&nbsp;姓名<span>{{ nowxyinfo.username }}</span>

      </div>
      <div class="mymess">

        <i class="icon-sex" aria-hidden="true" />

        &nbsp;&nbsp;性别<span>{{ nowxyinfo.sex }}</span>

      </div>

      <div class="mymess">

        <i class="icon-sex" aria-hidden="true" />

        &nbsp;&nbsp;年龄<span>{{ nowxyinfo.age }}</span>

      </div>

      <div class="mymess">

        <i class="icon-class" aria-hidden="true" />

        &nbsp;&nbsp;医院<span>{{ nowxyinfo.hospital }}</span>

      </div>

      <div class="mymess">

        <i class="el-icon-phone" aria-hidden="true" />

        &nbsp;&nbsp;电话<span>{{ nowxyinfo.phone }}</span>

      </div>

      <div class="mymess">

        <i class="el-icon-message" aria-hidden="true" />

        &nbsp;&nbsp;邮箱<span>{{ nowxyinfo.email }}</span>

      </div>

      <div class="mymess">

        <i class="el-icon-location" aria-hidden="true" />

        &nbsp;&nbsp;地址<span>{{ nowxyinfo.address }}</span>

      </div>

    </div>
  </div>

  <div v-else-if="flag === 2" class="form">

    <div class="usercenter">

      <div class="user-style">

        <div class="username-plus"><span>{{ nowxyinfo.name }}</span></div>

        <div class="btn-update"><span @click="flag = 1">取消</span></div>

      </div>

    </div>

    <div class="input-control" style="margin-top:80px">

      <input v-model="update.sex" type="text" name="username" placeholder="性别">

    </div>
    <div class="input-control">

      <input v-model="update.age" type="text" name="username" placeholder="年龄">

    </div>
    <div class="input-control">

      <input v-model="update.hospital" type="text" name="username" placeholder="医院">

    </div>

    <div class="input-control">

      <input v-model="update.phone" type="text" name="username" placeholder="电话">

    </div>

    <div class="input-control">

      <input v-model="update.email" type="text" name="username" placeholder="邮箱">

    </div>

    <div class="input-control">

      <input v-model="update.address" type="text" name="username" placeholder="地址">

    </div>

    <div class="button-control">

      <input type="button" name="submit" value="提交" @click="submit">

    </div>

  </div>
</template>

<script>
import { getToken } from '../../utils/auth'
export default {
  name: 'Selfinfo',
  inject: ['reload'],
  data: function() {
    return {
      dialogUpdateVisible: false,
      flag: 1,
      nowxyinfo: {},
      update: {
        username: '',
        sex: '',
        phone: '',
        email: '',
        hospital: '',
        address: '',
        pwd: ''
      }
    }
  },
  mounted() {
    // 加载数据
    this.$http.get('http://127.0.0.1:8088/project/UserById/' + getToken()).then(response => {
      console.log(response.data)
      this.nowxyinfo = response.data
    })
  },
  methods: {
    setCurrent() {
      this.update = this.nowxyinfo
      this.flag = 2
    },
    submit() {
      this.$confirm(
        '确认修改?',
        '提示',
        {
          type: 'warning'
        }
      ).then(() => {
        const data = this.update
        console.log(JSON.stringify(data))
        if (this.update.sex === '') {
          alert('性别不可为空！')
        } else if (this.update.phone === '') {
          alert('电话不可为空！')
        } else {
          this.$ajax({
            method: 'post',
            url: 'http://127.0.0.1:8088/project/updateUserInfoo',
            data: data,
            contentType: 'application/json charset=utf-8'
          }).then((res) => {
            console.log(res)
            if (res.status === 200) {
              console.log(res.data)
              this.open()
            }
          }).catch(function() {
            this.open1()
          })
        }
      })
    },
    open() {
      this.$message({
        message: '已成功修改',
        type: 'success'
      })
      this.flag = 1
      this.reload()
    },
    open1() {
      this.$message({
        message: '修改失败，请重试',
        type: 'fail'
      })
      this.reload()
    }
  }
}
</script>

<style scoped>
  @import "../../../static/icon1/iconfont.css";
  @import "../../../static/icon2/iconfont.css";
  h1,
  h2 {
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

  .orderTitle {
    border-bottom: 2px #B68C8C solid;
    font-size: 24px;
    padding-bottom: 10px;
  }

  .demo-table-expand label {
    width: 90px;
    color: #99a9bf;
  }
  .demo-table-expand .el-form-item {
    margin-right: 0;
    margin-bottom: 0;
    width: 50%;
  }
  .usercenter{

    position: relative;

    top:60px;

    width: 70%;

  }

  .usercenter a{

    text-decoration: none;

    color: #2c3e50;

  }
  .user-style{

    display: flex;

    justify-content: space-between;

    flex-direction: row;

    align-items: center;

    padding: 10px 5%;

    box-shadow: 10px 0 10px #ccc;

    cursor: pointer;

    margin-left: 100px;

  }
  .userimg-style{

    width:30%;

  }

  .username-plus{

    width:50%;

  }

  .username-plus span{
    font-size:30px;
  }

  .userimg-style img{

    width:70px;

    height: 70px;

    border-radius: 50%;

  }
  .mymess{

    width: 90%;

    margin-top:10px;
    margin-left: 100px;

    padding: 10px 5%;

    box-shadow: 0px 0 2px #ccc;

    cursor: pointer;

  }

  .mymess img{

    width: 50px;

    height: 50px;

    border-radius: 50%;

  }

  .mymess span{

    margin-left:30%;

  }

  .mymess i{

    font-size: 1.2rem;

  }

  .input-control{

    margin: 10px auto;

    width: 80%;

    height: 50px;

  }

  .input-control input{

    width: 50%;

    padding: 1%;

    outline:none;

    border:2px #f4f4f4 solid;

    font-family: 'Avenir', Helvetica, Arial, sans-serif;

    -webkit-font-smoothing: antialiased;

    -moz-osx-font-smoothing: grayscale;

    color: #2c3e50;

    height: 30px;

    border-radius: 5px;

    background-color: transparent;

  }

  .input-control input:focus{

    border:1px #3A71A8 solid;

    border-radius: 5px;

  }

  input:-webkit-autofill{

    -webkit-box-shadow : 0 0 0px 1000px white inset ;

  }

  .button-control{

    margin: 0 auto;

    width: 80%;

    height: 50px;

  }

  .button-control input{

    height: 30px;

    width: 20%;

    outline:none;

    border:0;

    font-family: 'Avenir', Helvetica, Arial, sans-serif;

    -webkit-font-smoothing: antialiased;

    -moz-osx-font-smoothing: grayscale;

    color: #fff;

    background-color: #3A71A8;

    border-radius: 5px;

    height: 40px;

  }
</style>
