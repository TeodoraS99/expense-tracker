import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HeaderComponent } from './core/header/header.component';
import { CategoryComponent } from './pages/category/category.component';
import { AuthenticationComponent } from './pages/authentication/authentication.component';
import { ExpenseTabComponent } from './components/expense-tab.component/expense-tab.component';


const routes: Routes = [
  {
    path: '',
    component: HeaderComponent,
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      { path: 'dashboard', component: ExpenseTabComponent },
      { path: 'login', component: AuthenticationComponent },
      { path: 'category', component: CategoryComponent },

      { path: '**', redirectTo: '/dashboard' }
    ]
  }
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
