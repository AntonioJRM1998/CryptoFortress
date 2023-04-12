import { Component, EventEmitter, Inject, Input, OnInit } from '@angular/core';
import { user } from 'src/app/public/login-registro/models/user.interface';
import { UserService } from 'src/app/public/services/user.service';
import { MAT_DIALOG_DATA} from '@angular/material/dialog';
import { cryptoMonedas } from '../../models/crypto.model';
import { CryptoUserService } from 'src/app/private/services/crypto-users.service';
import { cryptoUserCoins } from '../../models/crypto-user.model';
import { CryptoService } from 'src/app/private/services/crypto.service';

@Component({
  selector: 'app-compra-venta',
  templateUrl: './compra-venta.component.html',
  styleUrls: ['./compra-venta.component.scss']
})
export class CompraVentaComponent implements OnInit {
  usuario:user ={} as user
  inputValue:number=0
  tusMonedas:number=0
  type:string=''
  newBalance:number=0
  cerrarModal=false

  constructor(private userservice:UserService, 
    @Inject(MAT_DIALOG_DATA) public data: 
    cryptoMonedas,
    private cryptoUserService:CryptoUserService,
    private cryptoSrvice:CryptoService) {
    const token=sessionStorage.getItem('token') || ''
      this.userservice.getUserById(token).subscribe(user =>{
        this.usuario=user
        this.userservice.setUsuario(this.usuario)
        this.newBalance=this.usuario.deposit
    })
   }

  ngOnInit(): void {
    this.type=sessionStorage.getItem('trade') || ''
    this.cryptoUserService.getCoinByCryptoId(this.data.crypto_id,sessionStorage.getItem('token') || '').subscribe(coin =>{
      if(!!coin){
        this.tusMonedas=coin.amount
      }else{
        this.tusMonedas=0
      }
    })
  }
  comprarMonedas(coin:cryptoMonedas){
    if(parseFloat(this.inputValue.toString()) > 0 && (this.inputValue*coin.value) <= parseFloat(this.usuario.deposit.toString()) && parseFloat(this.inputValue.toString())<=parseFloat(coin.stock.toString())){
      let coinUser:cryptoUserCoins
      let amoutTotal:number=parseFloat(this.inputValue.toString()) + parseFloat(this.tusMonedas.toString())
      coinUser = {user_id:sessionStorage.getItem('token') || '',crypto_id:coin.crypto_id,amount:amoutTotal}
      this.newBalance=this.newBalance - (this.inputValue * coin.value)
      this.cryptoSrvice.updateCoins(coinUser.crypto_id,(this.data.stock-this.inputValue)).subscribe(_result=>{})
      this.cryptoUserService.updateCoinUser(coinUser).subscribe(_resutl =>{})
      this.userservice.updateBalance(this.newBalance,coinUser.user_id).subscribe(_resutl=>{})
      this.userservice.balance.emit(this.newBalance)
      this.cerrarModal=true
    }else{
      console.log('He fallado')
    }
  }
  venderMonedas(coin:cryptoMonedas){
    if(parseFloat(this.inputValue.toString())>0 && parseFloat(this.inputValue.toString())<=parseFloat(this.tusMonedas.toString())){
      let coinUser:cryptoUserCoins
      let amoutTotal:number=parseFloat(this.tusMonedas.toString()) - parseFloat(this.inputValue.toString())
      let totalStock:number=parseFloat(this.data.stock.toString()) + parseFloat(this.inputValue.toString())
      coinUser = {user_id:sessionStorage.getItem('token') || '',crypto_id:coin.crypto_id,amount:amoutTotal}
      this.newBalance=parseFloat(this.newBalance.toString()) + parseFloat((this.inputValue * coin.value).toString())
      this.cryptoSrvice.updateCoins(coinUser.crypto_id,(totalStock)).subscribe(result=>{console.log(result)})
      this.cryptoUserService.updateCoinUser(coinUser).subscribe(resutl =>{console.log(resutl)})
      this.userservice.updateBalance(this.newBalance,coinUser.user_id).subscribe(_resutl=>{
      this.userservice.balance.emit(this.newBalance)
      })
    }else{
      console.log('He fallado vender')
    }
  }
}
