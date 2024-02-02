import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  constructor(public _router: Router) {}

  SeConnecter() {
    this._router.navigate(['/auth/centredecontrole']);
  }
}
