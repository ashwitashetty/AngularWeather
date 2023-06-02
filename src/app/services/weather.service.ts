import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environment';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class WeatherService {
  cityWeatherData: BehaviorSubject<any> = new BehaviorSubject<any>([]);
  cityLists$: Observable<any> = this.cityWeatherData.asObservable();
  citySearchData: BehaviorSubject<any> = new BehaviorSubject<any>([]);
  citySearchList$: Observable<any> = this.citySearchData.asObservable();
  AllData: BehaviorSubject<any> = new BehaviorSubject<any>([]);
  AlldataLists$: Observable<any> = this.AllData.asObservable();
  MainListUpdate: any = [];
  constructor(private http: HttpClient) {}

  ngOnInit(): void {}
  fetchWeatherApi(city: string) {
    this.http.get(`${environment.fetch_weather_api}${city}`).subscribe({
      next: (response: any) => {
        const obj = {
          isFav: false,
          isRecent: false,
          weatherData: response,
        };
        this.cityWeatherData.next(obj);
        localStorage.setItem('WeatherDetails', JSON.stringify(obj));

        this.addToMainList(obj);
      },
    });
  }

  addToMainList(data: any) {
    const MainList = localStorage.getItem('MainWeatherList');
    if (MainList !== null) {
      this.MainListUpdate = JSON.parse(MainList);
      const cityName = this.MainListUpdate.map((item: any) => {
        return item?.weatherData?.location?.name;
      });

      if (cityName.includes(data?.weatherData?.location?.name)) {
        console.log('first')
        data = {
          isFav: true,
          isRecent: true,
          weatherData: data.weatherData,
        };
        this.AllData.next(this.MainListUpdate);
        localStorage.setItem('WeatherDetails', JSON.stringify(data));
      } else {
        data = {
          isFav: false,
          isRecent: true,
          weatherData: data.weatherData,
        };

        this.MainListUpdate.splice(0, 0, data);
        this.AllData.next(this.MainListUpdate);
        localStorage.setItem(
          'MainWeatherList',
          JSON.stringify(this.MainListUpdate)
        );
        localStorage.setItem('WeatherDetails', JSON.stringify(data));
      }
    } else {
      data = {
        isFav: false,
        isRecent: true,
        weatherData: data.weatherData,
      };

      this.MainListUpdate.splice(0, 0, data);
      this.AllData.next(this.MainListUpdate);
      localStorage.setItem(
        'MainWeatherList',
        JSON.stringify(this.MainListUpdate)
      );
      localStorage.setItem('WeatherDetails', JSON.stringify(data));
    }
  }

  citiesSearchApi(text: string) {
    this.http.get(`${environment.city_search_api}${text}`).subscribe({
      next: (response) => {
        this.citySearchData.next(response);
      },
    });
  }
}
