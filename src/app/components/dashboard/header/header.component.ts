import { Component } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  tabs = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday', 'Summary'];
  selectedTab = 0;

  back() {
    if (this.selectedTab > 0) {
      this.selectedTab--;
    }
  }
  next() {
    if (this.selectedTab < this.tabs.length - 1) {
      this.selectedTab++;
    }
  }
}
