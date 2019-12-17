import { BehaviorSubject } from 'rxjs';
import { Quiz, Score } from './quiz.model';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { take, map, tap, switchMap } from 'rxjs/operators';
import { LoadingController, AlertController } from '@ionic/angular';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class TebakGambarService {
  quizzes = new BehaviorSubject<Quiz[]>([]);
  scores = new BehaviorSubject<Score[]>([]);

  constructor(
    private http: HttpClient,
    private loadingController: LoadingController,
    private router: Router,
    private alertController: AlertController,
  ) {}

  // Routing & inizializations
  tebakGambar(){
    this.loadingController.create({
      keyboardClose: true,
      message: 'Loading...'
    }).then(loadingEl=>{
      loadingEl.present();
      setTimeout(()=>{
        let check = this.getAllQuizzes();
        if(check.length>0){
          loadingEl.dismiss();
          this.router.navigate(['/', 'tebak-gambar'])
        }else{
          loadingEl.dismiss();
          this.fetchQuizAlert();
        }
      }, 1000)
    })
  }

  highScore(){
    this.loadingController.create({
      keyboardClose: true,
      message: 'Loading...'
    }).then(loadingEl=>{
      loadingEl.present();
      setTimeout(()=>{
        loadingEl.dismiss();
        this.router.navigate(['', 'after-quiz'])
      }, 1000)
    })
  }

  async fetchQuizAlert(){
    const alert = await this.alertController.create({
      header: 'Gagal Load',
      message: 'Mungkin Anda sedang tidak terhubung dengan Internet. Mohon coba kembali.',
      buttons: ['OK']
    })
    await alert.present();
  }


  // Fetch and Add --> Firebase

  fetchQuiz() {
    return this.http
      .get<{ [key: string]: Quiz }>(
        'https://hatchoko-ragam-budaya.firebaseio.com/data/quiz/questions.json'
      )
      .pipe(
        map(resp => {
          const quiz = [];
          for (const key in resp) {
            if (resp.hasOwnProperty(key)) {
              quiz.push({
                id: resp[key].id,
                image: resp[key].image ? resp[key].image : null,
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
    return this.quizzes.asObservable();
  }

  getAllQuizzes(){
    return this.quizzes.getValue();
  }

  fetchScores() {
    return this.http
      .get<{ [key: string]: Score }>(
        'https://hatchoko-ragam-budaya.firebaseio.com/data/quiz/scores.json'
      )
      .pipe(
        map(resp => {
          const score = [];
          for (const key in resp) {
            if (resp.hasOwnProperty(key)) {
              score.push({
                id: resp[key].id,
                name: resp[key].name,
                score: resp[key].score
              });
            }
          }
          return score;
        }),
        tap(score => {
          this.scores.next(score);
        })
      );
  }

  getAllScores(){
    return this.scores.getValue();
  }

  addNewScore(name: string, score: number){
    let newScore:Score = {
      name: name,
      score: score,
      id: 's' + (this.scores.getValue().length + 1),
    }
    
    return this.http
      .post<{name: string}>(
        'https://hatchoko-ragam-budaya.firebaseio.com/data/quiz/scores.json',
        { ...newScore }
      )
      .pipe(
        switchMap(resp => {
          console.log(resp);
          return this.scores.asObservable();
        }),
        take(1),
        tap(scoresArray => {
          this.scores.next(scoresArray.concat(newScore));
        })
      )
  }
}
