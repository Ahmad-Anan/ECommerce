import { Component, OnInit, OnDestroy } from '@angular/core';
import { CartService } from '../../core/services/cart/cart.service';
import { Subscription } from 'rxjs';
import { RouterLink } from '@angular/router';
import { ICart } from '../../shared/interfaces/icart';
import { CurrencyPipe } from '@angular/common';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [RouterLink, CurrencyPipe],
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit, OnDestroy {
  private subscriptions: Subscription[] = []; // تخزين جميع الاشتراكات
  cartData: ICart | null = null;
  isLoading: boolean = false;

  constructor(private cartService: CartService,private toastrService: ToastrService) {}

  ngOnInit(): void {
    this.getCartData();
  }

  // جلب بيانات السلة
  getCartData(): void {
    const token = sessionStorage.getItem('token');
    if (!token) {
      this.toastrService.error('يرجى تسجيل الدخول لعرض السلة', 'FreshCart');
      return;
    }

    this.isLoading = true;
    const sub = this.cartService.getLoggedUserCart().subscribe({
      next: (res) => {
        this.cartData = res.data;
        this.cartService.cartCount.set(res.numOfCartItems || 0);
        this.isLoading = true;
      },
      error: (err) => {
        console.error('خطأ في جلب بيانات السلة:', err);
        this.toastrService.error(err.error?.message || 'حدث خطأ أثناء جلب السلة', 'FreshCart');
        this.isLoading = false;
      }
    });
    this.subscriptions.push(sub);
  }

  // إزالة عنصر من السلة
  removeItem(p_id: string): void {
    if (!p_id) {
      this.toastrService.error('معرف المنتج غير صالح', 'FreshCart');
      return;
    }
    this.isLoading = true;
    const sub = this.cartService.removeItemFromCart(p_id).subscribe({
      next: (res) => {
        this.cartService.cartCount.set(res.numOfCartItems || 0);
        this.cartData = res.data;
        this.toastrService.success('تمت إزالة العنصر بنجاح', 'FreshCart');
        this.isLoading = false;
      },
      error: (err) => {
        console.error('خطأ في إزالة العنصر:', err);
        this.toastrService.error(err.error?.message || 'حدث خطأ أثناء إزالة العنصر', 'FreshCart');
        this.isLoading = false;
      }
    });
    this.subscriptions.push(sub);
  }

  // تحديث كمية العنصر
  updateQuant(p_id: string, count: number): void {
    if (!p_id) {
      this.toastrService.error('معرف المنتج غير صالح', 'FreshCart');
      return;
    }
    if (count <= 0) {
      this.toastrService.warning('الكمية يجب أن تكون أكبر من صفر', 'FreshCart');
      return;
    }
    this.isLoading = true;
    const sub = this.cartService.updateItemCart(p_id, count).subscribe({
      next: (res) => {
        this.cartData = res.data;
        this.toastrService.success('تم تحديث الكمية بنجاح', 'FreshCart');
        this.isLoading = false;
      },
      error: (err) => {
        console.error('خطأ في تحديث الكمية:', err);
        this.toastrService.error(err.error?.message || 'حدث خطأ أثناء تحديث الكمية', 'FreshCart');
        this.isLoading = false;
      }
    });
    this.subscriptions.push(sub);
  }

  // مسح كل السلة
  clearAllCart(): void {
    this.isLoading = true;
    const sub = this.cartService.removeAllCart().subscribe({
      next: (res) => {
        if (res.message === 'success') {
          this.cartData = null;
          this.cartService.cartCount.set(0);
          this.toastrService.success('تم مسح السلة بنجاح', 'FreshCart');
        }
        this.isLoading = false;
      },
      error: (err) => {
        console.error('خطأ في مسح السلة:', err);
        this.toastrService.error(err.error?.message || 'حدث خطأ أثناء مسح السلة', 'FreshCart');
        this.isLoading = false;
      }
    });
    this.subscriptions.push(sub);
  }

  // تنظيف الاشتراكات عند تدمير المكون
  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }
}