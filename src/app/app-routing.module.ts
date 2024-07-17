import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthenticationComponent } from './components/authentication/authentication.component';
import { HeaderComponent } from './components/dashboard/header/header.component';
import { NavBarComponent } from './components/dashboard/nav-bar/nav-bar.component';

const routes: Routes = [
  {
    path: '',
    component: NavBarComponent,
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      { path: 'dashboard', component: HeaderComponent },
      { path: 'login', component: AuthenticationComponent },
      // Alte rute pentru alte pagini
      { path: '**', redirectTo: '/dashboard' } // redirecționează toate căile necunoscute către dashboard
    ]
  }
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
