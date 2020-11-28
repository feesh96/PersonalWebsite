import { Component, OnInit } from '@angular/core';
import { ConstantsService } from '../common/services/constants.service';

@Component({
  selector: 'app-areas-of-expertise',
  templateUrl: './areas-of-expertise.component.html',
  styleUrls: ['./areas-of-expertise.component.css']
})
export class AreasOfExpertiseComponent implements OnInit {

  state: Number

  constructor(private stateService: ConstantsService) {  }

  ngOnInit() {
    this.stateService.currentState.subscribe(state => this.state = state)
  }

  showMusic() {
    this.stateService.toggleMusic(1)
  }

  showSoftware() {
    // this.stateService.toggleMusic(2)
  }
}
