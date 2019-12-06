import { Component, OnInit } from '@angular/core';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { WebView } from '@ionic-native/ionic-webview/ngx';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';

@Component({
  selector: 'app-potret-budaya',
  templateUrl: './potret-budaya.page.html',
  styleUrls: ['../home.page.scss', './potret-budaya.page.scss'],
})
export class PotretBudayaPage implements OnInit {
  photo: string;
  webpathn: string;
  msg: string;
  imgData: any;
  imgData2: any;
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
      this.imgData = imageData
    }, (err) => {
      // Handle error
    })
  }

  sharePicture(){
    this.socialSharing.share(null, null, this.imgData, null);
    //nanti tambahin handler error
  }
}
