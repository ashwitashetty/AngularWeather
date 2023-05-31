import { JsonPipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ClearAllComponent } from '../clear-all/clear-all.component';
import { HomeService } from '../services/home.service';
import { WeatherService } from '../services/weather.service';

@Component({
  selector: 'app-recent',
  templateUrl: './recent.component.html',
  styleUrls: ['./recent.component.css'],
})
export class RecentComponent implements OnInit {
  recentCityData: any;
  favData: any;
  recentUpdated: any;
  constructor(
    public dialog: MatDialog,
    private homeservice: HomeService,
    private weatherService: WeatherService,
    private router: Router
  ) {}
  ngOnInit(): void {
    this.weatherService.AlldataLists$.subscribe((res: any) => {
      this.recentCityData = res;
    });
  }
  openDialog(): void {
    const dialogRef = this.dialog.open(ClearAllComponent, {
      width: '458px',
      height: '210px',
    });
  }
  addToFavourite(data: any) {
    this.homeservice.addToFavourite(data);
  }
  removeFromFavourite(data: any) {
    this.homeservice.deleteFavItem(data);
  }
  showRecentDetails(data: any) {
    this.weatherService.cityWeatherData.next(data);
    localStorage.setItem('WeatherDetails', JSON.stringify(data));
    this.router.navigate(['/']);
  }
}
