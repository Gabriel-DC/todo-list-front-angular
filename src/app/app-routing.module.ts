import { AllComponent } from './all/all.component';
import { TomorrowComponent } from './tomorrow/tomorrow.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { TodayComponent } from './today/today.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  {
    path: '',
    component: HomeComponent,
    children: [
      { path: '', component: TodayComponent },
      { path: 'tomorrow', component: TomorrowComponent },
      { path: 'all', component: AllComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
