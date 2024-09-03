import { Injectable } from '@angular/core';
import { LocalService } from './local.service';


@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  private readonly CATEGORY_KEY = 'categories';

  constructor(private localService: LocalService) { }

  getCategories() {
    let localStorageCategories = localStorage.getItem(this.CATEGORY_KEY);
    if (localStorageCategories) {
      const categories = JSON.parse(localStorageCategories);
      return categories;
    } else {
      return [];
    }
  }

  addCategory(categories: string[], category: string): void {
    categories.push(category);
    localStorage.setItem(this.CATEGORY_KEY, JSON.stringify(categories));
  }

  deleteCategory(categories: string[], category: string): void {
    categories = categories.filter(item => item !== category);
    localStorage.setItem(this.CATEGORY_KEY, JSON.stringify(categories));

    // this.localService.saveData(this.CATEGORY_KEY, JSON.stringify(categories)) //linia asta e echivalentul lui 31
  }
}
