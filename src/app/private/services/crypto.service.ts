import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { cryptoMonedas } from '../dashboard/models/crypto.model';
import { tap } from 'rxjs/operators'

@Injectable({
  providedIn: 'root',
})

export class CryptoService {
  private REST_API_SERVER = 'http://localhost:9000/crypto';
  private _refresh$ =new Subject<void>()

  constructor(private httpClient: HttpClient) { }

  getAllCoins():Observable<cryptoMonedas[]>{
    return this.httpClient.get<cryptoMonedas[]>(this.REST_API_SERVER +'/getCoins');
  }
  updateCoins(crypto_id:number,stock:number):Observable<string>{
    return this.httpClient.post<string>(this.REST_API_SERVER +'/update',{crypto_id:crypto_id,stock:stock})
    .pipe(
      tap(()=>{
        this._refresh$.next()
    }))
  }
  getRefesh(){
    return this._refresh$
  }
}