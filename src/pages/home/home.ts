import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { StreamUrlProvider } from '../../providers/stream-url/stream-url';
import { MusicControls } from '@ionic-native/music-controls';
import { AnimationBuilder, AnimationService } from 'css-animator'; 

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
    private animator: AnimationBuilder
  constructor(
    public navCtrl: NavController,
    public player: StreamUrlProvider,
    public musicControls: MusicControls,
    animationService: AnimationService
  ) {  }
  settingMusicControl(){
    this.musicControls.destroy(); // it's the same with or without the destroy 
    this.musicControls.create({
      track       : 'Radio Cristy',        // optional, default : ''
      artist      : '828 AM - Makassar',                       // optional, default : ''
      cover       : '',      // optional, default : nothing
      // cover can be a local path (use fullpath 'file:///storage/emulated/...', or only 'my_image.jpg' if my_image.jpg is in the www folder of your app)
      //           or a remote url ('http://...', 'https://...', 'ftp://...')
      isPlaying   : true,                         // optional, default : true
      dismissable : true,                         // optional, default : false
    
      // hide previous/next/close buttons:
      hasPrev   : false,      // show previous button, optional, default: true
      hasNext   : false,      // show next button, optional, default: true
      hasClose  : true,       // show close button, optional, default: false
      hasSkipForward : false,  // show skip forward button, optional, default: false
      hasSkipBackward : false, // show skip backward button, optional, default: false
      skipForwardInterval: 15, // display number for skip forward, optional, default: 0
      skipBackwardInterval: 15, // display number for skip backward, optional, default: 0
    // iOS only, optional
      album       : 'test album',     // optional, default: ''
      duration : 0, // optional, default: 0
      elapsed : 0, // optional, default: 0
    
      // Android only, optional
      // text displayed in the status bar when the notific\ation (and the ticker) are updated
      ticker    : 'Now playing'
     });
     this.musicControls.subscribe().subscribe((action) => {
      console.log('action', action);
          const message = JSON.parse(action).message;
          console.log('message', message);
          switch(message) {
            case 'music-controls-next':
               // Do something
               break;
            case 'music-controls-previous':
               // Do something
               break;
            case 'music-controls-pause':
               // Do something
               console.log('music pause');
               this.player.pause();
               this.musicControls.listen(); 
               this.musicControls.updateIsPlaying(false);
               break;
            case 'music-controls-play':
               // Do something
               console.log('music play');
               
               this.player.play();
               this.musicControls.listen(); 
               this.musicControls.updateIsPlaying(true);
               break;
            case 'music-controls-destroy':
               // Do something
               break;
            // External controls (iOS only)
            case 'music-controls-toggle-play-pause' :
              // Do something
              break;
            case 'music-controls-seek-to':
              // Do something
              break;
            case 'music-controls-skip-forward':
              // Do something
              break;
            case 'music-controls-skip-backward':
              // Do something
              break;

              // Headset events (Android only)
              // All media button events are listed below
            case 'music-controls-media-button' :
                // Do something
                break;
            case 'music-controls-headset-unplugged':
                // Do something
                break;
            case 'music-controls-headset-plugged':
                // Do something
                break;
            default:
                break;
          }
    });
    this.musicControls.listen(); // activates the observable above
    this.musicControls.updateIsPlaying(true);
  }

  play() {
  	this.player.play()
    this.settingMusicControl();
    console.log('playing')
  }

  pause() {
    this.player.pause();
    this.musicControls.listen();
    this.musicControls.updateIsPlaying(false);
  }
}
