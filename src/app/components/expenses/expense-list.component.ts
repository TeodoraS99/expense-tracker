import { Component, Input, OnInit, QueryList, Renderer2, ViewChild, ViewChildren } from '@angular/core';
import { MatAccordion, MatExpansionPanel } from '@angular/material/expansion';
import { v4 as uuidv4 } from 'uuid';
import { CategoryService } from '../../service/category.service';
import { ExpenseService } from '../../service/expense.service';
import { ExpenseInterface } from '../../shared/interfaces/expense.interface';
import { ExpenseTabComponent } from '../expense-tab.component/expense-tab.component';


@Component({
  selector: 'app-expense-list',
  templateUrl: './expense-list.component.html',
  styleUrls: ['./expense-list.component.css']
})
export class ExpenseListComponent implements OnInit {
  expenses: ExpenseInterface[] = [];
  allExpenses: ExpenseInterface[] = [];
  categories: string[] = [];
  multi = false;
  dailyTotal: number = 0;

  @Input() tab: string = "";
  @Input() exportedExpenses: ExpenseInterface[] = [];
  @ViewChild(MatAccordion) accordion!: MatAccordion;
  @ViewChildren(MatExpansionPanel) panels!: QueryList<MatExpansionPanel>;

  constructor(
    private categoryService: CategoryService,
    private expenseService: ExpenseService,
    private expenseTab: ExpenseTabComponent,
    private renderer: Renderer2,
  ) { }

  ngOnInit() {
    this.categories = this.categoryService.getCategories();
    this.getExpenses();
    this.dailyTotal = this.expenseService.calculateDailyTotal(this.expenses);
  }

  getExpenses() {
    this.allExpenses = this.expenseService.getDayExpenses(this.tab);
    this.expenses = this.allExpenses.filter((item: ExpenseInterface) => item.day == this.tab);
  }


  addExpense() {
    const emptyExpense: ExpenseInterface = { id: '', title: '', category: '', amount: 0, day: this.tab };
    this.expenses.push(emptyExpense);
    setTimeout(() => {
      const lastPanel = this.panels.toArray().pop();
      if (lastPanel) {
        lastPanel.open();
      }
    }, 0);
    this.exportedExpenses = this.expenses;
  }


  saveExpense(event: { index: number, panel: MatExpansionPanel }) {
    let expense = this.expenses[event.index];

    const currentBudget = this.expenseService.getRemainingBudget();//aflam bugetul ramas
    if (expense.amount > currentBudget) { //verific daca cheltuiala este mai mare ca bugetul
      alert('Adding this expense exceeds your remaining budget.');
      return;
    }

    if (expense.id) {

      this.expenseService.updateExpense(expense);
    } else {
      expense.id = uuidv4();
      this.expenseService.addExpense(expense);
    }

    this.dailyTotal = this.expenseService.calculateDailyTotal(this.expenses);
    event.panel.close();
    this.expenseTab.updateBudget(); //anuntam header ca s-a adaugat un expense
  }


  deleteExpense(index: number) {
    this.expenseService.deleteExpense(this.expenses[index]);
    this.expenses = this.expenseService.getDayExpenses(this.tab);
    this.dailyTotal = this.expenseService.calculateDailyTotal(this.expenses);
    this.expenseTab.updateBudget(); //anuntam header ca s-a sters un expense
  }

  cancelExpense() {
    this.getExpenses();
  }
}