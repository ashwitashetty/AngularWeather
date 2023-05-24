import { Component, OnInit } from '@angular/core';
import { WeatherService } from '../services/weather.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  cityName: string = '';
  cityResults: any = [];

  active = 'active';
  date: any;

  constructor(private weatherServices: WeatherService) {}

  ngOnInit(): void {
    this.date = new Date();
  }

  handleChange(event: any): void {
    console.log('@@@@@', event.length);
    if (event.length > 0) {
      this.weatherServices.citiesSearchApi(event);
      this.weatherServices.citySearchList$.subscribe((cityResults: any) => {
        // console.log('city', cityResults);
        this.cityResults = cityResults;
      });
    }
  }
  handleCityClick(city: any) {
    this.weatherServices.fetchWeatherApi(city);
    // this.weatherServices.cityLists$.subscribe((cityDetails: any) => {
    //   console.log('first', cityDetails);

    // });
    this.cityResults = [];
  }
}
