import { Component } from '@angular/core';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrl: './calendar.component.css'
})
export class CalendarComponent {
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
