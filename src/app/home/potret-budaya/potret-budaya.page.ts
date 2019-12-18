import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { CameraPreview, CameraPreviewPictureOptions, CameraPreviewOptions, CameraPreviewDimensions } from '@ionic-native/camera-preview/ngx';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';
import * as watermark from 'watermarkjs';
import { HttpClient } from '@angular/common/http';
import { map, tap } from 'rxjs/operators';
import { BehaviorSubject } from 'rxjs';
import { PotretBudayaService } from './potret-budaya.service';

@Component({
  selector: 'app-potret-budaya',
  templateUrl: './potret-budaya.page.html',
  styleUrls: ['../home.page.scss', './potret-budaya.page.scss'],
  encapsulation: ViewEncapsulation.None
})
export class PotretBudayaPage implements OnInit {
  
  photo: string = null;
  imgData: any;
  reset: boolean;
  blobImage: any = null;
  sharePic: any;
  cameraOpened: boolean = false;
  picTaken: boolean;
  showFrame: boolean = false;
  random: string;
  framePaths = [
    'assets/img/batik-frame.svg', 
    'assets/img/frame-2.svg',
    'assets/img/LAUT.png',
    'assets/img/mahkota siger.svg'
  ];
  pointer: number = 0;

  constructor(
    private cameraPreview: CameraPreview,
    private socialSharing: SocialSharing,
    private http: HttpClient,
    private potretBudayaSvc: PotretBudayaService
  ) { }

  ngOnInit() {

  }

  ionViewWillEnter(){
    this.runCamera();
    // this.potretBudayaSvc.getAllFrame().subscribe((frames) => {
    //   this.framePaths = frames;
    // });
  }

  runCamera() {
    this.cameraOpened = true;
    this.picTaken = false;
    const cameraPreviewOpts: CameraPreviewOptions = {
      x: window.screen.width * 0.1,
      y: window.screen.height * 0.3,
      width: window.screen.width * 0.8,
      height: window.screen.height * 0.6,
      camera: 'rear',
      tapPhoto: true,
      previewDrag: true,
      toBack: true,
      alpha: 1
    }
    
    this.cameraPreview.startCamera(cameraPreviewOpts).then(
      (res) => {
        this.reset = false;
        this.showFrame = true; 
        console.log(res)
      },
      (err) => {
        console.log(err)
      }
    );

  }

  takePicture() {
    const pictureOpts: CameraPreviewPictureOptions = {
      width: 1280,
      height: 1280,
      quality: 100
    }

    this.cameraPreview.takeSnapshot(pictureOpts).then((imageData) => {
      this.reset = true;
      this.cameraOpened = false;
      this.picTaken = true;
      this.photo = 'data:image/jpeg;base64,' + imageData;
      
      fetch(this.photo)
      .then(res => res.blob())
      .then(blob => {
        this.blobImage = blob;
        this.addFrame();
        this.showFrame = false;
      });
      this.cameraPreview.stopCamera();
    });
  }
  
  addFrame(){

    watermark([this.blobImage, this.framePaths[this.pointer]])
    .image(watermark.image.center(1))
    .then(img => {
      this.sharePic = img.src;
    })
  }

  sharePicture(){
    this.socialSharing.share(null, null, this.sharePic, null);
  }

  switchCam(){
    this.cameraPreview.switchCamera();
  }

  changeFrameLeft(){
    if(this.pointer >= 0){
      this.pointer--;
    }
  }

  changeFrameRight(){
    if(this.pointer < this.framePaths.length){
      this.pointer++;
    }
  }

  makeid(length) {
    var result           = '';
    var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
       result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  }

  

  ionViewWillLeave(){
    this.cameraPreview.stopCamera();
  }
}
