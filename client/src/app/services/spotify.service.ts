import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { JoinScreenService } from './join-screen.service';

declare var Spotify: any;

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

  is_paused = false;
  is_active = false;

  constructor(private _joinScreenService: JoinScreenService){
    this.device_id = '';
    console.log('player component constructed');
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

    // this.loadPlayerState();

    // this.player_state_interval = setInterval(() => {
    //   this.loadPlayerState()
    // }, 5000);

    // let initial_values = {
    //   device:['', Validators.required]
    // }

    // this.devicesForm = this.formBuilder.group(initial_values)

    // this.getAvailableDevices();
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
    // const token = this._joinScreenService.getAuthUrl();
    const token = 'BQCyxw3XhOd5Cagj2-zr6KqvhC-hwhPl9XRA1SHMgV2F_5u92sg9cwbQQfzVCq-OFNUpplFpC-k_5lRoDNXRS9pi-IQ_v8becwQppGXl6hzRVQYyUAEPhTxDPgMABLXS_TH8JesFTAC8HPSbZTHueUFKIzzmTUW2FcEeJNrNeK7f5QawhkVOWbN_I73E5XleTg';
    this.player = new Spotify.Player({
      name: 'Web Playback SDK Quick Start Player',
      getOAuthToken: (cb:any) => { cb(token); },
      volume: 0.5
    });

    console.log(this.player);
    console.log("onSpotifyWebPlaybackSDKReady");

    // ready listener
      this.player.addListener('ready', this.ready.bind(this));

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

  getCurrentState(){
    this.player.getCurrentState().then((state:any) => {
      console.log("Current State: ", state);
    })
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

  // loadPlayerState(){
  //   this.spotify.perform("endpoint-get-information-about-the-users-current-playback").subscribe(
  //     (player:any) => {
  //       console.log(player);
  //       this.player_state = player;
  //     }
  //   )

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