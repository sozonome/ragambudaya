import { Component, OnInit } from '@angular/core';
import { Quiz } from './quiz.model';
import { TebakGambarService } from './tebak-gambar.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tebak-gambar',
  templateUrl: './tebak-gambar.page.html',
  styleUrls: ['../home.page.scss', './tebak-gambar.page.scss']
})
export class TebakGambarPage implements OnInit {
  questions:Quiz[];
  curr = 0;
  score = 0;

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

  checkAnswer(correct: boolean) {
    if (correct) {
      this.score++;
      if(this.curr === this.questions.length-1){
        console.log("End of Questions")
      }else{
        this.curr++;
      }
    }
    console.log(correct ? 'Jawaban Betul' : 'Jawaban Salah');
  }

  testScore(){
    this.score++;
  }
}
