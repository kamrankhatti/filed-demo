import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { MakePaymentComponent } from './make-payment/make-payment.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'make-payment', component: MakePaymentComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
