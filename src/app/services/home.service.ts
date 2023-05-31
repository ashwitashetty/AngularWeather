import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { WeatherService } from './weather.service';

@Injectable({
  providedIn: 'root',
})
export class HomeService {
  favouriteData: BehaviorSubject<any> = new BehaviorSubject<any>([]);
  favLists$: Observable<any> = this.favouriteData.asObservable();
  FavList: any = [];
  favState: BehaviorSubject<any> = new BehaviorSubject<any>(false);
  favStatus$: Observable<any> = this.favState.asObservable();
  list: any = [];
  listUpdated: any = [];
  MainList: any = [];
  constructor(
    private http: HttpClient,
    public router: Router,
    private weatherService: WeatherService,
  ) {}

  addToFavourite(data: any) {
    const value = localStorage.getItem('FavouritesList');
    const list = localStorage.getItem('MainWeatherList');
    if (list !== null) {
      this.MainList = JSON.parse(list);
      this.MainList.map((i: any) => {
        if (
          i?.weatherData?.location?.name === data?.weatherData?.location?.name
        ) {
          i.isFav = true;
        }
        this.weatherService.AllData.next(this.MainList);
        localStorage.setItem('MainWeatherList', JSON.stringify(this.MainList));
      });
    }

    if (value !== null) {
      this.FavList = JSON.parse(value);
      const cityName = this.FavList.map(
        (item: any) => item?.weatherData?.location?.name
      );

      if (cityName.includes(data?.weatherData?.location?.name)) {
        data = {
          isFav: true,
          isRecent: data?.isRecent,
          weatherData: data.weatherData,
        };

        this.weatherService.cityWeatherData.next(data);
        localStorage.setItem('WeatherDetails', JSON.stringify(data));
      } else {
        data = {
          isFav: true,
          isRecent: data?.isRecent,
          weatherData: data.weatherData,
        };
        this.weatherService.cityWeatherData.next(data);
        localStorage.setItem('WeatherDetails', JSON.stringify(data));
        this.FavList.splice(0,0,data)
        this.favouriteData.next(this.FavList);
        localStorage.setItem('FavouritesList', JSON.stringify(this.FavList));
      }
    } else {
      data = {
        isFav: true,
        isRecent: data?.isRecent,
        weatherData: data.weatherData,
      };
      this.weatherService.cityWeatherData.next(data);
      localStorage.setItem('WeatherDetails', JSON.stringify(data));
      this.FavList.splice(0,0,data)
      this.favouriteData.next(this.FavList);
      localStorage.setItem('FavouritesList', JSON.stringify(this.FavList));
    }
  }
  deleteFavItem(data: any) {
    this.list = localStorage.getItem('FavouritesList');
    const Mainlist = localStorage.getItem('MainWeatherList');
    if (Mainlist !== null) {
      this.MainList = JSON.parse(Mainlist);
      this.MainList.map((item: any) => {
        if (
          item?.weatherData?.location?.name === data?.weatherData?.location?.name
        ) {
          item.isFav = false;
        }
        this.weatherService.AllData.next(this.MainList);
        localStorage.setItem('MainWeatherList', JSON.stringify(this.MainList));
      });
    }
    if (this.list !== null) {
      this.listUpdated = JSON.parse(this.list);

      const filterdatalist = this.listUpdated.filter((item: any) => {
        return (
          item?.weatherData?.location?.name !==
          data?.weatherData?.location?.name
        );
      });
      data = {
        isFav: false,
        isRecent: data?.isRecent,
        weatherData: data.weatherData,
      };
      localStorage.setItem('WeatherDetails', JSON.stringify(data));
      this.favouriteData.next(filterdatalist);
      localStorage.setItem('FavouritesList', JSON.stringify(filterdatalist));
      this.weatherService.cityWeatherData.next(data);
    }
  }
}
