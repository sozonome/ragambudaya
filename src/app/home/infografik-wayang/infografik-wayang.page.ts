import { Component, OnInit } from '@angular/core';
import { Infografik } from './infografik.model';
import { InfografikService } from './infografik.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-infografik-wayang',
  templateUrl: './infografik-wayang.page.html',
  styleUrls: ['../home.page.scss', './infografik-wayang.page.scss'],
})
export class InfografikWayangPage implements OnInit {
  infografikType = [
    'wayang',
    'rumah-adat',
    'kepulauan',
    'alat-musik'
  ]

  constructor(
    private router: Router
    ) { }

  ngOnInit() {
  }

  selectKategori(infografikType: string){
    this.router.navigate(['/','infografik-wayang', 'pilihan', infografikType]);
  }
}
