import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { Platform } from 'ionic-angular';
declare var cordova:any;
//console.log(cordova);
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})



export class HomePage {
  platform:any;
  time: number = 300;
  hours: number = 0;
  minutes: number = 5;
  seconds: any = '00';
  start: boolean = true;
  stopBool: boolean = false;
  hidden:boolean = false;
  timer:any;
  constructor(public navCtrl: NavController,platform: Platform) {


    this.platform = platform;

    platform.ready().then(
      () => {
          if (this.platform.is('mobile')){
            cordova.plugins.backgroundMode.setDefaults({
              title: 'My App Name',
              text: 'Active in background...'});
            cordova.plugins.backgroundMode.enable();

          }



  }
    );



  }

    startTimer(){
      this.start = false;
      this.countTimer();
        this.timer =  setInterval(() => {
          if(!this.stopBool){
          this.countTimer()
        }
        },1000);
    }

    countTimer(){
            var thatTime =  this.time < 0 ? this.time * -1 : this.time;
            this.hours = Math.floor(thatTime / 3600);
            this.minutes = Math.floor((thatTime/ 3600 - this.hours) * 60);
            this.seconds = (thatTime  % 60).toString().length < 2 ? '0'+(thatTime % 60) : thatTime % 60;
            if(this.time >= 0){
              if(this.seconds  == '30'|| this.seconds  == '00' ||  this.time < 11 && this.time > 0){
                this.PlaySound();
              }
              if(this.time == 0){
                this.PlayLongSound();
              }
            }

            this.time -= 1;
    }
  sync(){
      this.hidden = true;
      if(this.time < 300 && this.time > 240){
        this.time = 240;
      }
      if(this.time < 240 && this.time > 0){
        this.time = 60;
      }
      setTimeout(() => {this.hidden = false},1200);
  }
  stop(){
    this.stopBool = true;
  }
  resume(){
    this.stopBool = false;
  }
  reset(){
    this.stopBool = false;
    this.start = true;
    this.time = 300;
    this.minutes = 5;
    this.seconds= '00';
    clearInterval(this.timer);
  }
  PlaySound() {
  var sound = <HTMLAudioElement>document.getElementById("audio");
  sound.play()
}
  PlayLongSound() {
    var sound = <HTMLAudioElement>document.getElementById("audio-long");
    sound.play()
  }
}
