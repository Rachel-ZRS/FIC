import { Component, OnInit } from '@angular/core';

import * as echarts from 'echarts';
import { of } from 'rxjs';

@Component({
  selector: 'app-echarts-demo',
  templateUrl: './echarts-demo.component.html',
  styleUrls: ['./echarts-demo.component.scss']
})
export class EchartsDemoComponent implements OnInit {

  showloading: boolean = true;

  constructor() {
    setTimeout(()=> {
      this.showloading = false;
    }, 3000);
  }

  mapOption = {};
  ngOnInit(): void {
    of(require("../../assets/china.json")).subscribe(xgJson=>{
      echarts.registerMap('CHN', xgJson);
      this.mapOption = {
        title: {
          text: '香港18区人口密度 （2011）',
          subtext: '人口密度数据来自Wikipedia',
          sublink: 'http://zh.wikipedia.org/wiki/%E9%A6%99%E6%B8%AF%E8%A1%8C%E6%94%BF%E5%8D%80%E5%8A%83#cite_note-12'
        },
        tooltip: {
          trigger: 'item',
          formatter: '{b}<br/>{c} (p / km2)'
        },
        toolbox: {
          show: true,
          orient: 'vertical',
          left: 'right',
          top: 'center',
          feature: {
            dataView: { readOnly: false },
            restore: {},
            saveAsImage: {}
          }
        },
        visualMap: {
          min: 800, // TODO calculate
          max: 50000, // TODO calculate
          text: ['High', 'Low'],
          realtime: false,
          calculable: true,
          inRange: {
            color: ['#F35342', '#C33D3D', '#950F0F', '#780404']
          }
        },
        series: [
          {
            name: '香港18区人口密度',
            type: 'map',
            mapType: 'CHN', // map type should be registered
            itemStyle: {
              normal: { label: { show: true } },
              emphasis: { label: { show: true } }
            },
            data: [
              { name: '黑龙江', value: 20057.34 },
              { name: '吉林', value: 15477.48 },
              { name: '辽宁', value: 31686.1 },
              { name: '北京', value: 6992.6 },
              { name: '河北', value: 44045.49 },
              { name: '内蒙古', value: 40689.64 },
              { name: '河南', value: 37659.78 },
              { name: '江苏', value: 45180.97 },
              { name: '山东', value: 55204.26 },
              { name: '浙江', value: 21900.9 },
              { name: '江西', value: 4918.26 },
              { name: '上海', value: 5881.84 },
              { name: '福建', value: 4178.01 },
              { name: '广东', value: 2227.92 },
              { name: '广西', value: 2180.98 },
              { name: '云南', value: 9172.94 },
              { name: '西藏', value: 3368 },
              { name: '新疆', value: 2227.92},
              { name: '青海', value: 2227.92},
              { name: '甘肃', value: 2227.92},
              { name: '宁夏', value: 2227.92},
              { name: '陕西', value: 2227.92},
              { name: '山西', value: 2227.92},
              { name: '湖北', value: 2227.92},
              { name: '湖南', value: 2227.92},
              { name: '四川', value: 2227.92},
              { name: '重庆', value: 2227.92},
              { name: '贵州', value: 2227.92},
              { name: '安徽', value: 2227.92},
              { name: '香港', value: 2227.92},
              { name: '澳门', value: 2227.92},
              { name: '台湾', value: 2227.92},
              { name: '海南', value: 45180.92}
            ]
          }
        ]
      };
    });
  }

  chartOption = {
    title: {
      text: '堆叠区域图'
    },
    tooltip: {
      trigger: 'axis'
    },
    legend: {
      data: ['邮件营销', '联盟广告', '视频广告', '直接访问', '搜索引擎']
    },
    toolbox: {
      feature: {
        saveAsImage: {}
      }
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      containLabel: true
    },
    xAxis: [
      {
        type: 'category',
        boundaryGap: false,
        data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
      }
    ],
    yAxis: [
      {
        type: 'value'
      }
    ],
    series: [
      {
        name: '邮件营销',
        type: 'line',
        stack: '总量',
        areaStyle: { normal: {} },
        data: [120, 132, 101, 134, 90, 230, 210]
      },
      {
        name: '联盟广告',
        type: 'line',
        stack: '总量',
        areaStyle: { normal: {} },
        data: [220, 182, 191, 234, 290, 330, 310]
      },
      {
        name: '视频广告',
        type: 'line',
        stack: '总量',
        areaStyle: { normal: {} },
        data: [150, 232, 201, 154, 190, 330, 410]
      },
      {
        name: '直接访问',
        type: 'line',
        stack: '总量',
        areaStyle: { normal: {} },
        data: [320, 332, 301, 334, 390, 330, 320]
      },
      {
        name: '搜索引擎',
        type: 'line',
        stack: '总量',
        label: {
          normal: {
            show: true,
            position: 'top'
          }
        },
        areaStyle: { normal: {} },
        data: [820, 932, 901, 934, 1290, 1330, 1320]
      }
    ]
  }

  pieOption = {
    tooltip: {
      trigger: 'item',
      formatter: "{a} <br/>{b}: {c} ({d}%)"
    },
    legend: {
      orient: 'vertical',
      x: 'left',
      data: ['直达', '营销广告', '搜索引擎', '邮件营销', '联盟广告', '视频广告', '百度', '谷歌', '必应', '其他']
    },
    series: [
      {
        name: '访问来源',
        type: 'pie',
        selectedMode: 'single',
        radius: [0, '30%'],

        label: {
          normal: {
            position: 'inner'
          }
        },
        labelLine: {
          normal: {
            show: false
          }
        },
        data: [
          { value: 335, name: '直达', selected: true },
          { value: 679, name: '营销广告' },
          { value: 1548, name: '搜索引擎' }
        ]
      },
      {
        name: '访问来源',
        type: 'pie',
        radius: ['40%', '55%'],

        data: [
          { value: 335, name: '直达' },
          { value: 310, name: '邮件营销' },
          { value: 234, name: '联盟广告' },
          { value: 135, name: '视频广告' },
          { value: 1048, name: '百度' },
          { value: 251, name: '谷歌' },
          { value: 147, name: '必应' },
          { value: 102, name: '其他' }
        ]
      }
    ]
  }

  barAndLineOption = {
    title: {
      text: '今日访问量' // TODO 图表标题string
    },
    color: ['#E52727'],
    //气泡提示框，常用于展现更详细的数据
    tooltip: {
      trigger: 'axis',
      axisPointer: { // 坐标轴指示器，坐标轴触发有效
        type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
      }
    },
    toolbox: {
      show: true,
      feature: {
        //显示缩放按钮
        dataZoom: {
          show: true
        },
        //显示折线和块状图之间的切换
        magicType: {
          show: true,
          type: ['bar', 'line']
        },
        //显示是否还原
        restore: {
          show: true
        },
        //是否显示图片
        saveAsImage: {
          show: true
        }
      }
    },
    grid: { // position
      left: '3%',
      right: '4%',
      bottom: '3%',
      containLabel: true
    },
    xAxis: [{
      type: 'category',
      data: ['JAN 2020','FEB 2020','MAR 2020','APR 2020'], // TODO category names
      axisTick: {
        alignWithLabel: true
      },
      axisLabel: {
        interval: 0,
        rotate: 20
      },
    }],
    yAxis: [{
      name: "今日访问量", // TODO title
      type: 'value'
    }],
    series: [{
      name: '今日访问次数', // TODO name
      type: 'line', // line | bar
      barWidth: '60%', // ???
      label: {
        normal: {
          show: true
        }
      },
      data:[11111,2222,33333,444]
    }]
  }

}
