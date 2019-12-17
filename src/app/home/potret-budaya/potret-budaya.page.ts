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
  
  photo: string = null;
  imgData: any;
  reset: boolean;
  blobImage: any = null;
  sharePic: any;
  berhasil: string;
  
  constructor(
    private cameraPreview: CameraPreview,
    private socialSharing: SocialSharing
  ) { }

  ngOnInit() {
  }

  runCamera() {
    const cameraPreviewOpts: CameraPreviewOptions = {
      x: window.screen.width * 0.1,
      y: window.screen.height * 0.2,
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
      this.reset = true
      this.photo = 'data:image/jpeg;base64,' + imageData;
      
      fetch(this.photo)
      .then(res => res.blob())
      .then(blob => {
        this.blobImage = blob;
        this.addFrame();
      });
      this.cameraPreview.stopCamera();
    });
  }
  
  addFrame(){
    watermark([this.blobImage, 'assets/img/LAUT.png'])
    .image(watermark.image.center(1))
    .then(img => {
      this.sharePic = img.src;
    })
    this.berhasil = "BAELFSKCJSBDKFCNBSALOEJFBLSIEUFDBDOS"
  }

  sharePicture(){
    this.socialSharing.share(null, null, this.sharePic, null);
  }

  ionViewWillLeave(){
    this.cameraPreview.stopCamera();
  }
}
