import { Component, OnInit } from '@angular/core';
import { Wayang } from './wayang.model';
import { WayangService } from './wayang.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-infografik-wayang',
  templateUrl: './infografik-wayang.page.html',
  styleUrls: ['../home.page.scss', './infografik-wayang.page.scss'],
})
export class InfografikWayangPage implements OnInit {
  allWayang: Wayang[] = [];

  constructor(
    private wayangSvc: WayangService,
    private router: Router
    ) { }

  ngOnInit() {
    // this.wayangSvc.getAllWayang()
    // .subscribe(wayangArray => {
    //   this.allWayang = wayangArray
    // })
    // this.wayangSvc.fetchWayang().subscribe();
    // console.log(this.allWayang)
  }

  ionViewWillEnter() {
    this.allWayang = this.wayangSvc.getAllWayang();
    console.log(this.allWayang)
  }

  wayangDetail(id: string){
    this.router.navigate(['/', 'home', 'infografik-wayang', 'detail-wayang', id]);
  }
}
