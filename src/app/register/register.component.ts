import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  constructor(private fb:FormBuilder, private ds:DataService,private router:Router) { }

  ngOnInit(): void {
  }

  
  // login Model
  registerForm = this.fb.group({ // model
    username:['',[Validators.required,Validators.pattern('[a-z]*')]], // array
    emailid:['',[Validators.required,Validators.pattern('[0-9]*')]], // array
    password:['',[Validators.required,Validators.pattern('[a-zA-Z0-9]*')]] // array
 })

 register(){
  // alert("Register button clicked");
  console.log(this.registerForm);
  if(this.registerForm.valid){
    var emailid = this.registerForm.value.emailid;
   var username = this.registerForm.value.username;
   var password = this.registerForm.value.password;
   const result = this.ds.register(emailid,username,password);
   if(result){
       alert("successfully registered");
       this.router.navigateByUrl('');
     }else{
       alert("something went wrong");
     }
   }else{
     console.log(this.registerForm.get('emailid')?.errors);
     
   }
 }

}
