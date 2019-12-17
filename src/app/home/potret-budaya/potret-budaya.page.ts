import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { CameraPreview, CameraPreviewPictureOptions, CameraPreviewOptions, CameraPreviewDimensions } from '@ionic-native/camera-preview/ngx';
import { WebView } from '@ionic-native/ionic-webview/ngx';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';
import * as watermark from 'watermarkjs';

@Component({
  selector: 'app-potret-budaya',
  templateUrl: './potret-budaya.page.html',
  styleUrls: ['../home.page.scss', './potret-budaya.page.scss'],
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
    this.runCamera();
  }

  runCamera() {
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
      quality: 85
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
    watermark([this.blobImage, 'assets/img/frame_kita.png'])
    .image(watermark.image.center(0.8))
    .then(img => {
      this.waterMarkImage.nativeElement.src = img.src;
      this.sharePic = img.src;
    })
  }

  sharePicture(){
    this.socialSharing.share(null, null, this.sharePic, null);
    //nanti tambahin handler error
  }

  // sharePicture2(){
  //   this.socialSharing.share(null, null, this.blobImage, null);
  //   //nanti tambahin handler error
  // }

  
//   dataURItoBlob(dataURI) {
//     // convert base64 to raw binary data held in a string
//     var byteString = atob(dataURI.split(',')[1]);

//     // separate out the mime component
//     var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];

//     // write the bytes of the string to an ArrayBuffer
//     var arrayBuffer = new ArrayBuffer(byteString.length);
//     var _ia = new Uint8Array(arrayBuffer);
//     for (var i = 0; i < byteString.length; i++) {
//         _ia[i] = byteString.charCodeAt(i);
//     }

//     var dataView = new DataView(arrayBuffer);
//     var blob = new Blob([dataView], { type: mimeString });
//     return blob;
// }
}
