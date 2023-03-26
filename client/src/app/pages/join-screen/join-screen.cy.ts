import { MaterialModule } from "src/app/material/material.module"
import {HttpClientModule} from '@angular/common/http';
import { JoinScreenComponent } from "./join-screen.component"
import { JoinScreenService } from "src/app/services/join-screen.service";

describe('Player Component', () => {
  it('mounts', () => {
    cy.mount(JoinScreenComponent,
      {
        providers:[JoinScreenService],
        imports: [
          MaterialModule,
          HttpClientModule
        ]
      })
  })
})