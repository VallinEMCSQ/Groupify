import { FormsModule, ReactiveFormsModule } from "@angular/forms"
import { MaterialModule } from "src/app/material/material.module"
import { SpotifyService } from "src/app/services/spotify.service"
import {HttpClientModule} from '@angular/common/http';
import { PlayerComponent } from "../../src/app/components/player/player.component"
import { StartComponent } from "src/app/pages/start/start.component";

describe('Player Component', () => {
  it('mounts', () => {
    cy.mount(PlayerComponent,
      {
        providers:[SpotifyService],
        declarations:[StartComponent],
        imports: [
          MaterialModule,
          FormsModule,
          ReactiveFormsModule,
          HttpClientModule
        ]
      })
  })
  it('contains the correct buttons', () => {
    cy.mount(PlayerComponent,
      {
        providers:[SpotifyService],
        declarations:[StartComponent],
        imports: [
          MaterialModule,
          FormsModule,
          ReactiveFormsModule,
          HttpClientModule
        ]
      })
    cy.contains("Play")
    cy.contains("Next")
    cy.contains("Previous")
  })
})