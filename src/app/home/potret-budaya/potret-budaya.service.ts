import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, tap } from 'rxjs/operators';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PotretBudayaService {
  fetchedFrames = new BehaviorSubject<any[]> ([]);

  constructor(
    private http: HttpClient
  ) { }

  fetchFrame() {
    return this.http
      .get<{ [key: string]: any }>(
        'https://hatchoko-ragam-budaya.firebaseio.com/data/frame.json'
      )
      .pipe(
        map(resp => {
          const frame = [];
          for (const key in resp) {
            if (resp.hasOwnProperty(key)) {
              frame.push({
                image: resp[key].image
              });
            }
          }
          return frame;
        }),
        tap(frame => {
          this.fetchedFrames.next(frame);
        })
      );
  }

  getAllFrame() {
    return this.fetchedFrames.asObservable();
  }
}
