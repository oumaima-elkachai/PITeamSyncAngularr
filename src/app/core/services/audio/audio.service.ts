import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AudioService {
  private audio: HTMLAudioElement;

  constructor() {
    this.audio = new Audio('src/assets/sounds/alarm.mp3');
  }
  playAlarm() {
    this.audio.play();
  }

  stopAlarm() {
    this.audio.pause();
    this.audio.currentTime = 0;
  }
}
