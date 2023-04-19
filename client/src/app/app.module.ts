import { Host, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MaterialModule } from './material/material.module';
import {HttpClientModule} from '@angular/common/http'; 
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


import { AppComponent } from './app.component';
import { PlayerComponent } from './components/player/player.component';
import { JoinScreenComponent } from './pages/join-screen/join-screen.component';
import { RouterModule, Routes } from '@angular/router';
import { StartComponent } from './pages/start/start.component';
import { HostComponent } from './pages/host/host.component';
import { MatCardModule } from '@angular/material/card';


const routes:Routes = [
  {path:'', component:JoinScreenComponent},
  {path:'start', component:StartComponent},
  {path:'host', component:HostComponent}
];
@NgModule({
  declarations: [
    AppComponent,
    PlayerComponent,
    JoinScreenComponent,
    StartComponent,
    HostComponent
  ],
  imports: [
    BrowserAnimationsModule,
    BrowserModule,
    MatCardModule,
    MaterialModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(routes)
  ],
  exports:[RouterModule],
  providers: [StartComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
