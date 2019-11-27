import { BehaviorSubject } from 'rxjs';
import { Quiz } from './quiz.model';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { take, map, tap, switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TebakGambarService {
  quizzes = new BehaviorSubject<Quiz[]>([]);

  constructor(private http: HttpClient) {}

  fetchQuiz() {
    return this.http
      .get<{ [key: string]: Quiz }>(
        'https://hatchoko-ragam-budaya.firebaseio.com/data/quiz.json'
      )
      .pipe(
        map(resp => {
          const quiz = [];
          for (const key in resp) {
            if (resp.hasOwnProperty(key)) {
              quiz.push({
                id: resp[key].id,
                question: resp[key].question,
                answers: resp[key].answers
              });
            }
          }
          return quiz;
        }),
        tap(quiz => {
          this.quizzes.next(quiz);
        })
      );
  }

  getAllQuiz() {
    return this.quizzes.getValue();
  }
}
