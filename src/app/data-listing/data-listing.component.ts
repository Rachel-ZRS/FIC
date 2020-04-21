import { Component, OnInit } from '@angular/core';
import { DataListingService } from '../services/data-listing.service';

@Component({
  selector: 'app-data-listing',
  templateUrl: './data-listing.component.html',
  styleUrls: ['./data-listing.component.scss']
})
export class DataListingComponent implements OnInit {
  tcSelected = true; // Total Confirmed tab is selected by default
  defaultCategory = 'confirmed';
  category_confirm = 'Total Confirmed';
  category_death = 'Total Death';

  globalSummary = {
    categoryName: "",
    categoryNumber: 0
  };
  countryDataList = [];
  selectedCountryName = "";
  indexes: any;

  // API data
  summaryData: any;
  countryListConfirm = [];
  countryListDeath = [];
  countryIndexes: any;

  constructor(private dataService: DataListingService) { }

  ngOnInit(): void {
    this.dataService.getCountryDataList().subscribe(data => {
      this.summaryData = data.globalSummary;
      this.countryListConfirm = data.countryList.confirmedList;
      this.countryListDeath = data.countryList.deathList;
      this.countryIndexes = data.countryIndexes;

      // default values
      this.getGlobalSummary(this.defaultCategory);
      this.getCountryList(this.defaultCategory);
      this.selectedCountryName = this.countryDataList[0].name;
      this.switchIndexesData(this.selectedCountryName);
    });
  }

  switchCategory(category: string): void {
    this.getGlobalSummary(category);
    this.getCountryList(category);
    this.switchIndexesData(this.selectedCountryName);
    switch (category) {
      case 'confirmed':
        this.tcSelected = true;
        break;
      case 'death':
        this.tcSelected = false;
        break;
    }
  }

  getGlobalSummary(category: string): void { // backend service to calculate by the numbers in countryDataList
    switch (category) {
      case 'confirmed':
        this.globalSummary.categoryName = this.category_confirm;
        this.globalSummary.categoryNumber = this.summaryData.globalTotalConfirmed;
        break;
      case 'death':
        this.globalSummary.categoryName = this.category_death;
        this.globalSummary.categoryNumber = this.summaryData.globalTotalDeath;
        break;
    }
  }

  getCountryList(category: string): void { // backend service to order by number in desc
    switch (category) {
      case 'confirmed':
        this.countryDataList = this.countryListConfirm;
        break;
      case 'death':
        this.countryDataList = this.countryListDeath;
        break;
    }
  }

  switchIndexesData(selectedCountry: string): void {
    this.selectedCountryName = selectedCountry;
    this.indexes = this.countryIndexes.hasOwnProperty(selectedCountry) ? this.countryIndexes[selectedCountry] : [];
  }

}
