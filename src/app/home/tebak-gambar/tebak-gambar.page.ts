import { Component, OnInit } from '@angular/core';
import { Quiz, Answer } from './quiz.model';
import { TebakGambarService } from './tebak-gambar.service';
import { Router } from '@angular/router';

type warnType = 'right' | 'wrong';

@Component({
  selector: 'app-tebak-gambar',
  templateUrl: './tebak-gambar.page.html',
  styleUrls: ['../home.page.scss', './tebak-gambar.page.scss']
})
export class TebakGambarPage implements OnInit {
  questions: Quiz[];
  curr = 0;
  score = 0;
  warning = undefined;
  showChoice= true;

  constructor(
    private tebakGambarServices: TebakGambarService,
    private router: Router
  ) {}

  ngOnInit() {}

  ionViewWillEnter() {
    this.questions = this.tebakGambarServices.getAllQuiz();
  }

  checkFetch() {
    console.log(this.questions);
  }

  checkAnswer(correct: boolean, answers: Answer[]) {
    if (correct) {
      this.showChoice = false;
      this.showWarning('right');
      if (this.curr === this.questions.length - 1) {
        console.log('End of Questions');
      }
    } else {
      this.showChoice = false;
      this.showWarning('wrong', answers);
    }
    console.log(correct ? 'Jawaban Betul' : 'Jawaban Salah');
  }

  showWarning(warnType: warnType, answers?:Answer[]) {
    switch(warnType){
      case 'right': {
        this.warning = 'Wah, Jawaban kamu benar !!';
        this.score++;
        break;
      }
      case 'wrong': {
        answers.map(answer => {
          if(answer.correct){
            this.warning = 'Jawabanmu salah, yang benar adalah ' + answer.answer;
          }
        });
        break;
      }
      default: break;
    }
  }

  nextQuestion(){
    this.curr++;
    this.showChoice = true;
    this.warning = undefined;
  }

  testScore() {
    this.score++;
  }
}
