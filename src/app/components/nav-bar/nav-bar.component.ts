import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.css'
})
export class NavBarComponent {

  constructor(private router: Router) { }

  onLoginClick() {
    this.router.navigate(['login']);
  }

  onLogoutClick() {
    this.router.navigate(['logout']);

  }

  ngOnInit() {
    window.addEventListener('popstate', () => {
      if (window.location.pathname === '/login') {
        window.history.back();
      }
    });
  }
}