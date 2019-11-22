import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { InfografikWayangPage } from './infografik-wayang.page';

const routes: Routes = [
  {
    path: '',
    component: InfografikWayangPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [InfografikWayangPage]
})
export class InfografikWayangPageModule {}
