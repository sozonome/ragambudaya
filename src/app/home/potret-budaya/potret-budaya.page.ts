import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { CameraPreview, CameraPreviewPictureOptions, CameraPreviewOptions, CameraPreviewDimensions } from '@ionic-native/camera-preview/ngx';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';
import * as watermark from 'watermarkjs';

@Component({
  selector: 'app-potret-budaya',
  templateUrl: './potret-budaya.page.html',
  styleUrls: ['../home.page.scss', './potret-budaya.page.scss'],
  encapsulation: ViewEncapsulation.None
})
export class PotretBudayaPage implements OnInit {
  screenWidth = window.screen.width;
  screenHeight = window.screen.height;

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
    'assets/img/frame/FR1-1080.png', 
    'assets/img/frame/FR2-1080.png',
    'assets/img/frame/FR3-1080.png',
    'assets/img/frame/FR4-1080.png'
  ];
  pointer: number = 0;

  constructor(
    private cameraPreview: CameraPreview,
    private socialSharing: SocialSharing
  ) { }

  ngOnInit() {
  }

  ionViewWillEnter(){
    this.runCamera();
  }

  runCamera() {
    this.cameraOpened = true;
    this.picTaken = false;
    const cameraPreviewOpts: CameraPreviewOptions = {
      x: 0,
      y: 0,
      width: window.screen.width,
      height: window.screen.height,
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
      width: 1080,
      height: 1920,
      quality:100 
    }

    this.cameraPreview.takePicture(pictureOpts).then((imageData) => {
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
    if(this.pointer > 0){
      this.pointer--;
    }
  }

  changeFrameRight(){
    if(this.pointer < this.framePaths.length-1){
      this.pointer++;
    }
  }

  ionViewWillLeave(){
    this.cameraPreview.stopCamera();
  }
}
