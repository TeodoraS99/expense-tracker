import "@ag-grid-community/styles/ag-grid.css";
import "@ag-grid-community/styles/ag-theme-quartz.css";
import { HttpClient } from '@angular/common/http';
import { Component, ViewChild } from '@angular/core';
import { AgGridAngular } from "ag-grid-angular";
import {
  ClientSideRowModelModule,
  ColDef,
  ExcelExportParams,
  GridApi,
  GridReadyEvent,
  ModuleRegistry,
  ProcessCellForExportParams,
  ProcessRowGroupForExportParams,
  ValueFormatterParams
} from 'ag-grid-community';
import 'ag-grid-enterprise';
import { ExpenseInterface } from "../../shared/interfaces/expense.interface";


@Component({
  selector: 'app-summary',
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.css']
  // standalone: true,
})
export class SummaryComponent {
  // @Output() exportedExpenses: 

  @ViewChild(AgGridAngular) agGrid!: AgGridAngular;

  private gridApi!: GridApi<ExpenseInterface>;

  public columnDefs: ColDef[] = [
    { field: "day", rowGroup: true, hide: true, width: 80 },
    { field: "category", headerName: "Category", minWidth: 100, width: 120 },
    { field: "title", headerName: "Expense Type", minWidth: 150, width: 250 },
    { field: "amount", headerName: "Amount", minWidth: 80, width: 100, aggFunc: 'sum', valueFormatter: this.currencyFormatter },
  ];

  public defaultColDef: ColDef = {
    flex: 1,
    minWidth: 75,
    sortable: true,
    resizable: true,
    filter: true
  };

  public autoGroupColumnDef: ColDef = {
    headerName: 'Day',
    minWidth: 75,
    cellRendererParams: {
      suppressCount: true,
    }
  };

  public groupDisplayType = 'multipleColumns';
  public defaultExcelExportParams: ExcelExportParams = getParams();
  public rowData!: ExpenseInterface[];
  public grandTotalRow: "top" | "bottom" = "bottom";

  constructor(private http: HttpClient) {
    ModuleRegistry.registerModules([ClientSideRowModelModule])
  }

  onBtExport() {
    this.gridApi.exportDataAsExcel(getParams());
  }

  onGridReady(params: GridReadyEvent<ExpenseInterface>) {
    this.gridApi = params.api;
    this.rowData = [
      { id: '', day: "Luni", title: "Cartofi prajiti", category: "Mancare", amount: 50 },
      { id: '', day: "Luni", title: "Inghetata", category: "Mancare", amount: 30 },
      { id: '', day: "Luni", title: "Prajitura", category: "Mancare", amount: 20 },
      { id: '', day: "Luni", title: "Gaz", category: "Facturi", amount: 200 },
      { id: '', day: "Marti", title: "Cartofi prajiti", category: "Mancare", amount: 50 },
      { id: '', day: "Miercuri", title: "Cartofi prajiti", category: "Mancare", amount: 50 }
    ];
  }
  currencyFormatter(params: ValueFormatterParams) {
    return '€' + params.value.toFixed(2);
  }
}

const getParams = (): ExcelExportParams => ({
  columnWidth: 100,
  processCellCallback: (params: ProcessCellForExportParams) => {
    const value = params.value;
    return value === undefined ? '' : value;
  },
  processRowGroupCallback: (params: ProcessRowGroupForExportParams) => {
    const { node } = params;
    if (!node.footer) {
      return `${node.key}`;
    }
    const isRootLevel = node.level === -1;
    if (isRootLevel) {
      return "Weekly Total";
    }
    return `Sub Total (${node.key})`;
  },
});