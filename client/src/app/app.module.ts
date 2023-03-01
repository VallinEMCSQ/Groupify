import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MaterialModule } from './material/material.module';
import {HttpClientModule} from '@angular/common/http'; 
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
// import { PlayerComponent } from './components/player/player.component';
import { JoinScreenComponent } from './pages/join-screen/join-screen.component';



@NgModule({
  declarations: [
    AppComponent,
    // PlayerComponent,
    JoinScreenComponent
  ],
  imports: [
    BrowserModule,
    MaterialModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
