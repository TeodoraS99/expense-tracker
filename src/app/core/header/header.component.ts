import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  constructor(private router: Router) { }

  onLoginClick() {
    this.router.navigate(['login']);
  }

  onLogoutClick() {
    this.router.navigate(['logout']);
  }

  addCategory() {
    this.router.navigate(['category']);
  }

  ngOnInit() {
    window.addEventListener('popstate', () => {
      if (window.location.pathname === '/login') {
        window.history.back();
      }
    });
  }
}
