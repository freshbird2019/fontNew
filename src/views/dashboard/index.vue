<template>
  <div class="hello">
    <div class="container">
      <div class="left">
        <el-carousel height="350px" direction="vertical" :autoplay="true">
          <el-carousel-item v-for="item in imgs" :key="item">
            <div style="width:60%"> <img :src="item.img"> </div>
          </el-carousel-item>
        </el-carousel>
      </div>

      <div class="right">
        <div class="rank">
          <b>封神榜</b>
        </div>
      </div>

    </div>

    <div class="content" style="align-items: center;">
      xix
    </div>

  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'Dashboard',
  computed: {
    ...mapGetters([
      'name'
    ])
  },
  data() {
    return {
      msg: 'Welcome to Your Vue.js App',
      imgs: [{ img: require('../../assets/img/img1.jpg') }, { img: require('../../assets/img/img2.jpg') }, { img: require('../../assets/img/img3.jpg') }]
    }
  }
}
</script>

<style lang="scss" scoped>
.dashboard {
  &-container {
    margin: 30px;
  }
  &-text {
    font-size: 30px;
    line-height: 46px;
  }
}
.container{
  margin:10px;
}
.container .left {
  position:relative;
  width:75%;
}
.container .right{
  display: inline-block;
  top: 100px;
  border: 1px solid #e4e4e4;
  margin-left: 20px;
  width: 300px;
  height: 346px;
  position: absolute;
  right: 20px;
}
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
img{
  height:600px;
}
.block{
  width:900px;
}
.demonstration{

}

.content {
  float: left;
  width: 1178px;
  border: 1px solid #e8e8e8;
  background: #fff;
  margin-top: 10px;
  padding-bottom: 31px;
}

.el-carousel__item h3 {
  color: #475669;
  font-size: 14px;
  opacity: 0.75;
  line-height: 200px;
  margin: 0;
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n+1) {
  background-color: #d3dce6;
}

.rank {
  float: left;
  width: 300px;
  border-bottom: 1px solid #ff7495;
  border-bottom-left-radius: 4px;
  /*margin-top: 29px;*/
}

.rank b {
  float: left;
  width: 91px;
  height: 32px;
  border-radius: 4px;
  text-align: center;
  line-height: 32px;
  background: #ff7495;
  font-size: 16px;
  color: #ffffff;
}
</style>
