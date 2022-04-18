import { Injectable } from '@angular/core';
import { of } from 'rxjs';
const token:any="TokenJWT"

@Injectable({
  providedIn: 'root'
})
export class TokenStorageService {

  constructor() { }

  setItem(data:any) {
    localStorage.setItem(token,data)
  }
  removeToken() {
     localStorage.removeItem(token)
  }
  getToken() {
    return localStorage.getItem(token)
  }
  public getUser():any {
    const user = this.getToken()
    if(user) {
      return user
    }
    return {}
  }
}
