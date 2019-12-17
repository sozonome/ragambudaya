import { Component, OnInit, ViewChild, ElementRef, ViewEncapsulation } from '@angular/core';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { CameraPreview, CameraPreviewPictureOptions, CameraPreviewOptions, CameraPreviewDimensions } from '@ionic-native/camera-preview/ngx';
import { WebView } from '@ionic-native/ionic-webview/ngx';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';
import * as watermark from 'watermarkjs';

@Component({
  selector: 'app-potret-budaya',
  templateUrl: './potret-budaya.page.html',
  styleUrls: ['../home.page.scss', './potret-budaya.page.scss'],
  encapsulation: ViewEncapsulation.None
})
export class PotretBudayaPage implements OnInit {
  
  @ViewChild('framedPhoto', {static: false}) waterMarkImage: ElementRef;
  
  photo: string = null;
  imgData: any;
  reset: boolean;
  blobImage: any = null;
  sharePic: any;
  
  constructor(
    private camera: Camera,
    private cameraPreview: CameraPreview,
    private webview: WebView,
    private socialSharing: SocialSharing
  ) { }

  ngOnInit() {
    // this.runCamera();
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
      });
      this.cameraPreview.stopCamera();

    }, (err) => {
      console.log(err);
      this.photo = 'assets/img/test.jpg';
    });
  }

  addFrame(){
    watermark([this.blobImage, 'assets/img/LAUT.png'])
    .image(watermark.image.center(1))
    .then(img => {
      this.waterMarkImage.nativeElement.src = img.src;
      this.sharePic = img.src;
    })
  }

  sharePicture(){
    this.socialSharing.share(null, null, this.sharePic, null);
    //nanti tambahin handler error
  }
}
