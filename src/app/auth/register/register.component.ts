import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from 'src/app/service/auth.service';
import { CreateUserModel } from 'src/app/models/interfaces';

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
      password: ['', [Validators.required, Validators.min(8)]]
    });
  }

  public onSubmit(){
    let new_user: CreateUserModel = {
        Email: this.registerUserForm.get('email').value,
        FirstName: this.registerUserForm.get('firstname').value,
        LastName: this.registerUserForm.get('lastname').value,    
        Password: this.registerUserForm.get('password').value
     };

    console.log(new_user);

    this.auth.createUser(new_user);
  }

}
