import { makeAutoObservable } from "mobx";

class PlayerController {
  isPlaying = false;
  currTime = 0; 

  constructor() {
    makeAutoObservable(this);
  }

  get isPlayingStatus() {
    return this.isPlaying;
  }

  setIsPlaying(value){
	this.isPlaying = value
  }

  get currentTime() {
    return this.currTime;
  }

  setCurrTime(time) {
    this.currTime = time;
  }

  setPlay(play, pause) {
    this.playSound = play;
    this.pauseSound = pause;
  }

  togglePlay() {
    if (this.isPlaying && this.pauseSound) {
      this.pauseSound();
    } else if (!this.isPlaying && this.playSound) {
      this.playSound();
    }
    this.isPlaying = !this.isPlaying;
  }
}

const playerController = new PlayerController();

export default playerController;
