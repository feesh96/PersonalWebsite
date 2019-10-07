import { Component, OnInit } from '@angular/core';



@Component({
  selector: 'app-hobbies',
  templateUrl: './hobbies.component.html',
  styleUrls: ['./hobbies.component.css']
})
export class HobbiesComponent implements OnInit {
  imageUrlArray: string[] = [
    '../../assets/Guitar.jpeg',
    '../../assets/Yoga_Class.jpg'
  ];
  constructor() { }

  ngOnInit() {
  }

}
