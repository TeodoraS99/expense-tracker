import { Injectable } from '@angular/core';
import { LocalService } from './local.service';

// const CATEGORY_KEY = 'categories'; //key pt stocare in localstorage

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  categories: string[] = [];
  localCategoriesString: string | null = "";
  // mockCategories = [
  //   "Mancare", "Electricitate", "Masina"
  // ];

  private readonly CATEGORY_KEY = 'categories';
  constructor(private localService: LocalService) { }

  getCategories(): any {
    this.localCategoriesString = this.localService.getData(this.CATEGORY_KEY);
    if (this.localCategoriesString) {
      this.categories = this.localCategoriesString.split(',');
    }
    return this.categories;
    // return this.localService.getData(this.CATEGORY_KEY);
    // return this.mockCategories;
  }

  addCategory(category: string): void {
    // const categories = this.getCategories();
    this.categories.push(category);
    this.localService.saveData(this.CATEGORY_KEY, this.categories);
  }

  deleteCategory(category: string): void {
    // const categories = this.getCategories();
    // let categories = this.getCategories();

    this.categories = this.categories.filter(item => item !== category);
    this.localService.saveData(this.CATEGORY_KEY, this.categories);

    // if (index > -1) {
    //   this.categories.splice(index, 1);
    //   this.localService.saveData(this.CATEGORY_KEY, categories);
    // }
  }
}
