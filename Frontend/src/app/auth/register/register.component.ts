import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import Swal from 'sweetalert2';
import { NewUser } from '../../interfaces/user.interface';
import { FileValidatorDirective } from '../../shared/directives/form/file-validator.directive';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  @ViewChild('fileInput') fileInput!: ElementRef;
  preview!: string;

  registerForm: FormGroup = this.fb.group({
    email: ['test5@test.com', [Validators.required, Validators.email]],
    name: ['Luis', [Validators.required, Validators.maxLength(50)]],
    address: ['Direccion 1', [Validators.required, Validators.minLength(6)]],
    password: ['123456', [Validators.required, Validators.minLength(6)]],
    age: ['23', [Validators.required, Validators.max(200)]],
    studies: ['Universidad', [Validators.required, Validators.minLength(6)]],
    languages: ['Español, Inglés', [Validators.required, Validators.minLength(6)]],
    linkedin: ['https://www.linkedin.com/in/luis-hern%C3%A1ndez-228173189/', [Validators.required, Validators.maxLength(300)]],
    hobbies: ['Caminar, Leer', [Validators.required, Validators.minLength(6)]],
    img: ['', [FileValidatorDirective.validate]],
  });

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService,
    private sanitizer: DomSanitizer
  ) { }

  invalidEmail(): boolean {
    return this.registerForm?.controls.email?.errors?.email && this.registerForm?.controls.email?.touched;
  }

  invalidPassword(): boolean {
    return this.registerForm?.controls.password?.errors?.minlength && this.registerForm?.controls.password?.touched;
  }

  invalidMinLength(): boolean {
    return this.registerForm?.controls.password?.errors?.minlength && this.registerForm?.controls.password?.touched;
  }

  invalidAge(): boolean {
    return this.registerForm?.controls.password?.errors?.max && this.registerForm?.controls.password?.touched;
  }

  invalidImg(): boolean {
    return this.registerForm?.controls.img?.errors?.invalid && this.registerForm?.controls.img?.touched;
  }

  inputRequired(inputName: string) {
    return this.registerForm?.controls[inputName]?.errors?.required && this.registerForm?.controls[inputName]?.touched;
  }
  data = new FormData();
  onFileChange(event: any) {
    if (event?.target?.files?.length > 0) {
      const file = event?.target?.files[0];
      this.getBase64(file).then((img: any) => {
        this.preview = img.base;
      });
    }
  }

  async getBase64($event: any) {
    return new Promise((resolve, reject) => {
      try {
        const unsafeImg = window.URL.createObjectURL($event);
        const image = this.sanitizer.bypassSecurityTrustUrl(unsafeImg);
        const reader = new FileReader();
        reader.readAsDataURL($event);
        reader.onload = () => {
          resolve({
            blob: $event,
            image,
            base: reader.result
          });
        };
        reader.onerror = err => {
          reject({
            blob: $event,
            image,
            base: reader.result
          });
        }
      } catch (err) {
        return err
      }
    }) 
  }

  register() {

    Object.entries(this.registerForm.value).forEach(([key, value]: any) => {
      this.data.delete(key);
    });
    if(this.registerForm.invalid){
      this.registerForm.markAllAsTouched();
      return; 
    }
    Object.entries(this.registerForm.value).forEach(([key, value]: any) => {
      if(key  === 'img'){
        this.data.append('img', this.fileInput.nativeElement.files[0], this.fileInput.nativeElement.files[0].name);
      }
      console.log(key, value);
      this.data.append(key, value);
    });
    this.authService.register(this.data).subscribe((user: NewUser ): any => {
      if(user.error){
        return Swal.fire(user.error.error);
      }
      Swal.fire({
        icon: 'success',
        title: 'Registro exitoso',
        showConfirmButton: false,
        timer: 1500
      }).then( _ => {
        this.router.navigate(['login'])
      });
    }); 
  }
}
