import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from 'src/app/service/auth.service';
import { LoginUserModel } from 'src/app/models/interfaces';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {  
  loginUserForm: FormGroup;
  errorMessage: string;

  constructor(
    private fb: FormBuilder,
    private auth: AuthService) { 
      
      this.auth.eventAuthError$.subscribe(data => {    
        this.errorMessage = data;      
      });    
  }

  ngOnInit() {    
    this.initForm();
  }
  get _email(){
    return this.loginUserForm.get('email');
  }
  
  get _password(){
    return this.loginUserForm.get('password');
  }

  private initForm() {
    this.loginUserForm = this.fb.group({    
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]]
    });
  }

  public onSubmit(){
    let logginUser: LoginUserModel = {
        Email: this.loginUserForm.get('email').value,
        Password: this.loginUserForm.get('password').value
     };

     this.auth.login(logginUser);

     this.loginUserForm.reset();
  }
}
