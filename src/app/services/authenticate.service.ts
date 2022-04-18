import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../Models/user';

@Injectable({
  providedIn: 'root'
})
export class AuthenticateService {
  
  constructor(private httpClient:HttpClient) { }

  registerUser(data:User) : Observable<User>{
    return this.httpClient.post<User>('http://localhost:3000/users',data)
  }

  login():Observable<any> {
    return this.httpClient.get('http://localhost:3000/users')
  }

  
}
