import { Component } from '@angular/core';
import { MatInputModule} from '@angular/material/input'
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';



@Component({
  selector: 'app-consulta',
  imports: [MatInputModule, FlexLayoutModule, MatCardModule, MatIconModule, FormsModule, MatTableModule],
  templateUrl: './consulta.html',
  styleUrl: './consulta.scss'
})
export class Consulta {

}
