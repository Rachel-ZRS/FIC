import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgxEchartsModule } from 'ngx-echarts';
import { DataListingComponent } from './data-listing/data-listing.component';

import { HttpClientModule }    from '@angular/common/http';
import { WorldMapComponent } from './world-map/world-map.component';
import { LineChartsComponent } from './line-charts/line-charts.component';

@NgModule({
  declarations: [
    AppComponent,
    DataListingComponent,
    WorldMapComponent,
    LineChartsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgxEchartsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class AppModule { }
