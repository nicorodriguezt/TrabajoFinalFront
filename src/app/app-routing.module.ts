import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

// Componentes
import { LoginRegisterViewComponent} from './_views/login-register-view/login-register-view.component';
import { MainMenuComponent } from './_components/main-menu/main-menu.component';
import { BuscadorViewComponent} from './_views/buscador-view/buscador-view.component';
import { ModificarDatosViewComponent} from './_views/modificar-datos-view/modificar-datos-view.component';
import {VerMenuViewComponent} from './_views/ver-menu-view/ver-menu-view.component';

// Guard
import { AuthGuard} from './_guards/auth.guard';
import {LoginGuard} from './_guards/login.guard';

const routes: Routes = [
  { path: 'login', component: LoginRegisterViewComponent, canActivate: [LoginGuard]},
  { path: '', redirectTo: '/main', pathMatch: 'full'},
  { path: 'main', component: MainMenuComponent, canActivate: [AuthGuard]},
  { path: 'buscador', component: BuscadorViewComponent, canActivate: [AuthGuard]},
  { path: 'cargarDatos', component: ModificarDatosViewComponent, canActivate: [AuthGuard]},
  { path: 'verMenu', component: VerMenuViewComponent, canActivate: [AuthGuard] }
];


@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }
