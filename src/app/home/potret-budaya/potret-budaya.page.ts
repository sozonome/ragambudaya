import { Component, OnInit } from '@angular/core';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { WebView } from '@ionic-native/ionic-webview/ngx';
// import { SocialSharing } from '@ionic-native/social-sharing/nx';
import { Instagram } from '@ionic-native/instagram/ngx';
import { Base64 } from '@ionic-native/base64/ngx';

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
    // private socialSharing: SocialSharing,
    private instagram: Instagram,
    private base64: Base64
  ) { }

  ngOnInit() {
  }

  async takePicture() {
    const options: CameraOptions = {
      quality: 5,
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
    });
  }

  sharePicture(){
    this.base64.encodeFile(this.imgData).then((base64File: string) => {
      this.imgData2 = base64File;
    }).then(() => {
      this.instagram.share(this.imgData2, "share ini");
    })
    // this.instagram.share('data:image/jpeg;base64,' + this.imgData, "share ini");

    // this.socialSharing.shareViaInstagram("aku cinta budaya", this.imgData);
    // Plugins.FileSharer.share({
    //   filename: "images.jpg",
    //   base64data: this.photo,
    //   contentType: 'application/jpg'
    // }).then(() => {
    //   this.msg = "bisa share"
    // }).catch(error => {
    //   this.msg = "gagal share"
    // })
  }
}
