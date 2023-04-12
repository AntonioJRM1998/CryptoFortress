import { EventEmitter, Injectable, Output } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { user } from '../login-registro/models/user.interface';
@Injectable({
  providedIn: 'root',
})
export class UserService {
  private REST_API_SERVER = 'http://localhost:9000/user';
  usuario!: user;
  logeando:boolean=false
  @Output() balance:EventEmitter<number>=new EventEmitter()
  constructor(private httpClient: HttpClient) { }

  estaLogeado() {
    if (!!sessionStorage.getItem('token')) {
      return true;
    }
    return false;
  }
  getUsuariosBBDD(email: string, password: string): Observable<user> {
    return this.httpClient.post<user>(this.REST_API_SERVER + '/getUser', { email: email, password: password });
  }
  addNewUser(newUser: user): Observable<string> {
    return this.httpClient.post<string>(this.REST_API_SERVER + '/addUser', newUser);
  }
  getUserById(userid:string): Observable<user> {
    return this.httpClient.get<user>(this.REST_API_SERVER +'/getUserById/'+userid);
  }
  setUsuario(user:user){
    this.usuario=user
  }
  getUsuario(){
    return this.usuario;
  }
  updateBalance(newBalance:number,user_id:string):Observable <string>{
    return this.httpClient.post<string>(this.REST_API_SERVER +'/update',{balance:newBalance,user_id:user_id});
  }
}