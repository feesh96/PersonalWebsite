import { Component, Input } from '@angular/core';
import { Track } from 'ngx-audio-player';   
import { ConstantsService } from '../../common/services/constants.service';

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.scss']
})
export class PlayerComponent {
  @Input() showMusic: string;
  state;
  files: Array<any> = [
    { name: "First Song", artist: "Inder" },
    { name: "Second Song", artist: "You" }
  ];
  currentFile: any = {};

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

  isFirstPlaying() {
    return false;
  }
  isLastPlaying() {
    return true;
  }
}
