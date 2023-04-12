import { Component, OnInit } from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
import { LoginRegistroComponent } from '../../pages/login-registro.component';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserService } from 'src/app/public/services/user.service';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  emailFormControl = this.validacionesLogin()
  logeando:boolean=false
  constructor(private loginregistro:LoginRegistroComponent,private router:Router,private _formBuilder: FormBuilder,private _snackbar: MatSnackBar,private userservice:UserService) { }

  ngOnInit(): void {
    if(sessionStorage.getItem('token')){
      sessionStorage.removeItem('token')
    }
    if(sessionStorage.getItem('trade')){
      sessionStorage.removeItem('trade')
    }
  }
  goToRegistro(){
      this.loginregistro.setRegistro(true)
  }
  login(email:string,password:string){
    if(this.emailFormControl.valid){
      this.userservice.getUsuariosBBDD(email,password).subscribe(user =>{
        if(!!user){
          this.logeando=true
          sessionStorage.setItem('token',user.user_id)
          setTimeout(() => {
              this.logeando = false;
              this.router.navigate(['/private/dashboard'])
            }, 3000);
        }else{
          this.openSnackBar('Email o contraseña incorrectas')
        }
      })
    }else{
      this.openSnackBar('Introduce un corre y contraseña validos')
    }
  }
  validacionesLogin() {
    return this._formBuilder.group({
      email: [
        '',
        [
          Validators.required,
          Validators.pattern(/^[\w.%+-]+@[\w.-]+\.[a-zA-Z]{2,}$/),
        ],
      ],
      password: [
        '',
        [
          Validators.required,
          Validators.minLength(8),
          Validators.maxLength(14),
        ],
      ],
    });
  }
  openSnackBar(message:string) {
    this._snackbar.open(message,'Cerrar', {
      horizontalPosition: 'center',
      duration: 2000,
    });
  }
}
