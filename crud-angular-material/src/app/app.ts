import { Component, signal } from '@angular/core';
import { RouterOutlet, RouterLink} from '@angular/router';
import { MatToolbarModule} from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon'
import { MatButtonModule } from '@angular/material/button'
import {MatDividerModule} from '@angular/material/divider';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatListModule} from '@angular/material/list';
import {FormsModule} from '@angular/forms';
import { MatMenuModule} from '@angular/material/menu'
@Component({
  selector: 'app-root',
  imports: [MatMenuModule,MatListModule, MatSidenavModule,  FormsModule, MatButtonModule,RouterOutlet, RouterLink, MatToolbarModule, MatIconModule, MatButtonModule, MatDividerModule ],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
    events: string[] = [];
    opened?: boolean;
    protected readonly title = signal('crud-angular-material');
     shouldRun = true;
}
