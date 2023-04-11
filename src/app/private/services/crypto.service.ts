import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { cryptoMonedas } from '../dashboard/models/crypto.model';

@Injectable({
  providedIn: 'root',
})

export class CryptoService {
  private REST_API_SERVER = 'http://localhost:9000/crypto';
  constructor(private httpClient: HttpClient) { }

  getAllCoins():Observable<cryptoMonedas[]>{
    return this.httpClient.get<cryptoMonedas[]>(this.REST_API_SERVER +'/getCoins');
  }
}