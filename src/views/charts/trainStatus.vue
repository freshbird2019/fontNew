<template>
  <div :id="id" v-loading="listLoading" :class="className" :style="{height:height,width:width,marginLeft:marginLeft,marginTop:marginTop}" />
</template>

<script>
import echarts from 'echarts'
import axios from 'axios'
import moment from 'moment'
import { getToken } from '../../utils/auth'

export default {
  moment: moment,
  props: {
    className: {
      type: String,
      default: 'chart'
    },
    id: {
      type: String,
      default: 'chart'
    },
    width: {
      type: String,
      default: '1024px'
    },
    height: {
      type: String,
      default: '600px'
    },
    marginLeft: {
      type: String,
      default: '150px'
    },
    marginTop: {
      type: String,
      default: '50px'
    }
  },
  data() {
    return {
      chart: null,
      xdate: [],
      accuracy: [],
      listLoading: true
    }
  },
  mounted() {
    axios.get('http://127.0.0.1:8088/project/GetMyTrain/' + getToken()).then(response => {
      console.log(response.data)
      for (let i = 0; i < response.data.length; i++) {
        const date = moment(response.data[i].traintime).format(('YYYY-MM-DD HH:mm:ss'))
        this.xdate.push(date)
        this.accuracy.push(response.data[i].accuracy)
      }
      this.initChart()
    })
    this.listLoading = false
  },
  beforeDestroy() {
    if (!this.chart) {
      return
    }
    this.chart.dispose()
    this.chart = null
  },
  methods: {
    initChart() {
      this.chart = echarts.init(document.getElementById(this.id))
      const xData = this.xdate
      this.chart.setOption({
        backgroundColor: '#344b58',
        title: {
          text: '训练情况',
          x: '20',
          top: '20',
          textStyle: {
            color: '#fff',
            fontSize: '22'
          },
          subtextStyle: {
            color: '#90979c',
            fontSize: '16'
          }
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            textStyle: {
              color: '#fff'
            }
          }
        },
        grid: {
          left: '5%',
          right: '5%',
          borderWidth: 0,
          top: 150,
          bottom: 95,
          textStyle: {
            color: '#fff'
          }
        },
        legend: {
          x: '5%',
          top: '10%',
          textStyle: {
            color: '#90979c'
          },
          data: ['accuracy']
        },
        calculable: true,
        xAxis: [{
          type: 'category',
          axisLine: {
            lineStyle: {
              color: '#90979c'
            }
          },
          splitLine: {
            show: false
          },
          axisTick: {
            show: false
          },
          splitArea: {
            show: false
          },
          axisLabel: {
            interval: 0

          },
          data: xData
        }],
        yAxis: [{
          type: 'value',
          splitLine: {
            show: false
          },
          axisLine: {
            lineStyle: {
              color: '#90979c'
            }
          },
          axisTick: {
            show: false
          },
          axisLabel: {
            interval: 0
          },
          splitArea: {
            show: false
          }
        }],
        dataZoom: [{
          show: true,
          height: 30,
          xAxisIndex: [
            0
          ],
          bottom: 30,
          start: 10,
          end: 80,
          handleIcon: 'path://M306.1,413c0,2.2-1.8,4-4,4h-59.8c-2.2,0-4-1.8-4-4V200.8c0-2.2,1.8-4,4-4h59.8c2.2,0,4,1.8,4,4V413z',
          handleSize: '110%',
          handleStyle: {
            color: '#d3dee5'

          },
          textStyle: {
            color: '#fff' },
          borderColor: '#90979c'

        }, {
          type: 'inside',
          show: true,
          height: 15,
          start: 1,
          end: 35
        }],
        series: [{
          name: 'accuracy',
          type: 'line',
          stack: 'total',
          symbolSize: 10,
          symbol: 'circle',
          itemStyle: {
            normal: {
              color: 'rgba(252,230,48,1)',
              barBorderRadius: 0,
              label: {
                show: true,
                position: 'top',
                formatter(p) {
                  return p.value > 0 ? p.value : ''
                }
              }
            }
          },
          data: this.accuracy
        }
        ]
      })
    }
  }
}
</script>
