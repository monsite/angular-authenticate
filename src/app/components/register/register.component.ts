import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticateService } from 'src/app/services/authenticate.service';
import { TokenStorageService } from 'src/app/services/token-storage.service';
import { ConfirmedValidator } from './Validation';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  registerForm!: FormGroup;
  submitted:boolean = false
  constructor(private formBuilder:FormBuilder,private auth:AuthenticateService,
    private router:Router,
    private location:Location,
    private tokenServ:TokenStorageService) { }

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      firstName:['',[Validators.required, Validators.minLength(3)]],
      lastName:['',[Validators.required, Validators.minLength(3)]],
      email:['',[Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required],
      tel: ['', [Validators.required, Validators.minLength(8)]],
      adress: ['', Validators.required],
    },
{   
   validator:ConfirmedValidator('password', 'confirmPassword')
}    
    )

    console.log(this.f)
  }

  get f(): { [key: string]: AbstractControl } {
    return this.registerForm.controls;
  }
  onSubmit() {
    this.submitted = true
    const user = {
      firstname: this.registerForm.value.firstName,
      lastname:  this.registerForm.value.lastName,
      email:  this.registerForm.value.email,
      password: this.registerForm.value.password,
      tel:  this.registerForm.value.tel,
      adresse:  this.registerForm.value.adress,
      role:  "client",
    }
    if(this.registerForm.invalid) {
      return
    }
    else {
      this.auth.registerUser(user).subscribe((done) => {
        this.tokenServ.setItem(JSON.stringify(user))
        this.router.navigate(['dashboard-admin'])
      })
    }
     
      console.log(this.registerForm.value)
    

  }
  onReset() {
    this.registerForm.reset();
    this.location.back()
  }
}
