import { Component } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {
  recupinfo: any = JSON.parse(sessionStorage.getItem("infoLogin") || '');
  ngOnInit(): void {
    if (!sessionStorage.getItem('isLoggedIn')) {
      window.location.href = '/auth';
    }
  }
}
