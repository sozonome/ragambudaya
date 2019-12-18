import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'onboarding', pathMatch: 'full' },
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then(m => m.HomePageModule)
  },
  {
    path: 'onboarding',
    loadChildren: './intro/onboarding/onboarding.module#OnboardingPageModule'
  },
  {
    path: 'infografik-wayang',
    children: [
      {
        path: '',
        loadChildren:
          './home/infografik-wayang/infografik-wayang.module#InfografikWayangPageModule'
      },
      {
        path: 'pilihan/:infografikType',
        loadChildren: './home/infografik-wayang/pilihan/pilihan.module#PilihanPageModule'
      },
      {
        path: 'detail-wayang/:infografikId',
        loadChildren:
          './home/infografik-wayang/detail-wayang/detail-wayang.module#DetailWayangPageModule'
      }
    ]
  },
  {
    path: 'potret-budaya',
    loadChildren:
      './home/potret-budaya/potret-budaya.module#PotretBudayaPageModule'
  },
  {
    path: 'tebak-gambar',
    loadChildren:
      './home/tebak-gambar/tebak-gambar.module#TebakGambarPageModule'
  },
  {
    path: 'about',
    loadChildren: './home/about/about.module#AboutPageModule'
  },
  {
    path: 'after-quiz',
    loadChildren:
      './home/tebak-gambar/after-quiz/after-quiz.module#AfterQuizPageModule'
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
