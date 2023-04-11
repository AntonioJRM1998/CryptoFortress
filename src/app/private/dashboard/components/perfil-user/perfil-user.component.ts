import { Component, OnInit } from '@angular/core';
import { user } from 'src/app/public/login-registro/models/user.interface';
import { UserService } from 'src/app/public/services/user.service';

@Component({
  selector: 'app-perfil-user',
  templateUrl: './perfil-user.component.html',
  styleUrls: ['./perfil-user.component.scss']
})
export class PerfilUserComponent implements OnInit {
  hide = true;
  usuario!:user
  constructor(private userservice:UserService) {
    const token=sessionStorage.getItem('token') || ''
      this.userservice.getUserById(token).subscribe(user =>{
        this.usuario=user
        this.userservice.setUsuario(this.usuario)
    })
   }

  ngOnInit(): void {
  }

}
