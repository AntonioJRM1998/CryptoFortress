import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { UserService } from 'src/app/public/services/user.service';
import { user } from '../../models/user.interface';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.scss'],
})
export class RegistroComponent implements OnInit {
  emailFormControl = this.validacionesLogin();
  constructor(
    private router: Router,
    private _formBuilder: FormBuilder,
    private userService: UserService,
    private _snackbar: MatSnackBar
  ) {}

  ngOnInit(): void {}
  registrarse() {
    if (this.emailFormControl.valid) {
      console.log(parseFloat(this.emailFormControl.get('deposit')?.value));
      let user: user = {
        user_id: '',
        username: this.emailFormControl.get('username')?.value,
        email: this.emailFormControl.get('email')?.value,
        password: this.emailFormControl.get('password')?.value,
        deposit: this.emailFormControl.get('deposit')?.value,
        birthdate: '',
      };
      this.userService.addNewUser(user).subscribe((_result) => {
        window.location.reload();
      });
    }else{
      this,this.openSnackBar('Alguno de los campos no son correctos o estan incompletos')
    }
  }
  validacionesLogin() {
    return this._formBuilder.group({
      username: ['', [Validators.required, Validators.minLength(3)]],
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
      deposit: ['', [Validators.required, Validators.pattern(/^[1-9][0-9]*$/)]],
    });
  }
  openSnackBar(message: string) {
    this._snackbar.open(message, 'Cerrar', {
      horizontalPosition: 'center',
      duration: 2000,
    });
  }
}
