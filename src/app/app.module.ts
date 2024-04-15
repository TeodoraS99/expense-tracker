import { importProvidersFrom, NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatTabsModule } from '@angular/material/tabs';
import { BrowserModule } from '@angular/platform-browser';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { ExpenseListComponent } from './components/expenses/expense-list.component';
import { HeaderComponent } from './components/header/header.component';
import { SummaryComponent } from './components/summary/summary.component';
import { MatTableModule } from '@angular/material/table';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { provideFirestore, getFirestore } from '@angular/fire/firestore';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';


//https://www.youtube.com/watch?v=0ihoworuX4o&ab_channel=MonsterlessonsAcademy
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
    SummaryComponent
  ],
  imports: [
    AngularFireModule.initializeApp(firebaseConfig), // Initialize Firebase with config
    AngularFirestoreModule, // Import Firestore module
    AngularFireAuthModule, // Import Auth module
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    MatTabsModule,
    MatButtonModule,
    MatIconModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatExpansionModule,
    MatCheckboxModule,
    MatSlideToggleModule,
    MatTableModule,
    MatDatepickerModule
  ],
  providers: [
    provideAnimationsAsync(),
    importProvidersFrom([
      provideFirebaseApp(() => initializeApp(firebaseConfig)),
      provideFirestore(() => getFirestore()),
    ])
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
