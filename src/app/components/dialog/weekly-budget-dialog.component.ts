import { Component, Inject } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-weekly-budget-dialog',
  templateUrl: './weekly-budget-dialog.component.html',
})
export class WeeklyBudgetDialogComponent {
  budgetControl = new FormControl(this.data.budget, [Validators.required, Validators.min(10)]);

  constructor(
    public dialogRef: MatDialogRef<WeeklyBudgetDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { budget: number },
  ) { }

  onSave() {
    console.log(this.budgetControl.value);
    this.dialogRef.close(this.budgetControl.value);
  }

  validBudget(): boolean {
    return this.budgetControl.valid;
  }
}