import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-custom-slider',
  templateUrl: './custom-slider.component.html',
  styleUrls: ['./custom-slider.component.css']
})
export class CustomSliderComponent implements OnInit {
  @Input() slides: object[];


  constructor() {
    
   }

  ngOnInit() {
  }

  ngAfterViewInit() {
  }
}
