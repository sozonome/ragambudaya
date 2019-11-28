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
    console.log(this.questions)
    this.tebakGambarServices.fetchQuiz().subscribe(quiz=>
      this.questions = quiz 
    );
    this.wayangSvc.fetchWayang().subscribe();
  }
}
