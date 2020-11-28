import { Component, OnInit } from '@angular/core';
import { ConstantsService } from '../common/services/constants.service';

@Component({
  selector: 'app-spotify-player',
  templateUrl: './spotify-player.component.html',
  styleUrls: ['./spotify-player.component.css']
})
export class SpotifyPlayerComponent implements OnInit {
  state: Number;

  constructor(private stateService: ConstantsService) {  }

  ngOnInit() {
    this.stateService.currentState.subscribe(state => this.state = state)
  }

  hideMusic() {
    this.stateService.toggleMusic(0)
  }
}
