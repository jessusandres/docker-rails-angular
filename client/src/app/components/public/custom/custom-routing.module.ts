import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { CustomComponent } from './custom.component';
import { LoveComponent } from './love/love.component';

const CustomRoutes: Routes = [
  {
    path: 'to', component: CustomComponent, children: [
      { path: 'love', component: LoveComponent },
    ]
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(CustomRoutes),
    FormsModule,
    CommonModule,
  ],
  exports: [RouterModule],
  declarations: [
    CustomComponent,
    LoveComponent,
  ]
})
export class CustomRoutingModule {
}
