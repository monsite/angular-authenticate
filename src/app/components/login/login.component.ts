import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { async } from 'rxjs';
import { User } from 'src/app/Models/user';
import { AuthenticateService } from 'src/app/services/authenticate.service';
import { TokenStorageService } from 'src/app/services/token-storage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
 
  submitted = false
  users:any
  user!:User
  messageError:boolean=false
  constructor(private auth:AuthenticateService,
    private router:Router,
    private location:Location,
    private localstroge:TokenStorageService) { }

  ngOnInit() {
  }

  // async listUsers() {
  //   await this.auth.getAllUsers().subscribe((data)=> {
  //     this.users = data
  //   })
  // }

  
  submit(form:NgForm) {

    const loginUser = {
      email:form.value.email,
      password:form.value.password
    }
    this.submitted = true
   
      if(form.invalid) {
        return
      }

      this.auth.login().subscribe((data)=> {
        console.log('qfqsdfqsdqsdgqsfggggggggggggggg',data)
        const currentUser = data.find((res:any) => {
          return res.email === loginUser.email && res.password === loginUser.password && res.role
        })
        if(currentUser) {
          console.log(currentUser)
          this.router.navigate(['dashboard-'+currentUser['role']])
          this.localstroge.setItem(JSON.stringify(currentUser))
        }
        else {
          this.messageError = true
        }
      })
      console.log(loginUser)
    
  }
  onReset() {
    
  }

}
