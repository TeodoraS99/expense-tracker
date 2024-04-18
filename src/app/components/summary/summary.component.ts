import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import {
  ColDef,
  GridReadyEvent,
  RowGroupingDisplayType
} from 'ag-grid-community';
import 'ag-grid-enterprise';
import { GridApi } from 'ag-grid-enterprise';
import { IOlympicData } from './interfaces';


@Component({
  selector: 'app-summary',
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.css'],
})

export class SummaryComponent {
  private gridApi!: GridApi<IOlympicData>;
  public columnDefs: ColDef[] = [
    { field: "country", rowGroup: true, hide: true, sortable: true },
    { field: "year", rowGroup: true, hide: true, sortable: true },
    { field: "athlete", minWidth: 250 },
    { field: "sport", minWidth: 200 },
    { field: "gold" },
    { field: "silver" },
    { field: "bronze" },
  ];
  public defaultColDef: ColDef = {
    flex: 1,
    minWidth: 100,
    sortable: false,
  };
  public groupDisplayType: RowGroupingDisplayType = "groupRows";
  public rowGroupPanelShow: "always" | "onlyWhenGrouping" | "never" = "always";
  public groupDefaultExpanded = 1;
  public rowData!: IOlympicData[];
  public themeClass: string = "ag-theme-quartz";

  constructor(private http: HttpClient) { }
  ngOnInit() { }

  onGridReady(params: GridReadyEvent<IOlympicData>) {
    this.http
      .get<
        IOlympicData[]
      >("https://www.ag-grid.com/example-assets/olympic-winners.json")
      .subscribe((data) => {
        this.rowData = data;
      });
    // this.gridApi = params.api;

    // this.rowData = [
    //   {
    //     "athlete": "Michael Phelps",
    //     "age": 23,
    //     "country": "United States",
    //     "year": 2008,
    //     "date": "24/08/2008",
    //     "sport": "Swimming",
    //     "gold": 8,
    //     "silver": 0,
    //     "bronze": 0,
    //     "total": 8
    //   },
    //   {
    //     "athlete": "Michael Phelps",
    //     "age": 19,
    //     "country": "United States",
    //     "year": 2004,
    //     "date": "29/08/2004",
    //     "sport": "Swimming",
    //     "gold": 6,
    //     "silver": 0,
    //     "bronze": 2,
    //     "total": 8
    //   },
    //   {
    //     "athlete": "Michael Phelps",
    //     "age": 27,
    //     "country": "United States",
    //     "year": 2012,
    //     "date": "12/08/2012",
    //     "sport": "Swimming",
    //     "gold": 4,
    //     "silver": 2,
    //     "bronze": 0,
    //     "total": 6
    //   }
    // ]
  }
}