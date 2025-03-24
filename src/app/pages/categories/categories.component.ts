import { Component } from '@angular/core';
import { CategoryService } from '../../core/services/categories/category.service';
import { ICategory } from '../../shared/interfaces/icategory';

@Component({
  selector: 'app-categories',
  imports: [],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.scss'
})
export class CategoriesComponent {
  constructor(private categoryService:CategoryService){}

  data:ICategory[] = []
  ngOnInit(): void {
    this.categoryService.getAllCategories().subscribe({
      next:(respo)=>{this.data = respo.data},
      error:(err)=>{console.log(err);}
    })
  }
}
