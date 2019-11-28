import { Component, OnInit } from '@angular/core';
import { Plugins, CameraResultType, CameraSource } from '@capacitor/core';
import { from } from 'rxjs';
import { SafeResourceUrl, DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-potret-budaya',
  templateUrl: './potret-budaya.page.html',
  styleUrls: ['../home.page.scss', './potret-budaya.page.scss'],
})
export class PotretBudayaPage implements OnInit {
  photo: SafeResourceUrl;
  webpathn: string;
  constructor(private sanitizer: DomSanitizer) { }

  ngOnInit() {
  }

  async takePicture() {
    const image = await Plugins.Camera.getPhoto({
      quality: 80,
      allowEditing: false,
      resultType: CameraResultType.Uri,
      source: CameraSource.Camera,
      saveToGallery: false
    });
    // this.photo = this.sanitizer.bypassSecurityTrustResourceUrl(image && (image.dataUrl));
    this.photo = image.webPath;
    this.webpathn = image.webPath;
  }
}
