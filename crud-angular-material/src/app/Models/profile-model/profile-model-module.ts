import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';



@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ]
})
export class ProfileModelModule { }

export interface IProfileModel {
    email: string;
    name: string;
}
