import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { PotretBudayaPage } from './potret-budaya.page';

const routes: Routes = [
  {
    path: '',
    component: PotretBudayaPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [PotretBudayaPage]
})
export class PotretBudayaPageModule {}
