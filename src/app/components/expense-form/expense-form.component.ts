import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatExpansionPanel } from '@angular/material/expansion';
import { ExpenseInterface } from '../../shared/interfaces/expense.interface';

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

  constructor() { }

  onSubmit(index: number, panel: MatExpansionPanel) {
    //cand se apasa pe submit, se smote un event catre parinte
    this.saveExpense.emit({ index: this.index, panel: this.panel });
  }
}