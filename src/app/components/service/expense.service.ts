import { Injectable } from '@angular/core';
import { ExpenseInterface } from './../dashboard/interfaces/expense.interface';

@Injectable({
  providedIn: 'root'
})
export class ExpenseService {
  private readonly EXPENSE_KEY = 'expenses';
  private readonly BUDGET_KEY = 'weeklyBudget';

  constructor() { }

  getDayExpenses(tab: string): ExpenseInterface[] {
    let localStorageExpenses = localStorage.getItem(this.EXPENSE_KEY);
    if (localStorageExpenses) {
      const expenses = JSON.parse(localStorageExpenses);
      return expenses.filter((item: ExpenseInterface) => item.day === tab);
    } else {
      return [];
    }
  }

  getAllExpenses() {
    let localStorageExpenses = localStorage.getItem(this.EXPENSE_KEY);
    if (localStorageExpenses) {
      return JSON.parse(localStorageExpenses);
    } else {
      return [];
    }
  }

  addExpense(expense: ExpenseInterface): void {
    const allExpenses = this.getAllExpenses();
    allExpenses.push(expense);
    localStorage.setItem(this.EXPENSE_KEY, JSON.stringify(allExpenses));
  }

  deleteExpense(expense: ExpenseInterface): void {
    let expenses = this.getAllExpenses();
    expenses = expenses.filter((item: ExpenseInterface) => item.id !== expense.id);
    localStorage.setItem(this.EXPENSE_KEY, JSON.stringify(expenses));
  }

  getWeeklyBudget(): number {//obtin bugetul din local storage
    const budget = localStorage.getItem(this.BUDGET_KEY);
    if (budget) {
      return JSON.parse(budget);
    } else {
      return 0;
    }
  }

  addWeeklyBudget(budget: number): void {//il stochez
    localStorage.setItem(this.BUDGET_KEY, JSON.stringify(budget));
  }
}
