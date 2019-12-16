import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
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
  webpathn: string;
  msg: string;
  imgData: any;
  imgData2: any;
  blobImage: any = null;
  
  constructor(
    private camera: Camera,
    private webview: WebView,
    private socialSharing: SocialSharing
  ) { }

  ngOnInit() {
  }

  takePicture() {
    const options: CameraOptions = {
      quality: 100,
      allowEdit: false,
      saveToPhotoAlbum: true,
      correctOrientation: true,
      encodingType: this.camera.EncodingType.JPEG,
      destinationType: this.camera.DestinationType.FILE_URI,
      mediaType: this.camera.MediaType.PICTURE
    }
    
    this.camera.getPicture(options).then((imageData) => {
      this.photo = this.webview.convertFileSrc(imageData);
      this.imgData = imageData;
      this.blobImage = this.dataURItoBlob(this.imgData);
      fetch(this.imgData)
      .then(res => res.blob())
      .then(blob => {
        this.blobImage = blob;
      });
    }, (err) => {
      // Handle error
    })
  }

  sharePicture(){
    this.socialSharing.share(null, null, this.imgData, null);
    //nanti tambahin handler error
  }

  sharePicture2(){
    this.socialSharing.share(null, null, this.blobImage, null);
    //nanti tambahin handler error
  }

  addFrame(){
    watermark([this.blobImage, 'assets/img/frame_kita.png'])
    .image(watermark.image.center(0.5))
    .then(img => {
      this.waterMarkImage.nativeElement.src = img.src;
    })
  }

  dataURItoBlob(dataURI) {
    // convert base64 to raw binary data held in a string
    var byteString = atob(dataURI.split(',')[1]);

    // separate out the mime component
    var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];

    // write the bytes of the string to an ArrayBuffer
    var arrayBuffer = new ArrayBuffer(byteString.length);
    var _ia = new Uint8Array(arrayBuffer);
    for (var i = 0; i < byteString.length; i++) {
        _ia[i] = byteString.charCodeAt(i);
    }

    var dataView = new DataView(arrayBuffer);
    var blob = new Blob([dataView], { type: mimeString });
    return blob;
}
}
