import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ExpenseService } from '../../service/expense.service';
import { ExpenseInterface } from '../interfaces/expense.interface';
import { MatDialog } from '@angular/material/dialog';
import { WeeklyBudgetDialogComponent } from './weekly-budget-dialog.component';

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

  @ViewChild('firstInput') firstInputElement!: ElementRef;

  constructor(private expenseService: ExpenseService,
    private dialog: MatDialog
  ) {
    console.log("Constructor de expense list");
   }

  ngOnInit() {
    this.weeklyBudget = this.expenseService.getWeeklyBudget();
    this.updateBudget();
    this.checkAndAddBudget();

  }

  // updateBudget() { // actualizeaza bugetul in sereviciu pe baza cheltuielilor
  //   const allExpenses = this.expenseService.getAllExpenses();
  //   const weeklyExpenses = allExpenses.reduce((total: number, expense: ExpenseInterface) => total + expense.amount, 0);
  //   this.remainingBudget = this.weeklyBudget - weeklyExpenses;
  //   console.log(allExpenses);
  //   console.log(weeklyExpenses);
  // }


  ngAfterViewInit() {
    if (this.firstInputElement) {
      this.firstInputElement.nativeElement.focus();
    }
    // this.checkAndAddBudget();
  }

  checkAndAddBudget() {
    const weeklyBudget = this.expenseService.getWeeklyBudget(); //luam bugetul
    if (!weeklyBudget || weeklyBudget < 10) {  //verificam daca exista sau nu buget dau daca e prea mic
      console.log("Deschid dialogul de buget");
      this.openBudgetDialog();
    }
  }

  openBudgetDialog(): void {
    const dialogRef = this.dialog.open(WeeklyBudgetDialogComponent, {
      width: '500px',
      data: { budget: this.expenseService.getWeeklyBudget() },

    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.expenseService.addWeeklyBudget(result);
        this.updateBudget();
      }
    });
  }

  updateBudget() {
    this.weeklyBudget = this.expenseService.getWeeklyBudget(); // Actualizează bugetul săptămânal
    const allExpenses = this.expenseService.getAllExpenses();
    const weeklyExpenses = allExpenses.reduce((total: number, expense: ExpenseInterface) => total + expense.amount, 0);
    this.remainingBudget = this.weeklyBudget - weeklyExpenses;
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

  remainingBudgetColor() {
    const remainingPercentage = (this.remainingBudget / this.weeklyBudget) * 100; //calc buget ramas in %
    if (remainingPercentage < 10) { //mai putin de 10 e rosu
      return 'red';
    } else if (remainingPercentage < 25) { // intre 10-25 galben
      return 'yellow';
    } else {
      return 'inherit'; // mai mult de 25 culoarea initiala mostenita
    }
  }


}