import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

// Componentes
import {  LoginRegisterViewComponent} from './_views/login-register-view/login-register-view.component';
import {  CargaInicialViewComponent} from './_views/carga-inicial-view/carga-inicial-view.component';
import { MainMenuComponent } from './_components/main-menu/main-menu.component';
import { BuscadorViewComponent} from './_views/buscador-view/buscador-view.component';

// Guard
import { AuthGuard} from './_guards/auth.guard';
import {LoginGuard} from './_guards/login.guard';

const routes: Routes = [
  { path: 'login', component: LoginRegisterViewComponent, canActivate: [LoginGuard]},
  { path: '', redirectTo: '/main', pathMatch: 'full'},
  { path: 'main', component: MainMenuComponent, canActivate: [AuthGuard]},
  { path: 'registroDatos', component: CargaInicialViewComponent, canActivate: [AuthGuard]},
  { path: 'buscador', component: BuscadorViewComponent, canActivate: [AuthGuard]}
];


@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }
