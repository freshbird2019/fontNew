<template>
  <div class="app-container">
    <el-table
      v-loading="listLoading"
      :data="list"
      element-loading-text="Loading"
      border
      fit
      highlight-current-row
    >
      <el-table-column align="center" label="图片ID" width="95">
        <template slot-scope="scope">
          {{ scope.row.trainpicid }}
        </template>
      </el-table-column>
      <el-table-column label="图片名称">
        <template slot-scope="scope">
          {{ scope.row.local }}
        </template>
      </el-table-column>
      <el-table-column label="图片大小" width="110" align="center">
        <template slot-scope="scope">
          {{ scope.row.size }}
        </template>
      </el-table-column>
      <el-table-column class-name="status-col" label="训练情况" width="110" align="center">
        <template slot-scope="scope">
          <el-tag :type="scope.row.status | statusFilter">{{ scope.row.status }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column align="center" prop="created_at" label="上传时间" width="200">
        <template slot-scope="scope">
          <i class="el-icon-time" />
          <span>{{ scope.row.display_time }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" prop="created_at" label="操作" width="200">
        <template slot-scope="scope">
          <el-button type="info" size="mini" style="background:#72a9ff;border:none" @click="Train(scope.row)">训练</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { getToken } from '@/utils/auth'
export default {
  name: 'TannPane',
  filters: {
    statusFilter(status) {
      const statusMap = {
        已完成: 'success',
        draft: 'gray',
        未完成: 'danger'
      }
      return statusMap[status]
    }
  },
  props: {
    type: {
      type: String,
      default: 'no'
    }
  },
  data() {
    return {
      list: [],
      listLoading: true
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      console.log('loading data.')
      const id = getToken()
      console.log(id)
      this.listLoading = true
      this.$http.get('http://127.0.0.1:8088/project/notrainedpic/' + id).then(response => {
        console.log(response.data)
        var that = this
        for (let i = 0; i < response.data.length; i++) {
          response.data[i].status = '未完成'
          that.list.push(response.data[i])
        }
        that.listLoading = false
      })
      /*   this.$http.get('http://127.0.0.1:8088/project/trainedpic/' + id).then(response => {
          console.log(response.data)
          var that = this
          for (let i = 0; i < response.data.length; i++) {
            response.data[i].status = '已完成'
            that.list.push(response.data[i])
            that.listLoading = false
          }
        })*/
    },
    Train(pic) {
      const local = pic.local
      const id = pic.trainpicid
      this.$router.push({
        path: '/trainone',
        query: {
          piclocal: local,
          picid: id
        }
      })
    }
  }
}
</script>
