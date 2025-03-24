import { Component, inject, OnInit } from '@angular/core';
import { IProduct } from '../../shared/interfaces/iproduct';
import { ProductsService } from '../../core/services/products/products.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-products',
  imports: [],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss'
})
export class ProductComponent{
private readonly productsService= inject(ProductsService)
products: IProduct[] = [];
productsSub!:Subscription



  getProductData(): void{
    this.productsService.getAllProduct().subscribe({
      next : (res) => {
        this.products = res.data;
      },
      error : (err) => {
        console.log(err)
      }
    })
  }

  ngOnInit(): void {
  this.getProductData()
  }

}