import { MaterialModule } from "src/app/material/material.module"
import {HttpClientModule} from '@angular/common/http';
import { JoinScreenComponent } from "../../src/app/pages/join-screen/join-screen.component"
import { JoinScreenService } from "src/app/services/join-screen.service";

describe('JoinScreen Component', () => {
  it('mounts', () => {
    cy.mount(JoinScreenComponent,
      {
        providers:[JoinScreenService],
        imports: [
          MaterialModule,
          HttpClientModule
        ]
      })
    cy.contains("Login to Spotify to listen")
  })
})