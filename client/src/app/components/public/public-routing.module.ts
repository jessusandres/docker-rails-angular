import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { PublicComponent } from './public.component';
import { CustomRoutingModule } from './custom/custom-routing.module';
import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';

const PublicRoutes: Routes = [
  {
    path: '', component: PublicComponent, children: [
      { path: '', component: HomeComponent },
      { path: 'login', component: LoginComponent },
    ]
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(PublicRoutes),
    FormsModule,
    CommonModule,
    CustomRoutingModule,
    ButtonModule,
    RippleModule,
  ],
  exports: [RouterModule],
  declarations: [
    PublicComponent,
    HomeComponent,
    LoginComponent
  ]
})
export class PublicRoutingModule {

  constructor() {
  }
}
