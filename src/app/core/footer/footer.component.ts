import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css'
})
export class FooterComponent {
  @Input() tabs: string[] = [];
  @Input() selectedTab: number = 0;
  @Output() selectedTabChange = new EventEmitter<number>();

  back() {
    if (this.selectedTab > 0) {
      this.selectedTabChange.emit(this.selectedTab - 1);
    }
  }

  next() {
    if (this.selectedTab < this.tabs.length - 1) {
      this.selectedTabChange.emit(this.selectedTab + 1);
    }
  }
} 