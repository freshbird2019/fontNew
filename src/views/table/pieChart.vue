<template>
  <div :class="className" :style="{height:height,width:width}" />
</template>

<script>
import echarts from 'echarts'
require('echarts/theme/macarons') // echarts theme
import { debounce } from '@/utils'
import { getToken } from '../../utils/auth'

export default {
  name: 'PieChart',
  props: {
    className: {
      type: String,
      default: 'chart'
    },
    width: {
      type: String,
      default: '100%'
    },
    height: {
      type: String,
      default: '300px'
    }
  },
  data() {
    return {
      chart: null,
      yes: 0,
      no: 0
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.$http.get('http://127.0.0.1:8088/project/NumofTrained/' + getToken()).then(response => {
        console.log(response.data)
        this.yes = response.data
        this.$http.get('http://127.0.0.1:8088/project/NumofNoTrained/' + getToken()).then(res => {
          console.log(res.data)
          this.no = res.data
          this.initChart()
        })
      })
    })
    this.__resizeHandler = debounce(() => {
      if (this.chart) {
        this.chart.resize()
      }
    }, 100)
    window.addEventListener('resize', this.__resizeHandler)
  },
  beforeDestroy() {
    if (!this.chart) {
      return
    }
    window.removeEventListener('resize', this.__resizeHandler)
    this.chart.dispose()
    this.chart = null
  },
  methods: {
    initChart() {
      this.chart = echarts.init(this.$el, 'macarons')

      this.chart.setOption({
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b} : {c} ({d}%)'
        },
        legend: {
          left: 'center',
          bottom: '10',
          data: ['已完成', '未完成']
        },
        series: [
          {
            name: '完成情况图',
            type: 'pie',
            roseType: 'radius',
            radius: [15, 95],
            center: ['50%', '38%'],
            data: [
              { value: this.yes, name: '已完成' },
              { value: this.no, name: '未完成' }
            ],
            animationEasing: 'cubicInOut',
            animationDuration: 2600
          }
        ]
      })
    }
  }
}
</script>
