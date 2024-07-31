import { Component, OnInit } from '@angular/core';
import { ExpenseService } from '../../service/expense.service';
import { ExpenseInterface } from '../interfaces/expense.interface';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit {
  tabs = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday', 'Summary'];
  selectedTab = 0;

  weeklyBudget = 0;
  remainingBudget = 0;

  constructor(private expenseService: ExpenseService) { }

  ngOnInit() {
    this.weeklyBudget = this.expenseService.getWeeklyBudget();
    this.updateBudget();
  }

  updateBudget() { // actualizeaza bugetul in sereviciu pe baza cheltuielilor
    const allExpenses = this.expenseService.getAllExpenses();
    const weeklyExpenses = allExpenses.reduce((total: number, expense: ExpenseInterface) => total + expense.amount, 0);
    this.remainingBudget = this.weeklyBudget - weeklyExpenses;
    console.log(allExpenses);
    console.log(weeklyExpenses);
  }


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
