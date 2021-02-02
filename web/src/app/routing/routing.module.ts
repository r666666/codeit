import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PageDashboard } from '../pages/dashboard/page-dashboard.component';
import { PageRegister } from "../pages/register/page-register.component";

export const ROUTES: Routes = [
  { path: '', component: PageDashboard },
  { path: 'register', component: PageRegister }
];

@NgModule({
  imports: [],
  exports: [RouterModule],
})
export class RoutingModule { }
