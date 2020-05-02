import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-line-charts',
  templateUrl: './line-charts.component.html',
  styleUrls: ['./line-charts.component.scss']
})
export class LineChartsComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }


  sevenIndexesOption = {
    color: ['#a71616'],
    legend: {
      data: ['Total Confirmed'] // TODO can be switched by selector
    },
    tooltip: {
      trigger: 'axis',
      axisPointer: { // available only when trigger='axis'
        type: 'line' // 'line'(default) | 'shadow'
      }
    },
    grid: { // position
      left: '6%',
      right: '12%',
      bottom: '5%',
      containLabel: true
    },
    xAxis: [{
      type: 'category',
      boundaryGap: false,
      data: ['01/01/2020','01/15/2020','01/31/2020','02/15/2020','02/29/2020','03/15/2020','03/31/2020','04/15/2020','04/30/2020','05/15/2020'], // TODO api to provide category data
      // axisLabel: {
      //   interval: 0,
      //   rotate: 20
      // }
    }],
    yAxis: [{
      type: 'value'
    }],
    series: [{
      name: 'Total Confirmed', // must be the same as legend data
      smooth: true,
      type: 'line', // line | bar
      label: {
        normal: {
          show: true
        }
      },
      data:[8356, 9427, 11060, 35162, 42318, 48134, 79423, 93556, 139236] // TODO api to provide series data
    }]
  }

  indexAndStockOption = {
    color: ['#a71616', '#F15521'],
    legend: {
      data: ['Total Confirmed', 'Stock Data'] // TODO switch
    },
    tooltip: {
      trigger: 'axis'
    },
    grid: { // position
      left: '6%',
      right: '12%',
      bottom: '5%',
      containLabel: true
    },
    xAxis: [{
      type: 'category',
      boundaryGap: false,
      data: ['01/01/2020','01/15/2020','01/31/2020','02/15/2020','02/29/2020','03/15/2020','03/31/2020','04/15/2020','04/30/2020','05/15/2020'], // TODO api to provide category data
    }],
    yAxis: [{
      type: 'value'
    }],
    series: [{
      name: 'Total Confirmed',
      smooth: true,
      type: 'line',
      label: {
        normal: {
          show: true
        }
      },
      data:[8356, 9427, 11060, 35162, 42318, 48134, 79423, 93556, 139236] // TODO api to provide series data
    }, {
      name: 'Stock Data',
      smooth: true,
      type: 'line',
      label: {
        normal: {
          show: true
        }
      },
      data:[98244, 93462, 71453, 54584, 51087, 41934, 31423, 18832, 13084] // TODO api to provide series data
    }]
  }

  indexAndMacroeOption = {
    color: ['#a71616', '#F6B127'],
    legend: {
      data: ['Total Confirmed', 'GDP'] // TODO switch
    },
    tooltip: {
      trigger: 'axis'
    },
    grid: { // position
      left: '6%',
      right: '12%',
      bottom: '5%',
      containLabel: true
    },
    xAxis: [{
      type: 'category',
      boundaryGap: false,
      data: ['01/01/2020','01/15/2020','01/31/2020','02/15/2020','02/29/2020','03/15/2020','03/31/2020','04/15/2020','04/30/2020','05/15/2020'], // TODO api to provide category data
    }],
    yAxis: [{
      type: 'value'
    }],
    series: [{
      name: 'Total Confirmed',
      smooth: true,
      type: 'line',
      label: {
        normal: {
          show: true
        }
      },
      data:[8356, 9427, 11060, 35162, 42318, 48134, 79423, 93556, 139236] // TODO api to provide series data
    }, {
      name: 'GDP',
      smooth: true,
      type: 'line',
      label: {
        normal: {
          show: true
        }
      },
      data:[98244, 93462, 71453, 54584, 51087, 41934, 31423, 18832, 13084] // TODO api to provide series data
    }]
  }

}
