import { importProvidersFrom, NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { HttpClientModule } from '@angular/common/http';
// Firebase imports
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
// Material Design imports
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatMenuModule } from '@angular/material/menu';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { MatDialogModule } from '@angular/material/dialog';
// App routing
import { AppRoutingModule } from './app-routing.module';
// App components
import { AppComponent } from './app.component';
import { ExpenseListComponent } from './components/dashboard/expenses/expense-list.component';
import { HeaderComponent } from './components/dashboard/header/header.component';
import { SummaryComponent } from './components/dashboard/summary/summary.component';
// AG Grid
import { AgGridModule } from 'ag-grid-angular';
import { NavBarComponent } from './components/dashboard/nav-bar/nav-bar.component';
import { AuthenticationComponent } from './components/authentication/authentication.component';
import { CategoryComponent } from './components/dashboard/category/category.component';
import { MatSelectModule } from '@angular/material/select';


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
    ExpenseListComponent,
    SummaryComponent,
    NavBarComponent,
    AuthenticationComponent,
    CategoryComponent
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
    AgGridModule,



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
