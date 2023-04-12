import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { cryptoMonedas } from '../dashboard/models/crypto.model';
import { cryptoUserCoins } from '../dashboard/models/crypto-user.model';

@Injectable({
  providedIn: 'root',
})

export class CryptoUserService {
  private REST_API_SERVER = 'http://localhost:9000/crypto-user';
  constructor(private httpClient: HttpClient) { }

  updateCoinUser(newUserCoin:cryptoUserCoins):Observable<string>{
    return this.httpClient.post<string>(this.REST_API_SERVER +'/update',newUserCoin);
  }
  getCoinByCryptoId(crypto_id:number,user_id:string):Observable <cryptoUserCoins>{
    return this.httpClient.post<cryptoUserCoins>(this.REST_API_SERVER +'/getCoinsByIds',{crypto_id:crypto_id,user_id:user_id});
  }
}