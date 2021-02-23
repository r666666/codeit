import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PageDashboard } from '../pages/dashboard/page-dashboard.component';
import { PageRegister } from '../pages/register/page-register.component';
import { PageLogin } from '../pages/login/page-login.component';
import { PageChangePassword } from '../pages/change-password/change-password.component';
import { PageForgotPassword } from '../pages/forgot-password/page-forgot-password.component';
import { PageCreatePost } from '../pages/create-post/page-create-post.component';
import { PagePost } from '../pages/post/post.component';
import { PageEditPost } from '../pages/edit-post/edit-post.component';

export const ROUTES: Routes = [
  { path: '', component: PageDashboard },
  { path: 'register', component: PageRegister },
  { path: 'login', component: PageLogin },
  { path: 'forgot-password', component: PageForgotPassword },
  { path: 'change-password/:token', component: PageChangePassword },
  { path: 'create-post', component: PageCreatePost },
  { path: 'post/:id', component: PagePost },
  { path: 'edit-post/:id', component: PageEditPost }
];

@NgModule({
  imports: [],
  exports: [RouterModule],
})
export class RoutingModule { }
