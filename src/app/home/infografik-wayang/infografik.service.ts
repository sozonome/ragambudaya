import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Infografik } from './infografik.model';
import { HttpClient } from '@angular/common/http';
import { map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class InfografikService {
  _infografik = new BehaviorSubject<Infografik[]>([]);

  constructor(private http: HttpClient) {}

  getAllWayang() {
    return this._infografik.asObservable();
  }

  fetchWayang() {
    return this.http
      .get<{ [key: string]: Infografik }>(
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
                id: resp[key].id,
                type: resp[key].type
              });
            }
          }
          return wayang;
        }),
        tap(wayang => {
          this._infografik.next(wayang);
        })
      );
  }

  getAllInfografikByType(type:string){
    let allInfografikByType = [];
    this._infografik.subscribe(infografikArray => {
      infografikArray.map((element)=>{
        if(element.type===type){
          allInfografikByType.push(element);
        }
      })
    })
    return allInfografikByType;
  }

  getInfografik(id:string){
    let infografik;
    this._infografik.subscribe(infografikArray=>{
      infografik = infografikArray.find(wayang => wayang.id === id)
    })
    return infografik;
  }
}
