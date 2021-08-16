import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { StateService } from '../../../state/services/state.service';
import { User, NewUser } from '../../../interfaces/user.interface';
import { State } from '../../../interfaces/state.interface';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../auth/auth.service';
import { DomSanitizer } from '@angular/platform-browser';
import { FileValidatorDirective } from '../../../shared/directives/form/file-validator.directive';
import Swal from 'sweetalert2';
import { UserService } from '../../services/user.service';
import { LocalStorageService } from '../../../shared/services/local-storage.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private sanitizer: DomSanitizer,
    private stateService: StateService,
    private localStorageService: LocalStorageService
  ) { }

  user!: User;
  updateForm!: FormGroup;

  // Manejo de imagen
  @ViewChild('fileInput') fileInput!: ElementRef;
  preview!: string;
  userImgblob!: Blob;
  
  ngOnInit(): void {
    this.stateService.subscribe((state: State) => {
      this.user = state.user;
      fetch(this.user.img).then(res => res.blob()).then(blob => {
        this.getBase64(blob).then((res: any) =>{ 
          this.userImgblob = res.blob;
        });
      })
    });
    this.updateForm = this.fb.group({
      email: [this.user.email, [Validators.required, Validators.email]],
      name: [this.user.name, [Validators.required, Validators.maxLength(50)]],
      address: [this.user.address, [Validators.required, Validators.minLength(6)]],
      password: ['123456', [Validators.required, Validators.minLength(6)]],
      age: [this.user.age, [Validators.required, Validators.max(200)]],
      studies: [this.user.studies, [Validators.required, Validators.minLength(6)]],
      languages: [this.user.languages, [Validators.required, Validators.minLength(6)]],
      linkedin: [this.user.linkedin, [Validators.required, Validators.minLength(10),Validators.maxLength(300)]],
      hobbies: [this.user.hobbies, [Validators.required, Validators.minLength(6)]],
      img: [''],
    });

  }

  invalidEmail(): boolean {
    return this.updateForm?.controls.email?.errors?.email && this.updateForm?.controls.email?.touched;
  }

  invalidMinLength(inputName: string): boolean {
    return this.updateForm?.controls[inputName]?.errors?.minlength && this.updateForm?.controls[inputName]?.touched;
  }

  invalidAge(): boolean {
    return this.updateForm?.controls.password?.errors?.max && this.updateForm?.controls.password?.touched;
  }

  invalidImg(): boolean {
    return this.updateForm?.controls.img?.errors?.invalid && this.updateForm?.controls.img?.touched;
  }

  inputRequired(inputName: string) {
    return this.updateForm?.controls[inputName]?.errors?.required && this.updateForm?.controls[inputName]?.touched;
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
          reject(err);
        }
      } catch (err) {
        return err
      }
    }) 
  }

  updateUser() {

    if(this.updateForm.invalid){
      this.updateForm.markAllAsTouched();
      return; 
    }
    Object.entries(this.updateForm.value).forEach(([key, value]: any) => {
      if(key  === 'img'){
        this.data.append('img', this.fileInput.nativeElement.files[0] || this.userImgblob, this.fileInput.nativeElement.files[0]?.name || this.getImageName(this.user.img));
      }
      this.data.append(key, value);
    });
    this.userService.updateUser(this.user.id , this.data).subscribe((user: NewUser ): any => {
      if(user.error){
        return Swal.fire(user.error.error);
      }
      Swal.fire({
        icon: 'success',
        title: 'Se ha guardado correctamente',
        showConfirmButton: false,
        timer: 1500
      }).then( _ => {
        this.stateService.dispatchAction('setUser', user);
        this.localStorageService.setItem('user', user);
      });
    }); 
    Object.entries(this.updateForm.value).forEach(([key, value]: any) => {
      this.data.delete(key);
    });
  }

  getImageName(imgUrl: string) {
    const nameArr = imgUrl.split('/');
    const name = nameArr[nameArr.length -1];
    const [public_id] = name.split('.');
    return public_id;
  }

}
