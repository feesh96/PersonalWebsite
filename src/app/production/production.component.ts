import { Component, OnInit, Input } from '@angular/core';
import { Track } from 'ngx-audio-player';   

import { ConstantsService } from '../common/services/constants.service';



@Component({
  selector: 'app-production',
  templateUrl: './production.component.html',
  styleUrls: ['./production.component.css']
})


export class ProductionComponent implements OnInit {

  @Input() showMusic: string;
  state: Number;

  msaapDisplayTitle = true;
  msaapDisplayPlayList = true;
  msaapPageSizeOptions = [4];
  msaapDisplayVolumeControls = true;

  // Material Style Advance Audio Player Playlist
  msaapPlaylist: Track[] = [
  {
    title: 'Evanesce',
    link: '../assets/Beats/Evanesce.mp3'
  },
  {
    title: 'Moonwalking',
    link: '../assets/Beats/Moonwalking.mp3'
  },
  {
    title: 'Mr. Big Chef',
    link: '../assets/Beats/Mr Big Chef.mp3'
  },
  {
    title: 'My World',
    link: '../assets/Beats/My World.mp3'
  },
  {
    title: 'One and Only',
    link: '../assets/Beats/One and Only.mp3'
  },
  {
    title: 'The Good Life',
    link: '../assets/Beats/The Good Life.mp3'
  }
  ];

  constructor(private stateService: ConstantsService) {  }

  ngOnInit() {
    this.stateService.currentState.subscribe(state => this.state = state)
  }

  hideMusic() {
    this.stateService.toggleMusic(0)
  }
}
