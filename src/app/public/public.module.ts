import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginRegistroModule } from './login-registro/login-registro.module';
import { PublicRoutingModule } from './public-routing.module';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    LoginRegistroModule,
    PublicRoutingModule
  ]
})
export class PublicModule { }
