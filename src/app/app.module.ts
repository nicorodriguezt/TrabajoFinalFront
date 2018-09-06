import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';

// Angular Material
import { MatButtonModule, MatSidenavModule, MatToolbarModule, MatIconModule, MatListModule, MatInputModule} from '@angular/material';
import { MatRadioModule, MatFormFieldModule, MatOptionModule, MatSelectModule} from '@angular/material';

// Components
import { AppComponent } from './app.component';
import { LoginComponent } from './_components/login/login.component';
import { RegistroComponent } from './_components/registro/registro.component';
import { MainMenuComponent } from './_components/main-menu/main-menu.component';
import { DatosUsuarioComponent } from './_components/datos-usuario/datos-usuario.component';
import { BuscarRecetasComponent } from './_components/buscar-recetas/buscar-recetas.component';

// Guards
import { AuthGuard} from './_guards/auth.guard';
import { LoginGuard} from './_guards/login.guard';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LayoutModule } from '@angular/cdk/layout';



@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegistroComponent,
    MainMenuComponent,
    DatosUsuarioComponent,
    BuscarRecetasComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatSidenavModule,
    LayoutModule,
    MatToolbarModule,
    MatIconModule,
    MatListModule,
    MatInputModule,
    MatRadioModule,
    MatFormFieldModule,
    MatOptionModule,
    MatSelectModule
  ],
  providers: [AuthGuard, LoginGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
