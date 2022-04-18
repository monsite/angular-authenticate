import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TokenStorageService } from 'src/app/services/token-storage.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  isLogged:any
  user:any
  constructor(private tokenAuth:TokenStorageService,private router:Router) { }

  ngOnInit(): void {

    this.user = this.tokenAuth.getUser()
    if(this.user.length !== 0) {
      this.isLogged = true
    }
  }


  logout() {
    this.tokenAuth.removeToken()
    this.router.navigate(['login'])
    this.isLogged = false
  }
  

}
