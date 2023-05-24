import { Component, OnInit } from '@angular/core';
import { WeatherService } from '../services/weather.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  tempStatus: string = 'Celcius';
  cityweatherData: any;
  constructor(private weatherService: WeatherService) {}
  ngOnInit(): void {
    this.cityWeatherDetails();
  }
  cityWeatherDetails() {
    this.weatherService.cityLists$.subscribe((cityData) => {
      console.log('in home', cityData);
      this.cityweatherData = cityData;
    });
  }
  convertToFahreneit() {
    this.tempStatus = 'Fahreneit';
  }
  convertToCelcius() {
    this.tempStatus = 'Celcius';
  }
}
