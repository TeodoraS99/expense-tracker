import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalService {

  constructor() { }

  saveData(key: string, data: any) {
    localStorage.setItem(key, data);
  }

  getData(key: string) {
    return localStorage.getItem(key);
  }

  removeData(key: string) {
    localStorage.removeItem(key);
  }

  clearData() {
    localStorage.clear();
  }
}
