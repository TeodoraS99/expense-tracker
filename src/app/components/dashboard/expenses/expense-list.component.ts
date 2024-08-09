import { Component, ElementRef, Input, OnInit, QueryList, Renderer2, ViewChild, ViewChildren } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatAccordion, MatExpansionPanel } from '@angular/material/expansion';
import { v4 as uuidv4 } from 'uuid';
import { CategoryService } from '../../service/category.service';
import { ExpenseService } from '../../service/expense.service';
import { HeaderComponent } from '../header/header.component';
import { ExpenseInterface } from '../interfaces/expense.interface';
import { WeeklyBudgetDialogComponent } from '../header/weekly-budget-dialog.component';

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
  // @ViewChild('firstInput') firstInputElement!: ElementRef;

  constructor(
    private categoryService: CategoryService,
    private expenseService: ExpenseService,
    private headerComponent: HeaderComponent,
    private renderer: Renderer2,
    // private dialog: MatDialog,
  ) {
    // console.log("Constructor de expense list");
  }

  ngOnInit() {
    this.categories = this.categoryService.getCategories();
    this.allExpenses = this.expenseService.getDayExpenses(this.tab);
    this.expenses = this.allExpenses.filter((item: ExpenseInterface) => item.day == this.tab);
    this.calculateDailyTotal();
    // this.checkAndAddBudget();
  }

  // ngAfterViewInit() {
  //   if (this.firstInputElement) {
  //     this.firstInputElement.nativeElement.focus();
  //   }
  //   // this.checkAndAddBudget();
  // }

  // checkAndAddBudget() {
  //   const weeklyBudget = this.expenseService.getWeeklyBudget(); //luam bugetul
  //   if (!weeklyBudget || weeklyBudget < 10) {  //verificam daca exista sau nu buget dau daca e prea mic
  //     console.log("Deschid dialogul de buget");
  //     this.openBudgetDialog();
  //   }
  // }

  // openBudgetDialog(): void {
  //   const dialogRef = this.dialog.open(WeeklyBudgetDialogComponent, {
  //     width: '500px',
  //     data: { budget: this.expenseService.getWeeklyBudget() },

  //   });

  //   dialogRef.afterClosed().subscribe(result => {
  //     if (result) {
  //       this.expenseService.addWeeklyBudget(result);
  //       this.headerComponent.updateBudget();
  //     }
  //   });
  // }

  addExpense() {
    const emptyExpense: ExpenseInterface = { id: uuidv4(), title: '', category: '', amount: 0, day: this.tab };
    this.expenses.push(emptyExpense);
    setTimeout(() => {
      const lastPanel = this.panels.toArray().pop();
      if (lastPanel) {
        lastPanel.open();
      }
    }, 0);
    // this.firstInputs.nativeElement.focus();
    this.renderer.selectRootElement('#firstInput').focus();
  }

  onSubmit(index: number, panel: MatExpansionPanel) {
    const expense = this.expenses[index];
    const currentBudget = this.expenseService.getRemainingBudget();//aflam bugetul ramas
    if (expense.amount > currentBudget) { //verific daca cheltuiala este mai mare ca bugetul
      alert('Adding this expense exceeds your remaining budget.');
      return;
    }
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

  calculateDailyTotal() {//calc suma cheltuielilor pt o anumita zi
    this.dailyTotal = this.expenses.reduce((total, expense) => total + expense.amount, 0);
  }
}