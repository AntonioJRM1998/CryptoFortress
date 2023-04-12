import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { user } from 'src/app/public/login-registro/models/user.interface';
import { UserService } from 'src/app/public/services/user.service';

@Component({
  selector: 'app-dashboarduser',
  templateUrl: './dashboarduser.component.html',
  styleUrls: ['./dashboarduser.component.scss']
})
export class DashboarduserComponent implements OnInit {
  usuario!:user
  constructor(private userservice:UserService,private router:Router) { 
  }

  ngOnInit(): void {
    if(this.userservice.estaLogeado()){

    }else{
      this.router.navigate(['/'])
    }
    const token=sessionStorage.getItem('token') || ''
      this.userservice.getUserById(token).subscribe(user =>{
        this.usuario=user
        this.userservice.setUsuario(this.usuario)
    })
    this.userservice.balance.subscribe(result=>{
      this.usuario.deposit=result
    })
  }
}
