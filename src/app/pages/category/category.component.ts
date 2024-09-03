import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../../service/category.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrl: './category.component.css',
  providers: [CategoryService]
})
export class CategoryComponent implements OnInit {
  categories: string[] = [];
  newCategory: string = '';

  constructor(private categoryService: CategoryService) { }

  ngOnInit() {
    this.categories = this.categoryService.getCategories();
  }

  addCategory(): void {
    if (this.newCategory.trim()) {
      this.categoryService.addCategory(this.categories, this.newCategory);
      this.categories = this.categoryService.getCategories();
      this.newCategory = '';  
    }
  }

  deleteCategory(category: string): void {
    this.categoryService.deleteCategory(this.categories, category);
    this.categories = this.categoryService.getCategories();

    // debugger;
    //   event.stopPropagation();
    //   if (category > -1) { //write code to remove string from array
    //     this.categories.splice(index, 1);
    //     this.categories = this.categoryService.getCategories();
    //   }
    //     // call the service to delete the categories
  }
}


