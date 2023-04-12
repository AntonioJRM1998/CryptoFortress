import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/public/services/user.service';

@Component({
  selector: 'app-perfil-user',
  templateUrl: './perfil-user.component.html',
  styleUrls: ['./perfil-user.component.scss']
})
export class PerfilUserComponent implements OnInit {
  hide = true;
  constructor(private userservice:UserService) {
   }

  ngOnInit(): void {
  }

}
