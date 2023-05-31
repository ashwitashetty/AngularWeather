import { Component, OnInit } from '@angular/core';
import { HomeService } from '../services/home.service';
import { WeatherService } from '../services/weather.service';

@Component({
  selector: 'app-remove-all',
  templateUrl: './remove-all.component.html',
  styleUrls: ['./remove-all.component.css'],
})
export class RemoveAllComponent implements OnInit {
  MainList: any = [];
  constructor(
    private homeService: HomeService,
    private weatherService: WeatherService
  ) {}
  cityWeatherData: any;
  ngOnInit(): void {}

  clearFavouriteCities() {
    const Mainlist = localStorage.getItem('MainWeatherList');
    if (Mainlist !== null) {
      this.MainList = JSON.parse(Mainlist);
      this.MainList.map((id: number) => {
        this.MainList[id].isFav = false;
        this.weatherService.AllData.next(this.MainList);
        localStorage.setItem('MainWeatherList', JSON.stringify(this.MainList));
      });
    }
    const data: any = localStorage.getItem('WeatherDetails');
    let dataList = JSON.parse(data);

    if (dataList?.isFav === true) {
      dataList = {
        isFav: false,
        isRecent: dataList.isRecent,
        weatherData: dataList.weatherData,
      };
      this.weatherService.cityWeatherData.next(dataList);
      localStorage.setItem('WeatherDetails', JSON.stringify(dataList));
    }
    this.homeService.favouriteData.next([]);
    localStorage.setItem('FavouritesList', JSON.stringify([]));
  }
}
