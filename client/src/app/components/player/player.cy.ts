import { FormsModule, ReactiveFormsModule } from "@angular/forms"
import { MaterialModule } from "src/app/material/material.module"
import { SpotifyService } from "src/app/services/spotify.service"
import {HttpClientModule} from '@angular/common/http';
import { PlayerComponent } from "./player.component"

describe('Player Component', () => {
  it('mounts', () => {
    cy.mount(PlayerComponent,
      {
        providers:[SpotifyService],
        imports: [
          MaterialModule,
          FormsModule,
          ReactiveFormsModule,
          HttpClientModule
        ]
      })
  })
})