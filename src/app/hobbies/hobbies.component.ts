import { Component, OnInit } from '@angular/core';



@Component({
  selector: 'app-hobbies',
  templateUrl: './hobbies.component.html',
  styleUrls: ['./hobbies.component.css']
})
export class HobbiesComponent implements OnInit {
  healthSliderArray = [
    { img: "../assets/Yoga_Class.jpg", text: "Yoga, 2x/week, helps me loosen up and retain focus" },
    { img: "../assets/Boxing.jpg", text: "Boxing, 1x/week, keeps my endurance up to shape" },
    { img: "../assets/Resistance.jpg", text: "Freewight resistance training, 3x/week, strengthens my functional muscles" }
   ]
  musicSliderArray = [
    { img: "../assets/Keyboard.jpg", "text": "Playing the keys helps me riff off melodies for my production"},
    { img: "../assets/Guitar.jpeg", "text": "I've been playing guitar for over 5 years now"},
    { img: "../assets/Ukulele.jpg", "text": "Ukulele was the first instrument I taught myself!"}
   ]

  constructor() {
   }

  ngOnInit() {
    
  }

}
