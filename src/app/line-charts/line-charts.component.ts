import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-line-charts',
  templateUrl: './line-charts.component.html',
  styleUrls: ['./line-charts.component.scss']
})
export class LineChartsComponent implements OnInit {
  @Input() serviceRes: any;
  statisticByCountry: any;
  countries = [];

  sevenIndexesCountry1 = {};
  sevenIndexesCountry2 = {};
  indexAndStockCountry1 = {};
  indexAndStockCountry2 = {};
  indexAndMacroeCountry1 = {};
  indexAndMacroeCountry2 = {};

  selectedIndexId = 'tc'; // default 1/7 index
  indexesMapping = {
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
  selectedEconomic = 'GDP'; // default

  constructor() { }

  ngOnInit(): void {
    this.statisticByCountry = this.serviceRes.statisticByCountry;
    for (const key in this.statisticByCountry) {
      if (this.statisticByCountry.hasOwnProperty(key)) {
        this.countries.push(key);
      }
    }
    this.loadSevenIndexesChart('China', 'United States'); // default
    this.loadIndexAndStockChart('China', 'United States'); // default
    this.loadIndexAndEconomicChart('China', 'United States'); // default
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


  buildIndexAndStockDataByCountry(countryName: string) {
    const indexData = this.buildIndexDataByCountry(countryName);
    const countryStatistic = this.statisticByCountry.hasOwnProperty(countryName) ? this.statisticByCountry[countryName] : {};
    const stockData = countryStatistic.stockDataWithDates ? countryStatistic.stockDataWithDates : [];
    return {
      "indexData": indexData,
      "stockData": stockData
    };
  }

  buildIndexAndStockChartData(indexAndStockData: any) {
    const chartData_index = this.buildCategoryAndSeriesData(indexAndStockData.indexData);
    const chartData_stock = this.buildCategoryAndSeriesData(indexAndStockData.stockData);
    const chartData = {
      "categories": chartData_index.categoryData,
      "series": {
        "indexSeries": chartData_index.seriesData,
        "stockSeries": chartData_stock.seriesData
      }
    };
    return chartData;
  }

  buildIndexAndStockChartOption(chartData: any) {
    return {
      color: ['#a71616', '#F15521'],
      legend: {
        data: [this.indexesMapping[this.selectedIndexId], 'Stock Data']
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
        data: chartData.categories
      }],
      yAxis: [{
        type: 'value'
      }],
      series: [{
        name: this.indexesMapping[this.selectedIndexId],
        smooth: true,
        type: 'line',
        label: {
          normal: {
            show: true
          }
        },
        data: chartData.series.indexSeries
      }, {
        name: 'Stock Data',
        smooth: true,
        type: 'line',
        label: {
          normal: {
            show: true
          }
        },
        data: chartData.series.stockSeries
      }]
    };
  }

  loadIndexAndStockChart(countryName1: string, countryName2: string) {
    if (countryName1) {
      const indexAndStockData = this.buildIndexAndStockDataByCountry(countryName1);
      const chartData = this.buildIndexAndStockChartData(indexAndStockData);
      this.indexAndStockCountry1 = this.buildIndexAndStockChartOption(chartData);
    }
    if (countryName2) {
      const indexAndStockData = this.buildIndexAndStockDataByCountry(countryName2);
      const chartData = this.buildIndexAndStockChartData(indexAndStockData);
      this.indexAndStockCountry2 = this.buildIndexAndStockChartOption(chartData);
    }
  }


  buildIndexAndEconomicDataByCountry(countryName: string) {
    const indexData = this.buildIndexDataByCountry(countryName);
    const countryStatistic = this.statisticByCountry.hasOwnProperty(countryName) ? this.statisticByCountry[countryName] : {};
    const economicData = countryStatistic.macroeconomicWithDates ? countryStatistic.macroeconomicWithDates : {};
    return {
      "indexData": indexData,
      "economicData": economicData.hasOwnProperty(this.selectedEconomic) ? economicData[this.selectedEconomic] : []
    };
  }

  buildIndexAndEconomicChartData(indexAndEconomicData: any) {
    const chartData_index = this.buildCategoryAndSeriesData(indexAndEconomicData.indexData);
    const chartData_economic = this.buildCategoryAndSeriesData(indexAndEconomicData.economicData);
    const chartData = {
      "categories": chartData_index.categoryData,
      "series": {
        "indexSeries": chartData_index.seriesData,
        "economicSeries": chartData_economic.seriesData
      }
    };
    return chartData;
  }

  buildIndexAndEconomicChartOption(chartData: any) {
    return {
      color: ['#a71616', '#F6B127'],
      legend: {
        data: [this.indexesMapping[this.selectedIndexId], this.selectedEconomic]
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
        data: chartData.categories
      }],
      yAxis: [{
        type: 'value'
      }],
      series: [{
        name: this.indexesMapping[this.selectedIndexId],
        smooth: true,
        type: 'line',
        label: {
          normal: {
            show: true
          }
        },
        data: chartData.series.indexSeries
      }, {
        name: this.selectedEconomic,
        smooth: true,
        type: 'line',
        label: {
          normal: {
            show: true
          }
        },
        data: chartData.series.economicSeries
      }]
    };
  }

  loadIndexAndEconomicChart(countryName1: string, countryName2: string) {
    if (countryName1) {
      const indexAndEconomicData = this.buildIndexAndEconomicDataByCountry(countryName1);
      const chartData = this.buildIndexAndEconomicChartData(indexAndEconomicData);
      this.indexAndMacroeCountry1 = this.buildIndexAndEconomicChartOption(chartData);
    }
    if (countryName2) {
      const indexAndEconomicData = this.buildIndexAndEconomicDataByCountry(countryName2);
      const chartData = this.buildIndexAndEconomicChartData(indexAndEconomicData);
      this.indexAndMacroeCountry2 = this.buildIndexAndEconomicChartOption(chartData);
    }
  }


  selectIndex(id: string) {
    this.selectedIndexId = id;
    this.loadSevenIndexesChart(this.selectedCountry1, this.selectedCountry2);
    this.loadIndexAndStockChart(this.selectedCountry1, this.selectedCountry2);
    this.loadIndexAndEconomicChart(this.selectedCountry1, this.selectedCountry2);
  }

  selectME(id: string) {
    this.selectedEconomic = id;
    this.loadIndexAndEconomicChart(this.selectedCountry1, this.selectedCountry2);
  }

  selectCountry1(name: string) {
    this.selectedCountry1 = name;
    this.loadSevenIndexesChart(name, "");
    this.loadIndexAndStockChart(name, "");
    this.loadIndexAndEconomicChart(name, "");
  }

  selectCountry2(name: string) {
    this.selectedCountry2 = name;
    this.loadSevenIndexesChart("", name);
    this.loadIndexAndStockChart("", name);
    this.loadIndexAndEconomicChart("", name);
  }
}
