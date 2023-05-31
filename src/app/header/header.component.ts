import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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

  constructor(
    private weatherServices: WeatherService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.date = new Date();
  }

  handleChange(event: any): void {
    if (event.length > 0) {
      this.weatherServices.citiesSearchApi(event);
      this.weatherServices.citySearchList$.subscribe((cityResults: any) => {
        this.cityResults = cityResults;
      });
    }
  }
  handleCityClick(city: any) {
    this.weatherServices.fetchWeatherApi(city);
    this.router.navigate(['/']);

    this.cityResults = [];
  }
}
