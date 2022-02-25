import React, { memo, useEffect } from 'react';
import echartsTheme from "../Theme/theme"
import * as echarts from 'echarts/core';
import { GridComponent } from 'echarts/components';
import { PieChart } from 'echarts/charts'
import { CanvasRenderer } from 'echarts/renderers';
import { TitleComponent } from 'echarts/components'
import { TooltipComponent } from 'echarts/components'
import { LegendComponent } from 'echarts/components'
import { Card } from 'antd';
interface PieProps {

}
const Pie: React.FC<PieProps> = memo(() => {
  useEffect(() => {
    //使用
    echarts.use([GridComponent, PieChart, CanvasRenderer, TitleComponent, TooltipComponent, LegendComponent]);
    //设置主题
    echarts.registerTheme("Theme", echartsTheme)
    var myChart = echarts.init(document.getElementById('main')!, echartsTheme);
    myChart.setOption(Option())
    var myChart2 = echarts.init(document.getElementById('main2')!, echartsTheme);
    myChart2.setOption(Option2())
  }, [])
  const Option = () => {
    let option = {
      title: {
        text: '用户骑行订单',
        // left: 'center'
      },
      tooltip: {
        trigger: 'item'
      },
      legend: {
        orient: 'vertical',
        right: 'right'
      },
      series: [
        {
          name: '用户骑行订单',
          type: 'pie',
          radius: '50%',
          data: [
            { value: 1048, name: 'hello' },
            { value: 735, name: '摩拜' },
            { value: 580, name: 'OFO' },
            { value: 484, name: '其他' },
            { value: 300, name: '小黄车' }
          ],
          emphasis: {
            itemStyle: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: 'rgba(0, 0, 0, 0.5)'
            }
          }
        }
      ]
    }

    return option
  }
  const Option2 = () => {
    let option = {
      title: {
        text: '用户骑行订单',
        // left: 'center'
      },
      tooltip: {
        trigger: 'item'
      },
      legend: {
        orient: 'vertical',
        right: 'right'
      },
      series: [
        {

          name: '用户骑行订单',
          type: 'pie',
          radius: ['40%', '70%'],
          emphasis: {
            label: {
              show: true,
              fontSize: '30',
              fontWeight: 'bold'
            }
          },
          data: [
            { value: 1048, name: 'hello' },
            { value: 735, name: '摩拜' },
            { value: 580, name: 'OFO' },
            { value: 484, name: '其他' },
            { value: 300, name: '小黄车' }
          ],

        }
      ]
    }

    return option
  }
  return (
    <div>
      <Card title="饼状图">
        <div id='main' style={{ width: "500px", height: "500px", marginLeft: "200px" }}></div>
      </Card>
      <Card title="饼状图(二)">
        <div id='main2' style={{ width: "600px", height: "500px", marginLeft: "200px" }}></div>
      </Card>
      
    </div>
  )
})

export default Pie 