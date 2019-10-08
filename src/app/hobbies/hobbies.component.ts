import { Component, OnInit } from '@angular/core';



@Component({
  selector: 'app-hobbies',
  templateUrl: './hobbies.component.html',
  styleUrls: ['./hobbies.component.css']
})
export class HobbiesComponent implements OnInit {
  fitnessImages: string[] = [
    '../../assets/Yoga_Class.jpg',
    '../../assets/Resistance.jpg',
    '../../assets/Boxing.jpg'
  ];
  musicImages: string[] = [
    '../../assets/Guitar.jpeg',
    '../../assets/Ukulele.jpg',
    '../../assets/Keyboard.jpg'
  ];

  constructor() { }

  ngOnInit() {
  }

}
