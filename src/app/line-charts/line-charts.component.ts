import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-line-charts',
  templateUrl: './line-charts.component.html',
  styleUrls: ['./line-charts.component.scss']
})
export class LineChartsComponent implements OnInit {
  @Input() serviceRes: any;
  statisticByCountry: any;

  sevenIndexesCountry1 = {};
  sevenIndexesCountry2 = {};
  indexAndStockCountry1 = {};
  indexAndStockCountry2 = {};
  indexAndMacroeCountry1 = {};
  indexAndMacroeCountry2 = {};

  selectedIndexId = 'tc'; // default 1/7 index
  indexesMapping = { // TODO abstract
    'tc': 'Total Confirmed',
    'td': 'Total Death',
    'tr': 'Total Recovered',
    'nowc': 'Now Confirmed',
    'newc': 'New Confirmed',
    'nd': 'New Death',
    'nr': 'New Recovered'
  };
  selectedCountry1 = 'China'; // default
  selectedCountry2 = 'United States'; // default

  constructor() { }

  ngOnInit(): void {
    this.statisticByCountry = this.serviceRes.statisticByCountry;
    this.loadSevenIndexesChart('China', 'United States'); // default
  }

  buildCategoryAndSeriesData(data: any) {
    let categoryData = [];
    let seriesData = [];
    data.forEach(element => {
      categoryData.push(element.date);
      seriesData.push(element.value);
    });
    return {
      "categoryData": categoryData,
      "seriesData": seriesData
    };
  }

  buildIndexDataByCountry(countryName: string) {
    const countryStatistic = this.statisticByCountry.hasOwnProperty(countryName) ? this.statisticByCountry[countryName] : {};
    const countryIndexData = countryStatistic.indexesWithDates ? countryStatistic.indexesWithDates : {};
    const indexData = countryIndexData.hasOwnProperty(this.selectedIndexId) ? countryIndexData[this.selectedIndexId] : [];
    return indexData;
  }

  buildSevenIndexesChartOption(chartData: any) {
    return {
      color: ['#a71616'],
      legend: {
        data: [this.indexesMapping[this.selectedIndexId]]
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
        data: chartData.categoryData
      }],
      yAxis: [{
        type: 'value'
      }],
      series: [{
        name: this.indexesMapping[this.selectedIndexId], // must be the same as legend data
        smooth: true,
        type: 'line', // line | bar
        label: {
          normal: {
            show: true
          }
        },
        data: chartData.seriesData
      }]
    };
  }

  loadSevenIndexesChart(countryName1: string, countryName2: string) {
    if (countryName1) {
      const indexData = this.buildIndexDataByCountry(countryName1);
      const chartData = this.buildCategoryAndSeriesData(indexData);
      this.sevenIndexesCountry1 = this.buildSevenIndexesChartOption(chartData);
    }
    if (countryName2) {
      const indexData = this.buildIndexDataByCountry(countryName2);
      const chartData = this.buildCategoryAndSeriesData(indexData);
      this.sevenIndexesCountry2 = this.buildSevenIndexesChartOption(chartData);
    }
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

  selectIndex(id: string) {
    this.selectedIndexId = id;
    this.loadSevenIndexesChart(this.selectedCountry1, this.selectedCountry2);
  }

  selectME(id: string) {

  }

  selectCountry1(name: string) {
    this.selectedCountry1 = name;
    this.loadSevenIndexesChart(name, "");
  }

  selectCountry2(name: string) {
    this.selectedCountry2 = name;
    this.loadSevenIndexesChart("", name);
  }
}
