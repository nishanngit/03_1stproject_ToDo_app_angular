import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataService {
    //login name display
    currentUser:any;

      //EmailID display
      currentEmail:any;

  userDetails:any={  //object of objects  ..... database details......
    '10':{emailid:'10',username:'Gopik',password:'123',taskname:'test1',taskdesc:'testdesc1',tasklist:[]},
    '11':{emailid:'11',username:'Soja',password:'123',taskname:'test2',taskdesc:'testdesc2',tasklist:[]},
    '12':{emailid:'12',username:'Abhijith',password:'123',taskname:'test3',taskdesc:'testdesc3',tasklist:[]}
   }


  constructor() { this.getDetails(); }

  //saveDetails()  - to store data in localstorage

saveDetails(){
  if(this.userDetails){
    localStorage.setItem('dataBase',JSON.stringify(this.userDetails));
  }
  if(this.currentEmail){
    localStorage.setItem('currentEmail',JSON.stringify(this.currentEmail));
  }
  if(this.currentUser){
    localStorage.setItem('currentUser',JSON.stringify(this.currentUser));
  }
}


//getDetails()  - To get the data from the local storage

getDetails(){
  if(localStorage.getItem('dataBase')){
    this.userDetails = JSON.parse(localStorage.getItem('dataBase') || '');
  }
}
getCurrentUser(){
  if(localStorage.getItem('currentUser')){
    this.userDetails = JSON.parse(localStorage.getItem('currentUser') || '');
  }
}

getCurrentAcno(){
  if(localStorage.getItem('currentEmail')){
    this.userDetails = JSON.parse(localStorage.getItem('currentEmail') || '');
  }
}





register(emailid:any,username:any,password:any){//names/order same like database above
  let userDetails = this.userDetails;
  if(emailid in userDetails){
    return false;
  }else{
    userDetails[emailid]={
      emailid,
      username,
      password,
      taskname:0,
      taskdesc:0,
      tasklist:[]
    }
    console.log(userDetails);   
    this.saveDetails();//function call   
    return true;
  }
}



  login(emailid:any,password:any){
    var userDetails = this.userDetails;
    if(emailid in userDetails){
      if(password==userDetails[emailid]['password']){
        this.currentUser=this.userDetails[emailid]['username'];
        this.currentEmail=emailid;
        this.saveDetails();//function call  
        return true;
      }else{
        alert('Incorrect password');
        return false;
      }
    }else{
      alert('invalid user');
      return false;
    }
  }
 


  task(taskname:any,taskdesc:any){   
    var userDetails = this.userDetails;
    var currentEmail = this.currentEmail;
    var taskname  = taskname;
    var taskdesc = taskdesc;
    userDetails[currentEmail]['taskname']=taskname;
    userDetails[currentEmail]['taskdesc']=taskdesc;
    userDetails[currentEmail]['tasklist'].push(
      {type:taskname,type2:taskdesc } 
      )
    console.log(userDetails);
    this.saveDetails();//function call  
    return true;
  }
   
  getTasklist(currentEmail:any){
    return this.userDetails[currentEmail]['tasklist'];
  }

   

}
