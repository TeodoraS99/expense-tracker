import { Injectable } from '@angular/core';
import { ExpenseInterface } from '../dashboard/interfaces/expense.interface';


@Injectable({
  providedIn: 'root'
})
export class ExpenseService {
  private readonly EXPENSE_KEY = 'expenses';

  constructor() { }

  getExpenses() {
    let localStorageExpenses = localStorage.getItem(this.EXPENSE_KEY);
    if (localStorageExpenses) {
      var expenses = JSON.parse(localStorageExpenses);
      return expenses;
    } else {
      return [];
    }
  }

  addExpense(expenses: ExpenseInterface[], expense: ExpenseInterface): void {
    localStorage.setItem(this.EXPENSE_KEY, JSON.stringify(expenses));
  }

  deleteExpense(expenses: ExpenseInterface[], expense: ExpenseInterface): void {
    expenses = expenses.filter(item => item !== expense);
    localStorage.setItem(this.EXPENSE_KEY, JSON.stringify(expenses));

    // this.localService.saveData(this.CATEGORY_KEY, JSON.stringify(categories)) //linia asta e echivalentul lui 31
  }


}
