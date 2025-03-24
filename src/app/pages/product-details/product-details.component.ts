import { Component, inject, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { ProductsService } from '../../core/services/products/products.service';
import { IProduct } from '../../shared/interfaces/iproduct';
import { Subscription } from 'rxjs';
import { CartService } from '../../core/services/cart/cart.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [CarouselModule],
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss'] 
})
export class ProductDetailsComponent implements OnInit, OnDestroy {
  private readonly productsService = inject(ProductsService);
  private readonly activatedRoute = inject(ActivatedRoute);
  private readonly cartService = inject(CartService);
  private readonly toastrService = inject(ToastrService);

  productDetails: IProduct | null = null;
  isAddingToCart: boolean = false;
  private productSubscription?: Subscription;
  private cartSubscription?: Subscription;

  customOptions: OwlOptions = {
    loop: true,
    autoplay: true,
    autoplayTimeout: 3000, // زيادة الوقت لتجربة مستخدم أفضل
    mouseDrag: true,
    touchDrag: true,
    pullDrag: false,
    dots: true,
    navSpeed: 700,
    navText: ['', ''],
    responsive: {
      0: { items: 1 }
    },
    nav: false
  };

  ngOnInit(): void {
    this.loadProductDetails();
  }

  private loadProductDetails(): void {
    this.productSubscription = this.activatedRoute.paramMap.subscribe({
      next: (params) => {
        const productId = params.get('productId');
        if (productId) {
          this.productsService.getSpecificProduct(productId).subscribe({
            next: (res) => this.productDetails = res.data,
            error: (err) => {
              this.toastrService.error('حدث خطأ أثناء تحميل المنتج');
            }
          });
        }
      },
      error: (err) => console.error('خطأ في معلمات المسار:', err)
    });
  }

  addCartItem(productId: string): void {
    this.isAddingToCart = true;
    this.cartSubscription = this.cartService.addItemCart(productId).subscribe({
      next: (res) => {
        this.cartService.cartCount.set(res.numOfCartItems);
        this.toastrService.success(res.message, 'FreshCart', {
          timeOut: 2000,
          closeButton: true
        });
      },
      error: (err) => {
        this.toastrService.error(err.message, 'FreshCart', {
          timeOut: 2000,
          closeButton: true
        });
      },
      complete: () => this.isAddingToCart = false
    });
  }


  ngOnDestroy(): void {
    this.productSubscription?.unsubscribe();
    this.cartSubscription?.unsubscribe();
  }
}