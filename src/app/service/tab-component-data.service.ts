import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TabComponentDataService {
 
  tabs = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday', 'Summary'];

  constructor() { }
}
