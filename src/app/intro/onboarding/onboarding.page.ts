import { Component, OnInit, ViewChild } from '@angular/core';
import { IonSlides } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-onboarding',
  templateUrl: './onboarding.page.html',
  styleUrls: ['./onboarding.page.scss'],
})
export class OnboardingPage implements OnInit {
  imgLoc = 'assets/img/onboarding/';
  onboardingPage = [
    {
      image: this.imgLoc + 'slide1.svg',
    },
    {
      image: this.imgLoc + 'slide2.svg',
    },
    {
      image: this.imgLoc + 'slide3.svg',
    },
  ];
  currentIndex: number;

  @ViewChild('onboardSlides', null) ionSlides: IonSlides;

  constructor(
    private router: Router,
  ) { }
  ngOnInit() {}

  skip(){
    this.router.navigate(['/', 'home'])
  }
  nextSlide(){
    if(this.currentIndex === 2){
      this.skip();
    }
    this.ionSlides.slideNext();
  }

  updateIndex(){
    this.ionSlides.getActiveIndex().then(index => {
      this.currentIndex = index;
    });
  }
}
