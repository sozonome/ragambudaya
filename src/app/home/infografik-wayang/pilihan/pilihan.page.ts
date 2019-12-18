import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { InfografikService } from '../infografik.service';
import { Infografik } from '../infografik.model';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-pilihan',
  templateUrl: './pilihan.page.html',
  styleUrls: ['./pilihan.page.scss'],
})
export class PilihanPage implements OnInit {
  allInfografik: Infografik[] = [];

  constructor(
    private activatedRoute: ActivatedRoute,
    private infografikService: InfografikService,
    private router: Router
  ) {}

  ngOnInit() {}

  ionViewWillEnter() {
    this.activatedRoute.paramMap.subscribe((paramMap)=>{
      if(!paramMap.has('infografikType')){
        return;
      }
      this.allInfografik = this.infografikService.getAllInfografikByType(paramMap.get('infografikType'));
    })
  }

  infografikDetail(id: string){
    this.router.navigate(['/','infografik-wayang', 'detail-wayang', id]);
  }
}