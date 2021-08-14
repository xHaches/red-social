import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { LocalStorageService } from '../../shared/services/local-storage.service';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  loginForm: FormGroup = this.fb.group({
    email: ['test5@test.com', [Validators.required, Validators.email]],
    password: ['123456', [Validators.required, Validators.minLength(6)]]
  });

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService,
    private localStorageService: LocalStorageService
  ) { }

  invalidEmail(): boolean {
    // Si el error email existe y si el campo email ha sido tocado
    return this.loginForm?.controls.email?.errors?.email && this.loginForm?.controls.email?.touched;
  }

  invalidPassword(): boolean {
    // Si el error password existe y si el campo password ha sido tocado
    return this.loginForm?.controls.password?.errors?.minlength && this.loginForm?.controls.password?.touched;
  }

  inputRequired(inputName: string) {
    return this.loginForm?.controls[inputName]?.errors?.required && this.loginForm?.controls[inputName]?.touched;
  }

  login() {
    if(this.loginForm.invalid){
      this.loginForm.markAllAsTouched();
      return; 
    }
    this.authService.login(this.loginForm.value).subscribe((session: any): any => {
      if(session.error){
        return Swal.fire(session.error.msg);
      }
      Swal.fire({
        icon: 'success',
        title: 'Inicio de sesión exitoso',
        showConfirmButton: false,
        timer: 1500
      }).then( _ => {
        this.localStorageService.setItem('user', session.user);
        this.localStorageService.setItem('token', session.token);
        this.router.navigate(['profile'])
      });
    }); 
  }
}
