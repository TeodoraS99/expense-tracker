import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatExpansionPanel } from '@angular/material/expansion';
import { ExpenseInterface } from '../../shared/interfaces/expense.interface';
import { ExpenseService } from '../../service/expense.service';

@Component({
  selector: 'app-expense-form',
  templateUrl: './expense-form.component.html',
  styleUrl: './expense-form.component.css'
})
export class ExpenseFormComponent {
  @Input() expense!: ExpenseInterface;
  @Input() categories: string[] = [];
  @Input() index!: number;
  @Input() panel!: MatExpansionPanel;
  //creeaza event care va fi trimis catre parinte cand se salveaza o cheltuiala impr cu index si panel
  @Output() saveExpense = new EventEmitter<{ index: number, panel: MatExpansionPanel }>();
  @Output() cancelExpense = new EventEmitter<void>();

  // private initialExpense!: ExpenseInterface;

  constructor(private expenseService: ExpenseService) { }

  ngOnInit() { }

  onSubmit(index: number, panel: MatExpansionPanel) {
    //cand se apasa pe submit, se emite un event catre parinte
    this.saveExpense.emit({ index: this.index, panel: this.panel });
  }

  onCancel() {
    // this.initialExpense = this.expenseService.getExpenseById(this.expense.id);
    this.cancelExpense.emit();
    this.panel.close();
  }
}