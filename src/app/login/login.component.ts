import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private fb:FormBuilder,private ds:DataService,private router:Router) { }

  ngOnInit(): void {
  }

  // login Model
    loginForm = this.fb.group({ // model
    emailid:['',[Validators.required,Validators.pattern('[0-9]*')]], // array
    password:['',[Validators.required,Validators.pattern('[a-zA-Z0-9]*')]] // array
 })


   

  

login(){
  //   alert('Login Clicked . . . ');
  if(this.loginForm.valid){
    var emailid = this.loginForm.value.emailid; 
    var password = this.loginForm.value.password; 
const result = this.ds.login(emailid,password);
if(result){
alert('login successfull -');
this.router.navigateByUrl('dashboard');
}
 }
 else{
  console.log(this.loginForm.get('emailid')?.errors);
 }
}







}
