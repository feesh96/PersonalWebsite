import { Component, Input } from '@angular/core';
import { ConstantsService } from '../../common/services/constants.service';
import { AudioService } from "../../services/audio.service";
import { CloudService } from "../../services/cloud.service";
import { StreamState } from "../../interfaces/stream-state";

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.scss']
})
export class PlayerComponent {
  @Input() showMusic: string;
  files: Array<any> = [];
  state;
  newState: StreamState;

  currentFile: any = {};

  constructor(private stateService: ConstantsService, public audioService: AudioService,
    public cloudService: CloudService) { 
      // get media files
      cloudService.getFiles().subscribe(files => {
        this.files = files;
      });
      this.audioService.getState().subscribe(state => {
        this.newState = state;
      });
      // const firstFile = this.files[0];
      // const index = 0;
      // this.currentFile = { index , firstFile };
     }

  ngOnInit() {  // For the areas-of-expertise section
    this.stateService.currentState.subscribe(state => this.state = state)
  }

  hideMusic() {
    this.stateService.toggleMusic(0)
  }

  isFirstPlaying() {
    return this.currentFile.index === 0;
  }

  isLastPlaying() {
    return this.currentFile.index === this.files.length - 1;
  }

  onSliderChangeEnd(change) {
    this.audioService.seekTo(change.value);
  }

  pause() {
    this.audioService.pause();
  }

  play() {
    this.audioService.play();
    console.log("Current File: ")
    console.log(this.currentFile);
  }

  stop() {
    this.audioService.stop();
  }

  next() {
    const index = this.currentFile.index + 1;
    const file = this.files[index];

    this.openFile(file, index);
  }

  previous() {
    const index = this.currentFile.index - 1;
    const file = this.files[index];
    this.openFile(file, index);
  }

  openFile(file, index) {
    console.log("Index: " + index);
    this.currentFile = { index, file };
    this.audioService.stop();
    this.playStream(file.url);
  }

  playStream(url) {
    this.audioService.playStream(url).subscribe(events => {
      // listening for fun here
    });
  }
}
