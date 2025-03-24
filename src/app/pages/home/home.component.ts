import { Component, OnInit, OnDestroy, inject } from '@angular/core';
import { Subscription } from 'rxjs';
import { ProductsService } from '../../core/services/products/products.service';
import { CategoryService } from '../../core/services/categories/category.service';
import { CartService } from '../../core/services/cart/cart.service';
import { ToastrService } from 'ngx-toastr';
import { IProduct } from '../../shared/interfaces/iproduct';
import { ICategory } from '../../shared/interfaces/icategory';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { RouterLink } from '@angular/router';
import { SearchPipe } from '../../shared/pipes/search.pipe';
import { FormsModule } from '@angular/forms';
import { SlicePipe } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CarouselModule, RouterLink, SearchPipe, FormsModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {
  // Services Injection
  private readonly productsService = inject(ProductsService);
  private readonly categoryService = inject(CategoryService);
  private readonly cartService = inject(CartService);
  private readonly toastrService = inject(ToastrService);

  // Component Properties
  products: IProduct[] = [];
  categries: ICategory[] = [];
  searchInputValue: string = '';
  private subscriptions: Subscription[] = [];

  // Static Carousel Options
  staticCategorySlider: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    autoplay: true,
    autoplayTimeout: 2000,
    rtl: true,
    pullDrag: false,
    dots: false,
    navSpeed: 700,
    navText: ['', ''],
    items: 1,
    nav: false
  };

  // Dynamic Carousel Options
  dynamicCategorySlider: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    autoplay: true,
    autoplayTimeout: 2000,
    rtl: true,
    pullDrag: false,
    dots: true,
    navSpeed: 700,
    navText: ['', ''],
    responsive: {
      0: { items: 1 },
      400: { items: 2 },
      740: { items: 3 },
      940: { items: 4 }
    },
    nav: false
  };

  // Fetch Products Data
  getProductData(): void {
    const sub = this.productsService.getAllProduct().subscribe({
      next: (res) => {
        this.products = res.data;
      },
      error: (err) => {
        console.error('Error fetching products:', err);
        this.toastrService.error('Failed to load products');
      }
    });
    this.subscriptions.push(sub);
  }

  // Fetch Categories Data
  getCategoryData(): void {
    const sub = this.categoryService.getAllCategories().subscribe({
      next: (res) => {
        this.categries = res.data;
      },
      error: (err) => {
        console.error('Error fetching categories:', err);
        this.toastrService.error('Failed to load categories');
      }
    });
    this.subscriptions.push(sub);
  }

  // Add Item to Cart
  addCartItem(productId: string): void {
    const sub = this.cartService.addItemCart(productId).subscribe({
      next: (res) => {
        this.cartService.cartCount.set(res.numOfCartItems);
        this.toastrService.success(res.message, 'FreshCart', { timeOut: 1000, closeButton: true });
      },
      error: (err) => {
        console.error('Error adding to cart:', err);
        this.toastrService.error(err.message, 'FreshCart', { timeOut: 1000, closeButton: true });
      }
    });
    this.subscriptions.push(sub);
  }

  // Lifecycle Hooks
  ngOnInit(): void {
    this.getProductData();
    this.getCategoryData();
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }
}