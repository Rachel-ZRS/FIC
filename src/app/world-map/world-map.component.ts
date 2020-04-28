import { Component, OnInit } from '@angular/core';

import * as echarts from 'echarts';
import { of } from 'rxjs';
import { DataListingService } from '../services/data-listing.service';

@Component({
  selector: 'app-world-map',
  templateUrl: './world-map.component.html',
  styleUrls: ['./world-map.component.scss']
})
export class WorldMapComponent implements OnInit {

  constructor(private dataService: DataListingService) {}

  mapOption = {};
  mapData: any;

  ngOnInit(): void {
    this.dataService.getCountryDataList().subscribe(data => { // TODO rename service class and function
      this.mapData = data.countryList.confirmedList; // TODO one of the 7 indexes

      of(require("../../assets/world.json")).subscribe(worldJSON => {
        echarts.registerMap('world', worldJSON);
        this.mapOption = {
          title: {
            text: 'one of the 7 indexes' // TODO
          },
          tooltip: {
            trigger: 'item',
            formatter: '{b}<br/>{c}' // Map: {a} for series name, {b} for area name, {c} for merging data, {d} for none;
          },
          visualMap: {
            type: 'piecewise',
            pieces: [
              {value: 0, color: '#fff'},
              {min: 1, max: 1000, color: '#F6E3CE'},
              {min: 1001, max: 5000, color: '#FAAC58'},
              {min: 5001, max: 10000, color: '#DF7401'},
              {min: 10001, max: 50000, color: '#FE642E'},
              {min: 50001, max: 100000, color: '#DF3A01'},
              {min: 100001, max: 500000, color: '#FF0000'},
              {min: 500001, max: 1000000, color: '#B40431'},
              {min: 1000001, max: 2000000, color: '#8A0808'},
              {min: 2000001, max: 4000000, color: '#8A0829'},
              {min: 4000001, color: '#610B0B'}
            ]
          },
          series: [
            {
              name: 'one of the 7 indexes', // TODO
              type: 'map',
              mapType: 'world', // map type should be registered
              itemStyle: {
                normal: { label: { show: false } },
                emphasis: { label: { show: true } }
              },
              data: this.mapData
            }
          ]
        };
      });
    });
  }

}
