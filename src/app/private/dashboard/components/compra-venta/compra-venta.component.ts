import { Component, Inject, OnInit } from '@angular/core';
import { user } from 'src/app/public/login-registro/models/user.interface';
import { UserService } from 'src/app/public/services/user.service';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { cryptoMonedas } from '../../models/crypto.model';

@Component({
  selector: 'app-compra-venta',
  templateUrl: './compra-venta.component.html',
  styleUrls: ['./compra-venta.component.scss']
})
export class CompraVentaComponent implements OnInit {
  usuario:user ={} as user
  inputValue:number=0
  constructor(private userservice:UserService, @Inject(MAT_DIALOG_DATA) public data: cryptoMonedas) {
    const token=sessionStorage.getItem('token') || ''
      this.userservice.getUserById(token).subscribe(user =>{
        this.usuario=user
        this.userservice.setUsuario(this.usuario)
    })
   }

  ngOnInit(): void {
  console.log(this.data.crypto_name)
  }
  calcularTotal(){
    let inputValue:number=parseInt(document.getElementById('inputCompraVenta')?.innerHTML || '')
    return this.data.value*inputValue
  }
}
