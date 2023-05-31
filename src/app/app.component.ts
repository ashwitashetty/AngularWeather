import { Component, OnInit } from '@angular/core';
import { HomeService } from './services/home.service';
import { WeatherService } from './services/weather.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'NewWeather';
  constructor(private weatherServices:WeatherService, private homeServices:HomeService){

  }
  ngOnInit(): void {
    this.weatherServices.fetchWeatherApi('Udupi');
    const favData = localStorage.getItem("FavouritesList");
    if(favData !== null){
      const favDataUpdated = JSON.parse(favData)
      this.homeServices.favouriteData.next(favDataUpdated)
    }else{
      this.homeServices.favouriteData.next([])
    }
  }
}
