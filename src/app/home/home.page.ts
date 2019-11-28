import { Component } from '@angular/core';
import { Quiz } from './tebak-gambar/quiz.model';
import { TebakGambarService } from './tebak-gambar/tebak-gambar.service';
import { WayangService } from './infografik-wayang/wayang.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  questions: Quiz[];

  constructor(
    private tebakGambarServices: TebakGambarService,
    private wayangSvc: WayangService
  ) {}

  ionViewWillEnter(){
<<<<<<< HEAD
    console.log(this.questions)
    this.tebakGambarServices.fetchQuiz().subscribe(quiz=>
      this.questions = quiz 
    );
    this.wayangSvc.fetchWayang().subscribe();
=======
    this.tebakGambarServices.fetchQuiz().subscribe();
>>>>>>> d0527abd0e4c3ae972122aac1a6fe8181341bd6f
  }
}
