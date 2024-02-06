import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-centre-de-controle',
  templateUrl: './centre-de-controle.component.html',
  styleUrls: ['./centre-de-controle.component.scss']
})
export class CentreDeControleComponent {
  constructor(public _router: Router) {}

  RedirectionVersApp() {
    this._router.navigate(['/auth/login']);
  }
  ngOnInit(): void {
    if (sessionStorage.getItem('isLoggedIn')) {
      window.location.href = '/admin';
    }
   }
}
