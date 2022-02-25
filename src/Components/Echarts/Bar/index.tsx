import React, { memo, useEffect } from 'react';
import echartsTheme from "../Theme/theme"
import * as echarts from 'echarts/core';
import { GridComponent } from 'echarts/components';
import { BarChart } from 'echarts/charts';
import { CanvasRenderer } from 'echarts/renderers';
import { TitleComponent } from 'echarts/components'
import { TooltipComponent } from 'echarts/components'
import { LegendComponent } from 'echarts/components'
import { Card } from 'antd';

interface BarProps {

}
const Bar: React.FC<BarProps> = memo(() => {
  useEffect(() => {
    //使用
    echarts.use([GridComponent, BarChart, CanvasRenderer, TitleComponent, TooltipComponent,LegendComponent]);
    //设置主题
    echarts.registerTheme("Theme", echartsTheme)
    var myChart = echarts.init(document.getElementById('main')!, echartsTheme);
    myChart.setOption(Option())
    var myChart2 = echarts.init(document.getElementById('main2')!, echartsTheme);
    myChart2.setOption(Option2())
  }, [])
  const Option = () => {
    let option = {
      //标题
      title: {
        text: "用户骑行订单"
      },
      //提示信息
      tooltip: {
        trigger: 'axis'
      },
      //x轴信息
      xAxis: {
        data: [
          '周一',
          '周二',
          '周三',
          '周四',
          '周五',
          '周六',
          '周日'
        ]
      },
      yAxis: {
        type: 'value'
      },
      //数据源
      series: [
        {
          name: 'OFO',
          type: 'bar',
          data: [
            1000,
            2000,
            1500,
            3000,
            2000,
            1200,
            800
          ]
        }
      ]
    }
    return option
  }
  const Option2 = () => {
    let option = {
      //标题
      title: {
        text: "用户骑行订单"
      },
      //提示信息
      tooltip: {
        trigger: 'axis'
      },
      //图表，三个，多个数据
      legend: {
        data: ["OFO", "摩拜", "hello"]
      },
      //x轴信息
      xAxis: {
        data: [
          '周一',
          '周二',
          '周三',
          '周四',
          '周五',
          '周六',
          '周日'
        ]
      },
      yAxis: {
        type: 'value'
      },

      //数据源
      series: [
        {
          name: 'OFO',
          type: 'bar',
          data: [
            1000,
            2000,
            1500,
            3000,
            2000,
            1200,
            800
          ]
        },
        {
          name: 'hello',
          type: 'bar',
          data: [
            2000,
            200,
            500,
            3000,
            2220,
            1200,
            1020
          ]
        },
        {
          name: '摩拜',
          type: 'bar',
          data: [
            100,
            200,
            300,
            400,
            500,
            600,
            1020
          ]
        }
      ]
    }
    return option
  }
  return (
    <div>
      <Card title="柱形图表">
        <div id='main' style={{ width: "800px", height: "400px" }}>
        </div>
      </Card>
      <Card title="柱形图表二">
        <div id='main2' style={{ width: "800px", height: "400px" }}>
        </div>
      </Card>
    </div>
  )
})

export default Bar 