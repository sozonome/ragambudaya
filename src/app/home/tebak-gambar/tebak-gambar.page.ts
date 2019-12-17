import { Component, OnInit } from '@angular/core';
import { Quiz, Answer } from './quiz.model';
import { TebakGambarService } from './tebak-gambar.service';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

type warnType = 'right' | 'wrong' | 'missed';

@Component({
  selector: 'app-tebak-gambar',
  templateUrl: './tebak-gambar.page.html',
  styleUrls: ['../home.page.scss', './tebak-gambar.page.scss']
})

export class TebakGambarPage implements OnInit {
  questions: Quiz[]; //Questions
  curr = 0; //Current Question Pointer
  score = 0; //Current Score
  warning = undefined; //Warning Message (after answer)
  showChoice = true; 
  end = false; // End of Quiz

  timerInterval = setInterval(() => { this.timerScore() }, 1000);;
  timerCount = 15; 
  showTimer = true;

  constructor(
    private tebakGambarServices: TebakGambarService,
    private router: Router,
    private alertController: AlertController,
  ) {}

  ngOnInit() {}

  ionViewWillEnter() {
    this.questions = this.tebakGambarServices.getAllQuiz();
    if(this.questions.length == 0){
      this.router.navigate(['', 'home']);
      this.tebakGambarServices.tebakGambar();
    }
  }

  checkFetch() {
    console.log(this.questions);
  }

  startTimer(){
    this.timerInterval = setInterval(() => { this.timerScore() }, 1000);
  }
  stopTimer(){
    clearInterval(this.timerInterval);
  }

  timerScore(){
    this.timerCount--;
    if(this.timerCount<0){
      this.checkAnswer(false, 0);
    }
  }

  checkAnswer(correct: boolean, timer: number, answers?: Answer[]) {
    this.showChoice = false;
    this.showTimer = false;
    
    if (correct) {
      this.showWarning('right', timer);
    } else {
      if(answers){
        this.showWarning('wrong', timer, answers);
      } else{
        this.showWarning('missed', timer);
      }
    }
    
    if (this.curr === this.questions.length - 1) {
      this.end=true;
    }
    this.stopTimer();
  }

  showWarning(warnType: warnType, timer: number, answers?: Answer[]) {
    switch (warnType) {
      case 'right': {
        this.warning = 'Wah, Jawaban kamu benar !!';
        if(timer > 13 ){
          this.score += 7;
        }else if (timer > 10){
          this.score += 5;
        }else if(timer > 7){
          this.score += 4;
        }else if(timer > 4){
          this.score += 3;
        }else if(timer > 2){
          this.score += 2;
        }else{
          this.score += 1;
        }
        break;
      }
      case 'wrong': {
        answers.map(answer => {
          if (answer.correct) {
            this.warning = 'Jawabanmu salah, yang benar adalah ' + answer.answer;
          }
        });
        break;
      }
      case 'missed': {
        this.warning = 'Waktumu habis! Yuk lanjut ke pertanyaan selanjutnya';
      }
      default:
        break;
    }
  }

  nextQuestion() {
    this.timerCount = 15;
    if(this.end){
      this.inputNewHighScore(this.score);
    } else{
      this.curr++;
      this.showChoice = true;
      this.warning = undefined;
      this.startTimer();
      this.showTimer = true;
    }
  }

  async inputNewHighScore(score: number){
    const inputForm = await this.alertController.create({
      header: 'Selamat! Kamu berhasil menyelesaikan permainan!',
      subHeader: 'Masukkan namamu dibawah',
      inputs: [
        {
          name: 'playerName',
          type: 'text'
        }
      ],
      buttons: [
        {
          text: 'OK',
          handler: data => {
            this.tebakGambarServices.addNewScore(data.playerName, score).subscribe();
            this.tebakGambarServices.highScore();
          }
        }
      ]
    })

    await inputForm.present();
  }
}
