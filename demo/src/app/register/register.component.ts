import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(
    private authService: AuthService,
     private router: Router, 
     private formBuilder: FormBuilder
     ) { }

  registerForm: FormGroup;
  isSubmitted: boolean = false;


  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      firstname: ['', Validators.required],
      mellanname: ['', Validators.required],      
      lastname: ['', Validators.required],
      birthday:['', Validators.required],
      addresslinefaktura: ['', Validators.required],
      postnumber:   ['', Validators.required],
      invoicecity:   ['', Validators.required],
      invoicecountry:['', Validators.required],
      addressline: ['', Validators.required],
      zipcode: ['', Validators.required],
      city: ['', Validators.required],
      email: ['', [Validators.required, Validators.email ]],
      password: ['', [Validators.required, Validators.minLength(3)]]
    })
  }

  // get formControls() { return this.registerForm.controls }
  get f() { return this.registerForm.controls }


  register() {
    this.isSubmitted = true;

    if(this.registerForm.invalid) {
     // console.log("form is invalid")
      return;
    }

    this.authService.register(this.registerForm.value).subscribe((registerres) => {
      console.log("registration success: " + registerres["success"])
      if(registerres["success"] === true) {
        console.log("inside register if-statement")
        this.authService.login(this.registerForm.value).subscribe((loginres) => {
          console.log("login success: " + loginres["success"])
          if(loginres["success"]) {
            console.log("inside login if-statement")
            this.router.navigateByUrl('/login');
          //  alert('SUCCESS!! :-)\n\n' + JSON.stringify(this.registerForm.value))
          }
          else {
            console.log("inside login else-statement")
            this.router.navigateByUrl('/login');
          }         
        })        
      }    
    })
  }
}




