import { Component } from '@angular/core';
import { Quiz } from './tebak-gambar/quiz.model';
import { TebakGambarService } from './tebak-gambar/tebak-gambar.service';
import { WayangService } from './infografik-wayang/wayang.service';
import { Router } from '@angular/router';
import { LoadingController, AlertController } from '@ionic/angular';
import { PotretBudayaPage } from './potret-budaya/potret-budaya.page';
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
    private wayangSvc: WayangService,
    private potretBudayaSvc: PotretBudayaService
  ) {}

  ionViewWillEnter(){
    this.tebakGambarServices.fetchQuiz().subscribe();
    this.tebakGambarServices.fetchScores().subscribe();
    this.wayangSvc.fetchWayang().subscribe();
    this.potretBudayaSvc.fetchFrame().subscribe();
  }

  tebakGambar(){
    this.tebakGambarServices.tebakGambar();
  }
}
