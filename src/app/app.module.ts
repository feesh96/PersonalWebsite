import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {SlideshowModule} from 'ng-simple-slideshow';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { AboutComponent } from './about/about.component';
import { CareerComponent } from './career/career.component';
import { ContactComponent } from './contact/contact.component';
import { HobbiesComponent } from './hobbies/hobbies.component';
import { CustomSliderComponent } from './custom-slider/custom-slider.component';


@NgModule({
  imports: [
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    SlideshowModule,
    RouterModule.forRoot([  //Put all the component routing within the home page here
      { path: '', component: AboutComponent, data: {animation: 'HomePage'} },
      { path: 'career', component: CareerComponent, data: {animation: 'CareerPage'}},
      { path: 'hobbies', component: HobbiesComponent, data: {animation: 'HobbiesPage'}},
      { path: 'contact', component: ContactComponent, data: {animation: 'ContactPage'}},
    ])
  ],
  declarations: [
    AppComponent,
    HeaderComponent,
    AboutComponent,
    CareerComponent,
    HobbiesComponent,
    ContactComponent,
    CustomSliderComponent
  ],
  bootstrap: [AppComponent],
  providers: []
})
export class AppModule { }