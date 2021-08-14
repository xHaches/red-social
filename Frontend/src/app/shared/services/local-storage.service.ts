import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {
  
  setItem(key: string, value: Object) {
    localStorage.setItem(key, JSON.stringify(value));
  }

  getItem(key: string) {
    return JSON.parse(localStorage.getItem(key) || '{}') || {};
  }

  removeItem(key: string) {
    localStorage.removeItem(key);
  }

}
