import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-summary',
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.css']
})
export class SummaryComponent implements OnInit {
  inputColumns = ['Luni', 'Marti', 'Miercuri', 'Joi', 'Vineri', 'Sambata', 'Duminica'] as const;
  inputData = ELEMENT_DATA;

  displayColumns: string[] = [];
  displayData: any[] = [];
  showTable: boolean = false;

  ngOnInit() {
    this.displayColumns = ['0'].concat(this.inputData.map(x => x.position.toString()));
    this.displayData = this.inputColumns.map(x => this.formatInputRow(x as keyof PeriodicElement));

    console.log(this.displayColumns);
    console.log(this.displayData);

    this.showTable = true;
  }

  formatInputRow(row: keyof PeriodicElement): Record<string | number, any> {
    const output: Record<string | number, any> = {};

    output[0] = row;
    for (let i = 0; i < this.inputData.length; ++i) {
      output[this.inputData[i].position] = this.inputData[i][row];
    }
    return output;
  }
}

export interface PeriodicElement {
  category: string;
  position: string;
  amount: number;
}

const ELEMENT_DATA: PeriodicElement[] = [
  { position: 'Category', category: 'Hydrogen', amount: 1.0079 },
  { position: 'Amount', category: 'Helium', amount: 4.0026 },
];
