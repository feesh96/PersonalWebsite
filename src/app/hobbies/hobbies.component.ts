import { Component, OnInit } from '@angular/core';



@Component({
  selector: 'app-hobbies',
  templateUrl: './hobbies.component.html',
  styleUrls: ['./hobbies.component.css']
})
export class HobbiesComponent implements OnInit {
  healthSliderArray = [
    { img: "../assets/Yoga_Class.jpg", text: "Vinyasa Yoga" },
    { img: "../assets/Boxing.jpg", text: "Boxing" },
    { img: "../assets/Resistance.jpg", text: "Resistance training" }
   ]
  musicSliderArray = [
    { img: "../assets/Keyboard.jpg", "text": "Keyboard"},
    { img: "../assets/Guitar.jpeg", "text": "Acoustic Guitar"},
    { img: "../assets/Ukulele.jpg", "text": "Ukulele"}
   ]

  constructor() {
   }

  ngOnInit() {
    
  }

}
