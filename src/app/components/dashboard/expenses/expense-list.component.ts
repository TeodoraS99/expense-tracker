import { Component, OnInit, ViewChild } from '@angular/core';
import { MatAccordion } from '@angular/material/expansion';
import { CategoryService } from '../../service/category.service';
import { ExpenseService } from '../../service/expense.service';
import { ExpenseInterface } from '../interfaces/expense.interface';

@Component({
  selector: 'app-expense-list',
  templateUrl: './expense-list.component.html',
  styleUrls: ['./expense-list.component.css']
})
export class ExpenseListComponent implements OnInit {
  expenses: ExpenseInterface[] = [];
  categories: string[] = [];

  @ViewChild(MatAccordion)
  accordion!: MatAccordion;
  displayMode: string = 'default';
  multi = false;
  hideToggle = false;

  constructor(private categoryService: CategoryService,
    private expenseService: ExpenseService,
  ) { }

  ngOnInit() {
    this.categories = this.categoryService.getCategories();
    this.expenses = this.expenseService.getExpenses();
  }

  addExpense() {
    let emptyExpense: ExpenseInterface = { title: '', category: '', amount: 0 };
    this.expenses.push(emptyExpense);
  }

  editExpense(index: number) {
  }

  onSubmit(index: number, panel: any) {
    console.log('Submitted expense for expense:', this.expenses[index]);
    this.expenseService.addExpense(this.expenses, this.expenses[index]);
    panel.close();
  }

  deleteExpense(index: number) {
    this.expenseService.deleteExpense(this.expenses, this.expenses[index]);
    this.expenses = this.expenseService.getExpenses();
  }
}