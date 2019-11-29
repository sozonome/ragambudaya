import { Component, OnInit } from '@angular/core';
import { SafeResourceUrl, DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-potret-budaya',
  templateUrl: './potret-budaya.page.html',
  styleUrls: ['../home.page.scss', './potret-budaya.page.scss'],
})
export class PotretBudayaPage implements OnInit {
  photo: SafeResourceUrl;
  webpathn: string;
  msg: string;
  constructor(private sanitizer: DomSanitizer) { }

  ngOnInit() {
  }

  async takePicture() {
    // const image = await Plugins.Camera.getPhoto({
    //   quality: 80,
    //   allowEditing: false,
    //   resultType: CameraResultType.Uri,
    //   source: CameraSource.Camera,
    //   saveToGallery: false
    // });
    // this.webpathn = image.dataUrl;
    
    // this.photo = image.webPath;
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
