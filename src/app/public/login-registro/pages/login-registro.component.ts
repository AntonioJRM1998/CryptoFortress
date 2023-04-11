import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-login-registro',
  templateUrl: './login-registro.component.html',
  styleUrls: ['./login-registro.component.scss']
})
export class LoginRegistroComponent implements OnInit {
  irRegistro:boolean=false
  emailFormControl = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);
  constructor() { }

  ngOnInit(): void {
  }
  
  setRegistro(registro:boolean){
    this.irRegistro=registro
  }
  getRegistro(){
    return this.irRegistro
  }
}
