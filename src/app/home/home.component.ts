import { Component, OnInit } from '@angular/core';
import { HomeService } from '../services/home.service';
import { WeatherService } from '../services/weather.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  tempStatus: string = 'Celcius';
  cityweatherData: any;
  favCityData: any;
  value: any;
  favCityNames: any;
  favState: any = false;
  favStateUpdated: any = 'false';
  favDetails: any;
  favDetailsUpdated: any;
  constructor(
    private weatherService: WeatherService,
    private homeService: HomeService
  ) {}
  ngOnInit(): void {
    this.cityWeatherDetails();
  }
  cityWeatherDetails() {
    this.weatherService.cityLists$.subscribe((cityData) => {
      this.favDetails = localStorage.getItem('FavouritesList');
      if (this.favDetails !== null) {
        this.favDetailsUpdated = JSON.parse(this.favDetails);

        if (this.favDetailsUpdated.length > 0) {
          this.favDetailsUpdated.map((item: any) => {
            if (
              item?.weatherData?.location?.name ===
              cityData?.weatherData?.location?.name
            ) {
              cityData = {
                isFav: true,
                isRecent: cityData.isRecent,
                weatherData: cityData.weatherData,
              };
              this.cityweatherData = cityData;
              localStorage.setItem('WeatherDetails', JSON.stringify(cityData));
            } else {
              this.cityweatherData = cityData;
              localStorage.setItem('WeatherDetails', JSON.stringify(cityData));
            }
          });
        } else {
          this.cityweatherData = cityData;
          localStorage.setItem('WeatherDetails', JSON.stringify(cityData));
        }
      } else {
        this.cityweatherData = cityData;

        localStorage.setItem('WeatherDetails', JSON.stringify(cityData));
      }
    });
  }
  convertToFahreneit() {
    this.tempStatus = 'Fahreneit';
  }
  convertToCelcius() {
    this.tempStatus = 'Celcius';
  }

  addToFav(data: any) {
    this.homeService.addToFavourite(data);
  }
  removeFromFav(data: any) {
    this.homeService.deleteFavItem(data);
  }
}
