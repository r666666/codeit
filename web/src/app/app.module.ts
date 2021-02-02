import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';

import { AppComponent } from './app.component';
import { ROUTES, RoutingModule } from './routing/routing.module';
import { ComponentsModule } from './components/components.module';
import { PagesModule } from './pages/pages.module';
import { GraphQLModule } from './graphql.module';

@NgModule({
  declarations: [ AppComponent ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    RouterModule.forRoot(ROUTES),
    RoutingModule,
    ComponentsModule,
    PagesModule,
    GraphQLModule
  ],
  providers: [
    { provide: LocationStrategy, useClass: HashLocationStrategy },
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
