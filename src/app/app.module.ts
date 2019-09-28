import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { AboutComponent } from './about/about.component';
import { CareerComponent } from './career/career.component';
import { ContactComponent } from './contact/contact.component';
import { HobbiesComponent } from './hobbies/hobbies.component';


@NgModule({
  imports: [
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule,
    RouterModule.forRoot([  //Put all the component routing within the home page here
      { path: '', component: AboutComponent },
      { path: 'about', component: AboutComponent },
      { path: 'career', component: CareerComponent },
      { path: 'hobbies', component: HobbiesComponent },
      { path: 'contact', component: ContactComponent },
    ])
  ],
  declarations: [
    AppComponent,
    HeaderComponent,
    AboutComponent,
    CareerComponent,
    HobbiesComponent,
    ContactComponent
  ],
  bootstrap: [AppComponent],
  providers: []
})
export class AppModule { }


/*
Copyright Google LLC. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at http://angular.io/license
*/