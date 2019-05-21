<!--suppress ALL -->
<template>
  <div class="app-container" v-if="flag==1">
    <el-input v-model="search" placeholder="输入日期"  prefix-icon="el-icon-search" style="margin-bottom:30px;"
    ></el-input>
    <el-table
      :data="tables"
      style="width: 100%"
      v-loading="listLoading"
    @row-click="toOneTrainHis">
      <el-table-column
        label="训练id"
        prop="trainid">
      </el-table-column>
      <el-table-column
        label="训练id"
        prop="trainpic.trainpicid">
      </el-table-column>
      <el-table-column
        label="正确率"
        prop="accuracy">
      </el-table-column>
      <el-table-column
        label="训练时间"
        prop="traintime">
      </el-table-column>
    </el-table>
  </div>
  <div v-else-if="flag==2">
    <el-row :gutter="8">
      <el-col :xs="{span: 24}" :sm="{span: 24}" :md="{span: 24}" :lg="{span: 12}" :xl="{span: 12}" style="padding-right:25px;margin-bottom:30px;">
        <div class="imgdiv"><img :src="img" class="imgname"></div>
      </el-col>

      <el-col :xs="{span: 24}" :sm="{span: 12}" :md="{span: 12}" :lg="{span: 6}" :xl="{span: 6}" style="float:right;margin: 100px 50px;">
        <el-card  style="margin-left:8px;">
          <div style="position:relative;">
            <div style="padding-top:35px;" class="progress-item">
              <div class="card-panel-description">
                <div class="card-panel-text">训练时间：</div></div>
              <el-progress :percentage="70" />
            </div>
            <div class="progress-item">
              <div class="card-panel-description">
                <div class="card-panel-text">正确率：</div></div>
              <el-progress :percentage="18" />
            </div>
            <div class="progress-item">
              <div class="card-panel-description">
                <div class="card-panel-text">排名：</div></div>
              <el-progress :percentage="12" />
            </div>
          </div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  import moment from 'moment'
  import { getToken } from '../../utils/auth'
  import PieChart from '../table/pieChart'
export default {
  components: {  PieChart },
  moment:moment,
  data() {
    return {
      filterText: '',
      trainHis: [],
      search:'',
      label: [],
      listLoading: true,
      data2: [],
      defaultProps: {
        label: 'traintime'
      },
      flag:1,
      img:require('../../assets/img/img.jpg'),
    }
  },
  watch: {
    filterText(val) {
      this.$refs.tree2.filter(val)
    }
  },
  created() {
    this.NewfetchData()
  },

  methods: {
    filterNode(value, data) {
      if (!value) return true
      return data.label.indexOf(value) !== -1
    },
    fetchData() {
       console.log('loading data.')
      const id = getToken()
      console.log(id)
      this.listLoading = true
      this.$http.get('http://127.0.0.1:8088/project/GetMyTrain/' + id).then(response => {
        for (let i = 0; i < response.data.length; i++) {
          response.data[i].traintime=moment(response.data[i].traintime).format('YYYY-MM-DD')
            this.trainHis.push(response.data[i])
        }
        this.$http.get('http://127.0.0.1:8088/project/GetMyTrainDate/' + id).then(response => {
          console.log(response.data)
          for (let i = 0; i < response.data.length; i++) {
            const labeldate=response.data[i];
            var ch=new Array();
            for (let j = 0; j < this.trainHis.length; j++) {
              const date=moment(this.trainHis[j].traintime).format('YYYY-MM-DD')
              console.log(date)
              if(date===labeldate){
                ch.push(this.trainHis[j]);
              }
              else break;
            }
            const ok={traintime:labeldate,children:ch}
            this.data2.push(ok)
          }
        })
      })
    },

    NewfetchData(){
      console.log('loading data.')
      const id = getToken()
      console.log(id)
      this.listLoading = true
      this.$http.get('http://127.0.0.1:8088/project/GetMyTrain/' + id).then(response => {
        console.log(response.data)
        for (let i = 0; i < response.data.length; i++) {
          response.data[i].traintime=moment(response.data[i].traintime).format(('YYYY-MM-DD HH:mm:ss'))
          this.trainHis.push(response.data[i])
        }
        this.listLoading = false
      }) .catch(() => {
        this.loading = false
      })
    },

    toOneTrainHis(row){
      let routerParams=row.trainpic.trainpicid
      this.$http.get('http://localhost:8088/project/image/'+routerParams,
        {responseType: "arraybuffer",}).then(response=>{
        const  data=response.data
        console.log(response)
        this.img='data:image/png;base64,' + btoa(new Uint8Array(data).reduce((data, byte) => data + String.fromCharCode(byte), ''))
        this.flag=2
      }).catch(function(err) {
        console.log("fail")
      })
    }
  },
  computed: {
    tables () {
      const search = this.search
      if (search) {
        console.log('this.trainHis', this.trainHis)
        return this.trainHis.filter(dataNews => {
          return Object.keys(dataNews).some(key => {
            return String(dataNews[key]).toLowerCase().indexOf(search) > -1
          })
        })
      }
      console.log('this.trainHis', this.trainHis)
      return this.trainHis
    }
  }
}
</script>

<style scoped>
  .imgdiv{
    margin-top: 50px;
    margin-left: 15px;
    float: left;
  }
  .imgname{
    border-style: dashed;
    border-color: #cdd0d8a1;
  }
  .progress-item {
    margin-bottom: 10px;
    font-size: 14px;
  }
  .card-panel-description {
    font-weight: bold;
    margin: 26px;
    margin-left: 0px;
  }
  .card-panel-text {
    line-height: 18px;
    color: rgba(0, 0, 0, 0.45);
    font-size: 16px;
    margin-bottom: 12px;
  }

  .card-panel-num {
    font-size: 20px;
  }

</style>

