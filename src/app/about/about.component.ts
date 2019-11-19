import { Component, OnInit } from '@angular/core';
import { ConstantsService } from '../common/services/constants.service';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {
  state: Number;

  constructor(private stateService: ConstantsService) {  }

  ngOnInit() {
    this.stateService.currentState.subscribe(state => this.state = state)
  }
}