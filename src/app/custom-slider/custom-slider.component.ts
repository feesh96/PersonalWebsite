import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-custom-slider',
  templateUrl: './custom-slider.component.html',
  styleUrls: ['./custom-slider.component.css']
})
export class CustomSliderComponent implements OnInit {
  healthSliderArray: object[];
  musicSliderArray: object[];
  // selectedIndex;
  // transform;


  constructor() {
    this.healthSliderArray = [
      { img: "../assets/Yoga_Class.jpg", text: "Yoga class in this bitch" },
      { img: "../assets/Boxing.jpg", text: "Boxing class in de bi" },
      { img: "../assets/Resistance.jpg", text: "Resistance training for days" }
     ]
    this.musicSliderArray = [
      {"img": "../assets/Keyboard.jpg", "text": "365 Days Of weddings a year"},
      {"img": "../assets/Guitar.jpeg", "text": "365 Days Of weddings a year"},
      {"img": "../assets/Ukulele.jpg", "text": "365 Days Of weddings a year"}
     ]
   }

  ngOnInit() {
  }
}
