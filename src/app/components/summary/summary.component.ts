import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { IExpenseData } from './interfaces';
import {
  ColDef,
  GridReadyEvent,
  RowGroupingDisplayType
} from 'ag-grid-community';
import 'ag-grid-enterprise';
import { GridApi } from 'ag-grid-enterprise';


@Component({
  selector: 'app-summary',
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.css'],
})

export class SummaryComponent {
  private gridApi!: GridApi<IExpenseData>;
  public columnDefs: ColDef[] = [
    { field: "day", rowGroup: true, hide: true, sortable: true },
    { field: "category", rowGroup: true, hide: true, sortable: true },
    { field: "title", minWidth: 250 },
    { field: "amount", minWidth: 200 },
  ];
  public defaultColDef: ColDef = {
    flex: 1,
    minWidth: 100,
    sortable: false,
  };
  public groupDisplayType: RowGroupingDisplayType = "groupRows";
  public rowGroupPanelShow: "always" | "onlyWhenGrouping" | "never" = "always";
  public groupDefaultExpanded = 1;
  public rowData!: IExpenseData[];
  public themeClass: string = "ag-theme-quartz";

  constructor(private http: HttpClient) { }
  ngOnInit() { }

  onGridReady(params: GridReadyEvent<IExpenseData>) {
    // this.http
    //   .get<
    //     IExpenseData[]
    //   >("https://www.ag-grid.com/example-assets/olympic-winners.json")
    //   .subscribe((data) => {
    //     this.rowData = data;
    //   });
    // this.gridApi = params.api;

    this.rowData = [
      {
        "day": "Luni",
        "title": "Cartofi prajiti",
        "category": "Mancare",
        "amount": 50,
      },
      {
        "day": "Marti",
        "title": "Cartofi prajiti",
        "category": "Mancare",
        "amount": 50,
      },
      {
        "day": "Miercuri",
        "title": "Cartofi prajiti",
        "category": "Mancare",
        "amount": 50,
      }
    ]
  }
}