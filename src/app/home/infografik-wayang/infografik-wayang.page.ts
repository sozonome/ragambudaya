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
    {type: 'wayang', thumbnail: "https://firebasestorage.googleapis.com/v0/b/hatchoko-ragam-budaya.appspot.com/o/wayang-kulit.svg?alt=media&token=d307bb73-cd5a-4c0b-83c8-82ff8ff25ee0"},
    {type: 'rumah-adat', thumbnail: "https://firebasestorage.googleapis.com/v0/b/hatchoko-ragam-budaya.appspot.com/o/sumber-jakarta-tourismgoid.jpg?alt=media&token=c5348b91-befc-4dc9-8a91-08271ae60a0a"},
    {type: 'kepulauan', thumbnail: "https://firebasestorage.googleapis.com/v0/b/hatchoko-ragam-budaya.appspot.com/o/dsds.jpg?alt=media&token=1b084d29-99b4-4e15-9dd0-1edbc5afd905"},
    {type: 'alat-musik', thumbnail: "https://firebasestorage.googleapis.com/v0/b/hatchoko-ragam-budaya.appspot.com/o/6.%20Cungklik.jpg?alt=media&token=ccfc0696-46a7-4c11-8f98-5ef6149a8e53"}
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
