import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from 'src/app/service/auth.service';
import { CreateUserModel } from 'src/app/models';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerUserForm: FormGroup;  
  errorMessage: string;

  constructor(
    private fb: FormBuilder,
    private auth: AuthService
  ) {         
    this.auth.eventAuthError$.subscribe(data => {    
     this.errorMessage = data;      
    });
  }

  ngOnInit() {
    this.initForm();
  }

  get _email(){
    return this.registerUserForm.get('email');
  }
  
  get _firstname(){
    return this.registerUserForm.get('firstname');
  }

  get _lastname(){
    return this.registerUserForm.get('lastname');
  }

  get _password(){
    return this.registerUserForm.get('password');
  }

  private initForm() {
    this.registerUserForm = this.fb.group({    
      email: ['', [Validators.required, Validators.email]],
      firstname: ['', [Validators.required]],
      lastname: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(8)]]
    });
  }

  public onSubmit(){
    let new_user: CreateUserModel = {
        Email: this._email.value,
        FirstName: this._firstname.value,
        LastName: this._lastname.value,    
        Password: this._password.value
     };
     
    this.auth.createUser(new_user);
    this.registerUserForm.reset();
  }

}
