import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';

import { ComponentsModule } from '../components/components.module';
import { PageDashboard } from './dashboard/page-dashboard.component';
import { PageRegister } from './register/page-register.component';
import { PageLogin } from './login/page-login.component';
import { PageChangePassword } from './change-password/change-password.component';
import { PageForgotPassword } from './forgot-password/page-forgot-password.component';
import { PageCreatePost } from './create-post/page-create-post.component';
import { PagePost } from './post/post.component';
import { PageEditPost } from './edit-post/edit-post.component';

@NgModule({
  declarations: [
    PageDashboard,
    PageRegister,
    PageLogin,
    PageChangePassword,
    PageForgotPassword,
    PageCreatePost,
    PagePost,
    PageEditPost,
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
