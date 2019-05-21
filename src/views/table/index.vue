<template>
  <div>
  <div class="tab-container">
    <el-tag @click="toPie">完成情况：{{ createdTimes }}</el-tag>
    <el-button class="btn" @click="randTrain">
      随机开始
    </el-button>
    <el-tabs v-model="activeName" style="margin-top:15px;" type="border-card">
      <el-tab-pane v-for="item in tabMapOptions" :key="item.key" :label="item.label" :name="item.key">
        <keep-alive>
          <tab-pane v-if="item.key==='yes'" :type="item.key" />
          <tann-pane v-if="item.key==='no'" :type="item.key" />
        </keep-alive>
      </el-tab-pane>
    </el-tabs>
  </div>
    <div class="pie"><pie-chart /></div>
  </div>
</template>

<script>
import tabPane from './tabPane'
import tannPane from './tannPane'
import { getToken } from '../../utils/auth'
import PieChart from './pieChart'
export default {
  components: { PieChart, tabPane, tannPane },
  data() {
    return {
      tabMapOptions: [
        { label: '已完成', key: 'yes' },
        { label: '未完成', key: 'no' }
      ],
      activeName: 'yes',
      createdTimes: 0
    }
  },
  methods: {
    randTrain() {
      console.log('okkk')
      const idd = getToken()
      this.$http.get('http://127.0.0.1:8088/project/OneNoTrained/' + idd).then(response => {
        console.log(response.data)
        const pic = response.data
        const local = pic.local
        const id = pic.trainpicid
        this.$router.push({
          path: '/trainone',
          query: {
            piclocal: local,
            picid: id
          }
        })
      })
    },
    toPie() {
      this.$router.push('/pieChart')
    }
  }
}
</script>

<style lang="scss" scoped>
  @import "../../styles/btn.scss";
  .tab-container {
    padding: 25px;
    width:70%;
    float: left;
  }
  .pie{
    width:30%;
    float:right;
    padding: 80px 10px;
  }
  .btn{
    background-color: #3A71A8;
   float:right;
    color: #ffffff;
  }
</style>
