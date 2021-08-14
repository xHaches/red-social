import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LocalStorageService } from '../../services/local-storage.service';


import Swal from 'sweetalert2';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  constructor(
    private localStorageService: LocalStorageService,
    private router: Router
    ) { }

  ngOnInit(): void {
  }

  get loggedIn(): boolean {
    const token = this.localStorageService.getItem('token')
    const user = this.localStorageService.getItem('user');
    if(JSON.stringify(token) && JSON.stringify(user) === '{}') {
      return false
    }
    return true
  }
  
  logout() {

    Swal.fire({
      title: '¿Seguro?',
      text: "Estás a punto de cerrar sesión",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Salir',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.localStorageService.removeItem('token');
        this.localStorageService.removeItem('user');
        this.router.navigateByUrl('/login')
      }
    });

  }
}
