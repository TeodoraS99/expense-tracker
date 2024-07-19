import { Injectable } from '@angular/core';
import { LocalService } from './local.service';

// const CATEGORY_KEY = 'categories'; //key pt stocare in localstorage

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  mockCategories = [
    "Mancare", "Electricitate", "Masina"
  ];

  private readonly CATEGORY_KEY = 'categories';
  constructor(private localService: LocalService) { }

  getCategories(): any {
    // return this.localService.getData(this.CATEGORY_KEY);
    return this.mockCategories;
  }

  addCategory(category: string): void {
    const categories = this.getCategories();
    categories.push(category);
    this.localService.saveData(this.CATEGORY_KEY, categories);
  }

  deleteCategory(category: string): void {
    const categories = this.getCategories();
    // if (index > -1) {
    //   this.categories.splice(index, 1);
    //   this.localService.saveData(this.CATEGORY_KEY, categories);
    // }
  }
}
