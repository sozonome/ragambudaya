import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Wayang } from './wayang.model';
import { HttpClient } from '@angular/common/http';
import { map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class WayangService {
  _wayang = new BehaviorSubject<Wayang[]>([]);

  constructor(private http: HttpClient) {}

  getAllWayang() {
    return this._wayang.getValue();
  }

  fetchWayang() {
    return this.http
      .get<{ [key: string]: Wayang }>(
        'https://hatchoko-ragam-budaya.firebaseio.com/data/infografis.json'
      )
      .pipe(
        map(resp => {
          const wayang = [];
          for (const key in resp) {
            if (resp.hasOwnProperty(key)) {
              wayang.push({
                content: resp[key].content,
                image: resp[key].image,
                title: resp[key].title,
                thumbnail: resp[key].thumbnail,
                id: resp[key].id
              });
            }
          }
          return wayang;
        }),
        tap(wayang => {
          this._wayang.next(wayang);
        })
      );
  }

  getWayang(id:string){
    let wayang;
    this._wayang.subscribe(wayangArray=>{
      wayang = wayangArray.find(wayang => wayang.id === id)
    })
    return wayang;
  }
}
