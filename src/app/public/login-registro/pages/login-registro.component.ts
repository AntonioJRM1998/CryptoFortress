import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-login-registro',
  templateUrl: './login-registro.component.html',
  styleUrls: ['./login-registro.component.scss']
})
export class LoginRegistroComponent implements OnInit {
  irRegistro:boolean=false
  constructor(private userservices:UserService) { }

  ngOnInit(): void {
  }
  
  setRegistro(registro:boolean){
    this.irRegistro=registro
  }
  getRegistro(){
    return this.irRegistro
  }
}
