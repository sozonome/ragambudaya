import { Component, OnInit } from '@angular/core';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { WebView } from '@ionic-native/ionic-webview/ngx';

@Component({
  selector: 'app-potret-budaya',
  templateUrl: './potret-budaya.page.html',
  styleUrls: ['../home.page.scss', './potret-budaya.page.scss'],
})
export class PotretBudayaPage implements OnInit {
  photo: string;
  webpathn: string;
  msg: string;
  constructor(
    private camera: Camera,
    private webview: WebView
  ) { }

  ngOnInit() {
  }

  async takePicture() {
    const options: CameraOptions = {
      quality: 80,
      allowEdit: false,
      saveToPhotoAlbum: true,
      correctOrientation: true,
      encodingType: this.camera.EncodingType.JPEG,
      destinationType: this.camera.DestinationType.FILE_URI,
      mediaType: this.camera.MediaType.PICTURE
    }
    
    this.camera.getPicture(options).then((imageData) => {
      this.photo = this.webview.convertFileSrc(imageData);
    }, (err) => {
     // Handle error
    });
  }

  sharePicture(){
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
