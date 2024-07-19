import { Component, OnInit, ViewChild } from '@angular/core';
import { MatAccordion } from '@angular/material/expansion';
import { CategoryService } from '../../service/category.service';

@Component({
  selector: 'app-expense-list',
  templateUrl: './expense-list.component.html',
  styleUrls: ['./expense-list.component.css']
})
export class ExpenseListComponent implements OnInit {
  expenses: { name: string, amount: number, title: string }[] = [];
  categories: string[] = [];

  @ViewChild(MatAccordion)
  accordion!: MatAccordion;
  displayMode: string = 'default';
  multi = false;
  hideToggle = false;

  constructor(private categoryService: CategoryService) { }

  ngOnInit() {
    this.categories = this.categoryService.getCategories();
  }

  addExpense() {
    this.expenses.push({ name: 'Mancare', amount: 200, title: 'Cartofi prajiti' });
  }

  editExpense(index: number) {
  }

  onSubmit(index: number, panel: any) {
    console.log('Submitted expense for expense:', this.expenses[index]);
    panel.close();
  }

  deleteExpense(event: any, index: number) {
    event.stopPropagation();
    if (index > -1) {
      this.expenses.splice(index, 1);
    }
  }
}