import { ReactiveFormsModule } from '@angular/forms';

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginRegistroComponent } from './pages/login-registro.component';
import { LoginComponent } from './components/login/login.component';
import {MatInputModule} from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { RegistroComponent } from './components/registro/registro.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { HttpClientModule } from '@angular/common/http';




@NgModule({
  declarations: [
    LoginRegistroComponent,
    LoginComponent,
    RegistroComponent
  ],
  imports: [
    CommonModule,
    MatInputModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatSnackBarModule,
    HttpClientModule

  ]
})
export class LoginRegistroModule { }
