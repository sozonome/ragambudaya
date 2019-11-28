import { Component, OnInit } from '@angular/core';
import { Wayang } from '../wayang.model';
import { WayangService } from '../wayang.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-detail-wayang',
  templateUrl: './detail-wayang.page.html',
  styleUrls: ['./detail-wayang.page.scss'],
})
export class DetailWayangPage implements OnInit {
  wayang: Wayang;

  constructor(
    private activatedRoute: ActivatedRoute,
    private wayangServices: WayangService
  ) { }

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe((paramMap) => {
      if(!paramMap.has('wayangId')){
        console.log('gk ada')
        return;
      }
      this.wayang = this.wayangServices.getWayang(paramMap.get('wayangId'));
    });
  }

}
