import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';

import { ComponentsModule } from '../components/components.module';
import { PageDashboard } from './dashboard/page-dashboard.component';
import { PageRegister } from './register/page-register.component';

@NgModule({
  declarations: [
  PageDashboard,
  PageRegister,
  ],
  imports: [
    CommonModule,
    ComponentsModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule
  ],
  exports: []
})
export class PagesModule {}
