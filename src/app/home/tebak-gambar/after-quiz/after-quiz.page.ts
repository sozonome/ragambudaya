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
    //Get scores
    let fetchedScores = this.tebakGambarServices.getAllScores();
    //Sorting score from the highest
    let sortedScores = fetchedScores.sort(function(a, b){return b.score - a.score});
    
    this.scores = sortedScores.slice(0, 10);
    console.log(fetchedScores, sortedScores, this.scores)
  }

  checkFetch(){
    console.log(this.scores);
  }

  playAgain(){
    //To reset quiz from beginning
    this.router.navigate(['/', 'home']);
    this.router.navigate(['/', 'tebak-gambar']);
  }
}
