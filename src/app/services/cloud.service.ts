import { Injectable } from '@angular/core';
import { of } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class CloudService {
  constructor() { }

  files: any = [
    {
      name: 'Be Alright (tagged)',
      url: '../../assets/Beats/BeAlright.mp3'
    },
    {
      name: 'Evanesce',
      url: '../../assets/Beats/Evanesce.mp3'
    },
    {
      name: 'Moonwalking',
      url: '../../assets/Beats/Moonwalking.mp3'
    },
    {
      name: 'Mr. Big Chef',
      url: '../../assets/Beats/Mr Big Chef.mp3'
    },
    {
      name: 'My World',
      url: '../../assets/Beats/My World.mp3'
    },
    {
      name: 'One and Only',
      url: '../../assets/Beats/One and Only.mp3'
    },
    {
      name: 'The Good Life',
      url: '../../assets/Beats/The Good Life.mp3'
    }
  ];

  getFiles() {
    return of(this.files);
  }
}
