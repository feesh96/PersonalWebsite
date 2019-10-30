import { Component, OnInit } from '@angular/core';
import { Track } from 'ngx-audio-player';   


@Component({
  selector: 'app-production',
  templateUrl: './production.component.html',
  styleUrls: ['./production.component.css']
})

export class ProductionComponent implements OnInit {

  msaapDisplayTitle = true;
  msaapDisplayPlayList = true;
  msaapPageSizeOptions = [2,4,6];
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

  constructor() { }

  ngOnInit() {
  }

}
