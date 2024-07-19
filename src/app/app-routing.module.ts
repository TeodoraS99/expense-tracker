import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthenticationComponent } from './components/authentication/authentication.component';
import { HeaderComponent } from './components/dashboard/header/header.component';
import { NavBarComponent } from './components/dashboard/nav-bar/nav-bar.component';
import { CategoryComponent } from './components/dashboard/category/category.component';

const routes: Routes = [
  {
    path: '',
    component: NavBarComponent,
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      { path: 'dashboard', component: HeaderComponent },
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
