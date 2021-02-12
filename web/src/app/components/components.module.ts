import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TopNavComponent } from './top-nav/top-nav.component';
import {RouterModule} from "@angular/router";
import { PostPreviewComponent } from './post-preview/post-preview.component';

@NgModule({
  declarations: [
    TopNavComponent,
    PostPreviewComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
  ],
  exports: [
    TopNavComponent,
    PostPreviewComponent
  ]
})

export class ComponentsModule {}
