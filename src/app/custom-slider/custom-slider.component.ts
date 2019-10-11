import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-custom-slider',
  templateUrl: './custom-slider.component.html',
  styleUrls: ['./custom-slider.component.css']
})
export class CustomSliderComponent implements OnInit {
  healthSliderArray: object[];
  musicSliderArray: object[];
  selectedIndex;
  transform;


  constructor() {
    this.healthSliderArray = [
      {"img": "../assets/Yoga_Class.jpg", "alt": "", "text": "365 Days Of weddings a year"},
      {"img": "../assets/Boxing.jpg", "alt": "",  "text": "365 Days Of weddings a year"},
      {"img": "../assets/Resistance.jpg", "alt": "", "text": "365 Days Of weddings a year"}
     ]
    this.musicSliderArray = [
      {"img": "../assets/Keyboard.jpg", "alt": "", "text": "365 Days Of weddings a year"},
      {"img": "../assets/Guitar.jpeg", "alt": "",  "text": "365 Days Of weddings a year"},
      {"img": "../assets/Ukulele.jpg", "alt": "", "text": "365 Days Of weddings a year"}
     ]

     this.selectedIndex = 0;
     this.transform = 0;
   }

  ngOnInit() {
  }

  selected(x) {
    this.downSelected(x);
    this.selectedIndex = x;
  }
   
  downSelected(i) {
    this.transform =  100 - (i) * 50;
    this.selectedIndex = this.selectedIndex + 1;
    if(this.selectedIndex > 4) {
      this.selectedIndex = 0;
    }
  }
}
