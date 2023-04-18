import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { StartComponent } from '../pages/start/start.component';
declare var Spotify: any;
// TO RUN W/O BACKEND TOKEN: Paste token from Spotify Developers (only lasts one hour)
const token = "BQD1F4GaOgEr9nqzsvnz00RkNqSoV-_elDR0s47DwVxyMF2GejTGsFwo0h0UXb-gpm5mUGnrXvbmfH5lkr7vXwEGQWpI_nkpiEPYff88FuArT_nGmo78p4NXkq9KuGBPDfY_kgP7KPEE4LPiQLwHxgE2BsFzCeps87yb2iO5cA1TMIcaAwpkPVFgD62pS1xizsfJ"
@Injectable({
  providedIn: 'root'
})
export class SpotifyService {
  loadAPI: any;
  player:any;
  device_id:string;
  player_state:BehaviorSubject<any> = new BehaviorSubject(null);
  player_state_interval:any;
  devices:any;
  devicesForm:any;
  player_ready = new BehaviorSubject<boolean>(false);

  is_paused = false;
  is_active = false;

  constructor(private startComponent: StartComponent){
    this.device_id = '';
  }

  public initializePlayer() {
    // WebPlaybackSDK initialization code from Rinkesh Patel:
    // Tutorial article: https://rinkesh-patel.medium.com/how-to-load-spotify-web-playback-sdk-inside-an-angular-app-9f2f74e0fa36
    // Github code: https://gist.github.com/rin9424/40071881bd8063ee27e94cfc5a07bad3

    // in order to access variables defined in our component class inside the callback function (connectPlayer),
    // bind(this) argument to access the correct "this" inside a callback
    (<any>window).onSpotifyWebPlaybackSDKReady = this.connectPlayer.bind(this);

    // once the SDK is loaded through this script, we can create a new Spotify player using the Spotify object
    this.loadAPI = new Promise((resolve) => {
      console.log('resolving promise...');
      this.loadScript();
      resolve("Complete")
    });

    this.loadAPI.then((arg:any)=>{
      console.log(arg);
      console.log("Script loaded");
    })
  }

  ngOnDestroy(){
    clearInterval(this.player_state_interval);
  }

  loadScript() {
    console.log('preparing to load...')
    let node = document.createElement('script');
    node.src = "https://sdk.scdn.co/spotify-player.js";
    node.type = 'text/javascript';
    node.async = true; 
    document.head.appendChild(node);
    // for older browsers that do not support document.head
    // document.getElementsByTagName('head')[0].appendChild(node);
  }

  connectPlayer(){
    // gets token stored in the start component, which is acquired through a get request upon start's initialization
    // const token = this.startComponent.authToken;
    // console.log("Token: ", this.startComponent.authToken);
    // const token = "BQAbEuMli8V2_shKcfFG9ySC1yNxLMonnKV3Sxea7WWXQOu7GX0CxJqwgNHrNSJPddfEoLWZfGyf04TbIu-XKWjeS08nNT6TGuotNdyJr33rKxKhFyx9DvXtlaPkRalJMYvopqax6zbW5XPSGpEllkdZEsMqZpFw9Ppa-xg4Hsigcz7_2MPhS37TngSz5bvhpa1e"
    this.player = new Spotify.Player({
      name: 'Web Playback SDK Quick Start Player',
      getOAuthToken: (cb:any) => { cb(token); },
      volume: 0.5
    });

    console.log(this.player);
    console.log("onSpotifyWebPlaybackSDKReady");

    // // ready listener
    //   this.player.addListener('ready', this.ready.bind(this));

    // When the player is ready, set the playerReady BehaviorSubject to true
      this.player.addListener('ready', () => {
        console.log('Spotify Player ready');
        this.ready.bind(this);
        this.onPlayerReady();
      });

    // not_ready listener
      this.player.addListener('not_ready', this.not_ready.bind(this));


    // initialization_error listener
      this.player.addListener('initialization_error', this.initialization_error.bind(this));


    // authentication_error listener
      this.player.addListener('authentication_error', this.authentication_error.bind(this));

    // account_error listener
      this.player.addListener('account_error', this.account_error.bind(this));

    // playback_error listener
      this.player.addListener('playback_error', this.playback_error.bind(this));

      this.player.addListener('player_state_changed', this.loadPlayerState.bind(this));

    this.player.connect().then((success:any) => {
      console.log(success);
      console.log("Player connected!");
    });
  }
  
  isListenerExists(listener:string):boolean{

    console.log(this.player._eventListeners['ready'].length);

    if(this.player._eventListeners['ready'].length > 0){
      return true;
    }else{
      return false;
    }

  }

  ready(device_id:string){
    this.device_id = device_id;
    console.log("ready Listener");
  }

  public isPlayerReady(): Observable<boolean> {
    return this.player_ready.asObservable();
  }
  
  private onPlayerReady() {
    this.player_ready.next(true);
  }

  not_ready(device_id:string){
    this.device_id = device_id;
    console.log("not_ready Listener");
  }

  // error listeners
  initialization_error(message:any){
    console.log("initialization_error Listener")
    console.log(message);
  }

  authentication_error(message:any){
    console.log("authentication_error Listener")
    console.log(message);
  }

  account_error(message:any){
    console.log("account_error Listener")
    console.log(message);
  }

  playback_error(message:any){
    console.log("playback_error Listener")
    console.log(message);
  }

// called every time player state changes
  loadPlayerState(){
    // player_state is a BehaviorSubject that emits its latest value to the subscriber in PlayerComponent
    // every time loadPlayerState() is called, player_state is fed a new current state value
    this.player_state.next(this.player.getCurrentState());
  }

  togglePlay(){

      // console.log("Toggle Play for Device: ",this.device_id);
      this.player.togglePlay().then(() => {
        console.log("Toggle Play for Device: ",this.device_id);
      })

  }

  previous(){

      this.player.previousTrack().then(() => {
        console.log("Playing previous track");
      })

  }

  next(){

      this.player.nextTrack().then(() => {
        console.log("Playing next track");
      })

  }

  // incrementVolume(){
  //   console.log("Incrementing volume by 1%")
  // }

  // decrementVolume(){
  //   console.log("decrementing volumne by 1%")
  // }


  // }

  // getSongProgress(){
  //   if(!this.player_state){
  //     return 0;
  //   }else{
  //     let percent = Math.trunc((this.player_state.progress_ms/this.player_state.item.duration_ms) * 100);

  //     if(!Number.isNaN(percent)){
  //       return percent;
  //     }else{
  //       return 0;
  //     }
  //   }
  // }

  // getAvailableDevices(){
  //   this.spotify.perform("endpoint-get-a-users-available-devices").subscribe(
  //     {
  //       next: (devices:any) => {
  //         this.devices = devices.devices;
  //         console.log(this.devices);
  //       }
  //     }
  //   )
  // }
}
