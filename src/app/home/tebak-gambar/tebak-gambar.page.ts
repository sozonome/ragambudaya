import { Component, OnInit } from '@angular/core';
import { Quiz, Answer } from './quiz.model';
import { TebakGambarService } from './tebak-gambar.service';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

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
  showChoice = true;
  end = false;

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

  checkAnswer(correct: boolean, answers: Answer[]) {
    if (correct) {
      this.showChoice = false;
      this.showWarning('right');
      if (this.curr === this.questions.length - 1) {
        this.end=true;
      }
    } else {
      this.showChoice = false;
      this.showWarning('wrong', answers);
    }
  }

  showWarning(warnType: warnType, answers?: Answer[]) {
    switch (warnType) {
      case 'right': {
        this.warning = 'Wah, Jawaban kamu benar !!';
        this.score++;
        break;
      }
      case 'wrong': {
        answers.map(answer => {
          if (answer.correct) {
            this.warning =
              'Jawabanmu salah, yang benar adalah ' + answer.answer;
          }
        });
        break;
      }
      default:
        break;
    }
  }

  nextQuestion() {
    if(this.end){
      this.inputNewHighScore(this.score);
    } else{
      this.curr++;
      this.showChoice = true;
      this.warning = undefined;
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
