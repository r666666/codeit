import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';

import { TopNavComponent } from './top-nav/top-nav.component';
import { PostPreviewComponent } from './post-preview/post-preview.component';
import { VotingComponent } from './voting/voting.component';

@NgModule({
  declarations: [
    TopNavComponent,
    PostPreviewComponent,
    VotingComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    MatIconModule
  ],
  exports: [
    TopNavComponent,
    PostPreviewComponent
  ]
})

export class ComponentsModule {}
