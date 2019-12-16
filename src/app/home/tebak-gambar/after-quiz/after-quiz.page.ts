import { Component, OnInit } from '@angular/core';
import { Score } from '../quiz.model';
import { TebakGambarService } from '../tebak-gambar.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-after-quiz',
  templateUrl: './after-quiz.page.html',
  styleUrls: ['./after-quiz.page.scss'],
})
export class AfterQuizPage implements OnInit {
  scores: Score[];

  constructor(
    private tebakGambarServices: TebakGambarService,
    private router: Router
  ) { }

  ngOnInit() {
  }

  ionViewWillEnter(){
    this.scores = this.tebakGambarServices.getAllScores();
  }

  checkFetch(){
    console.log(this.scores);
  }

  playAgain(){
    this.router.navigate(['', 'tebak-gambar']);
  }

  home(){
    this.router.navigate(['']);
  }
}
