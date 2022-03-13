<template>
  <div id="customerChart"></div>
</template>

<script>
import { inject, nextTick } from 'vue'
export default {
  name: 'data_page',
  setup() {
    const echarts = inject('ec') // 引入
    nextTick(() => {
      // 需要获取到element,所以是onMounted的Hook
      const myChart = echarts.init(document.getElementById('customerChart'))
      // 绘制图表
      setTimeout(() => {
        myChart.setOption({
          title: { text: '总用户量' },
          tooltip: {},
          xAxis: {
            data: ['12-3', '12-4', '12-5', '12-6', '12-7', '12-8']
          },
          yAxis: {},
          series: [
            {
              name: '用户量',
              type: 'line',
              data: [5, 20, 36, 10, 10, 20]
            }
          ]
        })
      }, 200)
    })
  }
}
</script>

<style lang="scss" scoped>
#customerChart {
  height: 300px;
}
</style>
