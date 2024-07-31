import { Component, ElementRef, Input, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { MatAccordion, MatExpansionPanel } from '@angular/material/expansion';
import { v4 as uuidv4 } from 'uuid';
import { CategoryService } from '../../service/category.service';
import { ExpenseService } from '../../service/expense.service';
import { ExpenseInterface } from '../interfaces/expense.interface';
import { HeaderComponent } from '../header/header.component';

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

  @ViewChild(MatAccordion) accordion!: MatAccordion;
  @ViewChildren(MatExpansionPanel) panels!: QueryList<MatExpansionPanel>;
  @ViewChildren('firstInput') firstInputs!: QueryList<ElementRef>;

  constructor(
    private categoryService: CategoryService,
    private expenseService: ExpenseService,
    private headerComponent: HeaderComponent
  ) { }

  ngOnInit() {
    this.categories = this.categoryService.getCategories();
    this.allExpenses = this.expenseService.getDayExpenses(this.tab);
    this.expenses = this.allExpenses.filter((item: ExpenseInterface) => item.day == this.tab);
    this.calculateDailyTotal();
  }

  addExpense() {
    const emptyExpense: ExpenseInterface = { id: uuidv4(), title: '', category: '', amount: 0, day: this.tab };
    this.expenses.push(emptyExpense);
    setTimeout(() => {
      const lastPanel = this.panels.toArray().pop();
      if (lastPanel) {
        lastPanel.open();
      }
    }, 0);
    //  this.firstInputs.nativeElement.focus();
  }

  onSubmit(index: number, panel: MatExpansionPanel) {
    const expense = this.expenses[index];
    console.log('Submitted expense:', expense);
    this.allExpenses.push(expense);
    this.expenseService.addExpense(expense);
    this.calculateDailyTotal();
    panel.close();

    this.headerComponent.updateBudget(); //anuntam header ca s-a adaugat un expense
  }

  deleteExpense(index: number) {
    this.expenseService.deleteExpense(this.expenses[index]);
    this.expenses = this.expenseService.getDayExpenses(this.tab);
    this.calculateDailyTotal();

    this.headerComponent.updateBudget(); //anuntam header ca s-a sters un expense
  }

  calculateDailyTotal() {
    this.dailyTotal = this.expenses.reduce((total, expense) => total + expense.amount, 0);
  }
}
