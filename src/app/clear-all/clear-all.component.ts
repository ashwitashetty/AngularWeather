import { Component, OnInit } from '@angular/core';
import { WeatherService } from '../services/weather.service';

@Component({
  selector: 'app-clear-all',
  templateUrl: './clear-all.component.html',
  styleUrls: ['./clear-all.component.css'],
})
export class ClearAllComponent implements OnInit {
  constructor( private weatherService: WeatherService) {}

  ngOnInit(): void {}
  clearRecentSearch() {
    this.weatherService.AllData.next([])
    localStorage.setItem('MainWeatherList',JSON.stringify([]));
  }
}
