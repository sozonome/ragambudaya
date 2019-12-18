import { Component } from '@angular/core';
import { Quiz } from './tebak-gambar/quiz.model';
import { TebakGambarService } from './tebak-gambar/tebak-gambar.service';
import { InfografikService } from './infografik-wayang/infografik.service';
import { PotretBudayaService } from './potret-budaya/potret-budaya.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  questions: Quiz[];

  constructor(
    private tebakGambarServices: TebakGambarService,
    private infografikService: InfografikService,
    private potretBudayaSvc: PotretBudayaService
  ) {}

  ionViewWillEnter(){
    this.tebakGambarServices.fetchQuiz().subscribe();
    this.tebakGambarServices.fetchScores().subscribe();
    this.infografikService.fetchWayang().subscribe();
    this.potretBudayaSvc.fetchFrame().subscribe();
  }

  tebakGambar(){
    this.tebakGambarServices.tebakGambar();
  }
}
