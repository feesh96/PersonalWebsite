import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgxAudioPlayerModule } from 'ngx-audio-player';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { AboutComponent } from './about/about.component';
import { CareerComponent } from './career/career.component';
import { ContactComponent } from './contact/contact.component';
import { HobbiesComponent } from './hobbies/hobbies.component';
import { CustomSliderComponent } from './custom-slider/custom-slider.component'
import { CarouselComponent, CarouselItemElement } from './custom-slider/carousel/carousel.component';
import { CarouselItemDirective } from './custom-slider/carousel/carousel-item.directive';
import { ProductionComponent } from './production/production.component';
import { AreasOfExpertiseComponent } from './areas-of-expertise/areas-of-expertise.component';


@NgModule({
  imports: [
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    NgxAudioPlayerModule,
    RouterModule.forRoot([  //Put all the component routing within the home page here
      { path: '', component: AboutComponent, data: {animation: 'HomePage'} },
      { path: 'career', component: CareerComponent, data: {animation: 'CareerPage'}},
      { path: 'hobbies', component: HobbiesComponent, data: {animation: 'HobbiesPage'}},
      { path: 'contact', component: ContactComponent, data: {animation: 'ContactPage'}},
      { path: 'production', component: ProductionComponent, data: {animation: 'ProductionPage'}},
    ])
  ],
  declarations: [
    AppComponent,
    HeaderComponent,
    AboutComponent,
    CareerComponent,
    HobbiesComponent,
    ContactComponent,
    CarouselComponent, 
    CarouselItemDirective, 
    CarouselItemElement,
    CustomSliderComponent,
    ProductionComponent,
    AreasOfExpertiseComponent
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