import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ConstantsService {

  //variable initialization
  private stateSource = new BehaviorSubject<Number>(0)
  currentState = this.stateSource.asObservable();

  constructor() { 
  }

  toggleMusic(state: Number) {
    this.stateSource.next(state);
    console.log(this.currentState)
  }
}
