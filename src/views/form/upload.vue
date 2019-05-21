<template>
  <div id="step2">
    <el-container>
      <el-main style="padding:0;border:0;">
        <div id="img_name">
          <ul>
            <li><div><img :src="avatar" class=""></div></li>
            <li><input type="file" accept="image/gif,image/jpeg,image/jpg,image/png" @change="getFile($event)">
            </li>
          </ul>
        </div>
      </el-main>
      <div id="buttons">
        <el-button type="primary" icon="el-icon-arrow-left"  @click="front">上一页</el-button>
        <el-button class="submit" type="primary" @click="submit($event)">提交</el-button>
      </div>

    </el-container>
  </div>
</template>

<script>
const imgs = []
import axios from 'axios'
export default {
  name: 'Step2',
  data() {
    return {
      avatar: require('../../assets/img/img.jpg'),
      length: 0,
      imgs: [],
      d: [],
      currentPage: 1,
      imgs_list: [],
      totalpage: 0,
      file: ''
    }
  },
  mounted() {
    this.imgs.length = 0
    window.localStorage.setItem('imges', this.imgs)
    this.imgs = JSON.parse(window.localStorage.getItem('imgs'))
    this.length = this.imgs.length
    this.initUsers()
    this.inittotalpage()
    // alert(this.totalpage);
  },
  methods: {
    /*  */
    // 初始化渲染的数组
    initUsers: function() {
      this.imgs_list = this.imgs.slice(0, 3)
    },
    // 初始化总页数
    inittotalpage: function() {
      this.totalpage = this.imgs.length / 3
    },
    // 改变页面 这时候数据也会改变
    handleCurrentChange(val) {
      // alert(val);
      this.currentPage = val
      this.imgs_list = this.imgs.slice((this.currentPage - 1) * 3, this.currentPage * 3)
    },

    /*    */
    changeImage(e) {
      this.files = e.target.files[0]

      var reader = new FileReader()
      var that = this
      reader.readAsDataURL(that.files)
      reader.onload = function(e) {
        that.avatar = this.result
        // console.log(that.files)
        // that.imgs.push({ img:that.avatar, name:"aa", radio:false });
        that.imgs.push({ img: that.avatar, imgdata: that.files, name: 'aa', radio: false })

        that.length = that.imgs.length
      }
    },
    clear_all() {
      this.imgs = []
      this.length = 0
    },
    // 删除图片
    delete_img(val) {
      this.imgs.splice(val, 1)
      this.length = this.imgs.length
    },
    sendImg: function() {
      this.$emit('all')
    },
    front() {
      this.$router.push({ path: '/form/index' })
    },
    getFile: function(event) {
      this.file = event.target.files[0]
      var reader = new FileReader()
      var that = this
      reader.readAsDataURL(this.file)
      reader.onload = function(e) {
        that.avatar = this.result
      }
    },

    submit: function() {
      console.log(this.file)
      // 阻止元素发生默认的行为
      event.preventDefault()
      const formData = new FormData()
      formData.append('file', this.file)
      console.log(formData)
      axios.post('http://localhost:8088/project/upload/singlefile', formData)
        .then(function(response) {
          alert(response.data)
          console.log(response)
          //  window.location.reload();
        })
        .catch(function(error) {
          alert('上传失败')
          console.log(error)
          window.location.reload()
        })
    }

  }
}

</script>

<style scoped >
  #step2{
  //background-color:blue;
    height: -webkit-fill-available;
    margin: 0;
    padding-left: 100px;
    padding-right: 100px;
  }
  .el-card{
    height: -webkit-fill-available;
  }
  .el-container{
  //background-color:red;
  }
  ul{
    list-style-type: none;
  }
  ul>li{
    margin-bottom: 1px;
  }
  .el-aside{
  //background-color: green;
    height: -webkit-fill-available;
    border-style: solid;
    border-color: #c9ccd4;
  }
  .el-main>ul>li>div{
  //background-color: blue;
  //align-items:center;
  //justify-content:center;
    margin: 0 auto;
  }
  #img_name{
  //background-color: blue;
  //height: -webkit-fill-available;
    margin-left: 300px;
    width:400px;
  }
  ul>li>div>img{
    height:400px;
    width:auto;
    border-style: dashed;
    border-color: #716e6e;
  }
  .el-main>ul>li>input{

  }
  .clearfix{
    padding: 1px 10px;
  //border-bottom: 2px solid #808080;
  }
  .avatar-uploader .el-upload {

    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {

    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    display: block;
  }
  .block{

  }
  .item{
    text-align: center;
    position:relative;
  //background-color: red;
  }
  .item>img{
    width: 139px;
    border-style: dashed;
    border-color: #cdd0d8a1;
  }
  .el-pagination{

  //background-color: red;
    text-align: center;
  }

  .box-card{
    width: 99.3%;
  }

  .el-footer>.el-pagination{

  }
  .el-radio{
    position:absolute;
  }

  #buttons{
  //background-color:red;
    position:absolute;
    bottom:200px;
    right:150px;
  }


</style>
