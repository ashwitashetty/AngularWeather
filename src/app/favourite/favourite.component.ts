import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { RemoveAllComponent } from '../remove-all/remove-all.component';
import { HomeService } from '../services/home.service';
import { WeatherService } from '../services/weather.service';

@Component({
  selector: 'app-favourite',
  templateUrl: './favourite.component.html',
  styleUrls: ['./favourite.component.css'],
})
export class FavouriteComponent implements OnInit {
  favouriteCities: any;
  favCityData: any;

  constructor(
    private homeService: HomeService,
    public dialog: MatDialog,
    private router: Router,
    private weatherService: WeatherService
  ) {}
  ngOnInit() {
    this.homeService.favLists$.subscribe((res) => {
      this.favCityData = res;
    });
  }
  openDialog(): void {
    const dialogRef = this.dialog.open(RemoveAllComponent, {
      width: '458px',
      height: '210px',
    });
  }
  showFavDetails(data: any) {
    this.weatherService.cityWeatherData.next(data);
    localStorage.setItem('WeatherDetails', JSON.stringify(data));
    this.router.navigate(['/']);
  }
  removeFromFavList(data: any) {
    this.homeService.deleteFavItem(data);
  }
}
