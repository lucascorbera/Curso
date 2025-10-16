import { Component } from '@angular/core';
import { AuthGoogleServices } from '../../services/auth-google-services';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, MatButtonModule],
  templateUrl: './login.html',
  styleUrls: ['./login.scss']
})
export class Login{
  constructor(public auth: AuthGoogleServices) {}

  onLogin() {
    this.auth.login();
  }
}
