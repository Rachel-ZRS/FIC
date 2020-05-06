import { Component } from '@angular/core';
import { DataListingService } from './services/data-listing.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'ficProject';
  serviceRes: any;

  constructor(private dataService: DataListingService) {
    this.dataService.get().subscribe(data => {
      this.serviceRes = data;
    });
  }
}
