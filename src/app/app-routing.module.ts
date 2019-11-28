import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'splashscreen', pathMatch: 'full' },
  { path: 'home', loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)},
  { path: 'onboarding', loadChildren: './intro/onboarding/onboarding.module#OnboardingPageModule' },
  { path: 'splashscreen', loadChildren: './intro/splashscreen/splashscreen.module#SplashscreenPageModule' },
  {
    path: 'infografik-wayang',
    loadChildren: './home/infografik-wayang/infografik-wayang.module#InfografikWayangPageModule'
  },
  {
    path: 'potret-budaya',
    loadChildren: './home/potret-budaya/potret-budaya.module#PotretBudayaPageModule'
  },
  {
    path: 'tebak-gambar',
    loadChildren: './home/tebak-gambar/tebak-gambar.module#TebakGambarPageModule'
  },
  {
    path: 'about',
    loadChildren: './home/about/about.module#AboutPageModule'
  },  { path: 'detail-wayang', loadChildren: './home/infografik-wayang/detail-wayang/detail-wayang.module#DetailWayangPageModule' },

<<<<<<< HEAD
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
=======
const routes: Routes = [
  { path: '', redirectTo: 'splashscreen', pathMatch: 'full' },
  { path: 'home', loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)},
  { path: 'onboarding', loadChildren: './intro/onboarding/onboarding.module#OnboardingPageModule' },
  { path: 'splashscreen', loadChildren: './intro/splashscreen/splashscreen.module#SplashscreenPageModule' },
  {
    path: 'infografik-wayang',
    loadChildren: './home/infografik-wayang/infografik-wayang.module#InfografikWayangPageModule'
  },
  {
    path: 'potret-budaya',
    loadChildren: './home/potret-budaya/potret-budaya.module#PotretBudayaPageModule'
  },
  {
    path: 'tebak-gambar',
    loadChildren: './home/tebak-gambar/tebak-gambar.module#TebakGambarPageModule'
  },
  {
    path: 'about',
    loadChildren: './home/about/about.module#AboutPageModule'
  },
  { path: 'after-quiz', loadChildren: './home/tebak-gambar/after-quiz/after-quiz.module#AfterQuizPageModule' }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
>>>>>>> d0527abd0e4c3ae972122aac1a6fe8181341bd6f
