import { Component, OnInit } from '@angular/core';
import { Infografik } from '../infografik.model';
import { InfografikService } from '../infografik.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-detail-wayang',
  templateUrl: './detail-wayang.page.html',
  styleUrls: ['./detail-wayang.page.scss'],
})
export class DetailWayangPage implements OnInit {
  infografik: Infografik;

  constructor(
    private activatedRoute: ActivatedRoute,
    private infografikService: InfografikService
  ) { }

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe((paramMap) => {
      if(!paramMap.has('infografikId')){
        return;
      }
      this.infografik = this.infografikService.getInfografik(paramMap.get('infografikId'));
    });
  }
}