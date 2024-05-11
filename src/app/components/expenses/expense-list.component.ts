import { Component, ViewChild } from '@angular/core';
import { MatAccordion } from '@angular/material/expansion';

@Component({
  selector: 'app-expense-list',
  templateUrl: './expense-list.component.html',
  styleUrls: ['./expense-list.component.css']
})
export class ExpenseListComponent {
  categories: { name: string, amount: number, title: string }[] = [];

  @ViewChild(MatAccordion)
  accordion!: MatAccordion;
  displayMode: string = 'default';
  multi = false;
  hideToggle = false;

  constructor() { }

  ngOnInit() { }

  addCategory() {
    this.categories.push({ name: 'Mancare', amount: 200, title: 'Cartofi prajiti' });
  }

  editCategory(index: number) {
  }

  onSubmit(index: number, panel: any) {
    console.log('Submitted expense for category:', this.categories[index]);
    panel.close();
  }

  deleteCategory(event: any, index: number) {
    event.stopPropagation();
    if (index > -1) {
      this.categories.splice(index, 1);
    }
  }
}