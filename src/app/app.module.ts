import { HttpClientModule } from '@angular/common/http';
import { importProvidersFrom, NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
// Firebase imports
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
// Material Design imports
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDialogModule } from '@angular/material/dialog';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSelectModule } from '@angular/material/select';
// App routing
import { AppRoutingModule } from './app-routing.module';
// App components
import { AppComponent } from './app.component';
import { WeeklyBudgetDialogComponent } from './components/dialog/weekly-budget-dialog.component';
import { ExpenseListComponent } from './components/expenses/expense-list.component';
import { SummaryComponent } from './components/summary/summary.component';
import { FooterComponent } from './core/footer/footer.component';
import { HeaderComponent } from './core/header/header.component';
import { AuthenticationComponent } from './pages/authentication/authentication.component';
import { CategoryComponent } from './pages/category/category.component';
import { ExpenseTabComponent } from './components/expense-tab.component/expense-tab.component';
import { ExpenseFormComponent } from './components/expense-form/expense-form.component';

// AG Grid
import { AgGridModule } from 'ag-grid-angular';


const firebaseConfig = {
  apiKey: "AIzaSyDdkuuzOmSLtsDcEydbzcmv6LsHoH8qSDc",
  authDomain: "expense-tracker-a8202.firebaseapp.com",
  projectId: "expense-tracker-a8202",
  storageBucket: "expense-tracker-a8202.appspot.com",
  messagingSenderId: "606801431268",
  appId: "1:606801431268:web:500db7f0a639b244a43af1",
  measurementId: "G-F5X2NPNRHP"
};

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    AuthenticationComponent,
    CategoryComponent,
    SummaryComponent,
    WeeklyBudgetDialogComponent,
    ExpenseListComponent,
    ExpenseTabComponent,
    ExpenseFormComponent,

  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    HttpClientModule,

    // Firebase
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFirestoreModule,
    AngularFireAuthModule,

    // Material Design
    MatTabsModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatExpansionModule,
    MatCheckboxModule,
    MatSlideToggleModule,
    MatTableModule,
    MatToolbarModule,
    MatMenuModule,
    MatIconModule,
    MatCardModule,
    MatListModule,
    MatSelectModule,
    MatDialogModule,

    // AG Grid
    AgGridModule

  ],
  providers: [
    provideAnimationsAsync(),
    importProvidersFrom([
      provideFirebaseApp(() => initializeApp(firebaseConfig)),
      provideFirestore(() => getFirestore()),
    ]),
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
