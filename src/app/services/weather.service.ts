import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from '../environment';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class WeatherService {
  //   cityWeatherData?: any = {};
  //   cityWeatherDataList?: any = [];

  cityWeatherData: BehaviorSubject<any> = new BehaviorSubject<any>([]);
  cityLists$: Observable<any> = this.cityWeatherData.asObservable();
  citySearchData: BehaviorSubject<any> = new BehaviorSubject<any>([]);
  citySearchList$: Observable<any> = this.citySearchData.asObservable();
  constructor(private http: HttpClient, public router: Router) {}

  ngOnInit(): void {}
  fetchWeatherApi(city: string) {
    this.http.get(`${environment.fetch_weather_api}${city}`).subscribe({
      next: (response) => {
        this.cityWeatherData.next(response);
      },
    });
  }

  citiesSearchApi(text: string) {
 this.http.get(`${environment.city_search_api}${text}`).subscribe({
        next: (response) => {
          this.citySearchData.next(response);
        },
      });
  }
  fetchWeatherData(city: string) {
    console.log('gh');
  }
}
