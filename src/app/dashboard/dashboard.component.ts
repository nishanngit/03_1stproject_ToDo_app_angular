import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  user="";

    //to hold emailid
    emailid:any;

    //to hold tasklist
    tasklist:any;

    //for delete

 
  constructor(private fb:FormBuilder,private ds:DataService,private router:Router) { 
    this.user = this.ds.currentUser;
    this.emailid=this.ds.currentEmail;
    this.tasklist=this.ds.getTasklist(this.emailid);
  }

  ngOnInit(): void {
    if(!localStorage.getItem('currentEmail')){
      alert('Please login first');
      this.router.navigateByUrl('');
    }
  }

 

 
 // Task Model
 taskForm = this.fb.group({ // model
  taskname:['',[Validators.required,Validators.pattern('[a-zA-Z0-9]*')]], // array
  taskdesc:['',[Validators.required,Validators.pattern('[a-zA-Z0-9]*')]], // array
 })


task(){
  if(this.taskForm.valid){
 
  var taskname = this.taskForm.value.taskname;
  var taskdesc = this.taskForm.value.taskdesc;
  const result = this.ds.task(taskname,taskdesc);
  if(result){
    alert(`${taskdesc}`);
  }
  }

}

 del(){
  localStorage.clear();
 }


logout(){
  //remove uname
  localStorage.removeItem('currentUser');
  localStorage.removeItem('currentEmail');

  //navigate to login page
  this.router.navigateByUrl('');
}

 
}
