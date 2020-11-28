import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgxAudioPlayerModule } from 'ngx-audio-player';
import { ConstantsService } from './common/services/constants.service';


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
import { MaterialModule } from './material.module';
import { PlayerComponent } from './pages/player/player.component';
import { MayIComponent } from './may-i/may-i.component';
import { SpotifyPlayerComponent } from './spotify-player/spotify-player.component';

@NgModule({
  imports: [
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    NgxAudioPlayerModule,
    RouterModule.forRoot([  //Put all the component routing within the home page here
      { path: '', component: AboutComponent, data: {animation: 'HomePage'} },
      { path: 'code', component: CareerComponent, data: {animation: 'CareerPage'}},
      { path: 'sound', component: HobbiesComponent, data: {animation: 'HobbiesPage'}},
      { path: 'contact', component: ContactComponent, data: {animation: 'ContactPage'}},
      { path: 'mayI', component: MayIComponent}
    ]),
    MaterialModule
  ],
  declarations: [
    AppComponent,
    HeaderComponent,
    AboutComponent,
    CareerComponent,
    HobbiesComponent,
    MayIComponent,
    ContactComponent,
    CarouselComponent, 
    CarouselItemDirective, 
    CarouselItemElement,
    CustomSliderComponent,
    ProductionComponent,
    AreasOfExpertiseComponent,
    PlayerComponent,
    SpotifyPlayerComponent
  ],
  bootstrap: [AppComponent],
  providers: [ConstantsService]
})
export class AppModule { }