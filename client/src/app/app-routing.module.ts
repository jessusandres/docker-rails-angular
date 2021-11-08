import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotPageFoundComponent } from './components/public/not-page-found/not-page-found.component';
import { PublicRoutingModule } from './components/public/public-routing.module';

const routes: Routes = [
  { path: '**', component: NotPageFoundComponent },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { scrollPositionRestoration: 'enabled', relativeLinkResolution: 'legacy' }),
    PublicRoutingModule,
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
