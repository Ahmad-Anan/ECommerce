import { Component, computed, inject, input, Signal } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../core/services/auth/auth.service';
import { MyTranslateService } from '../../core/services/myTranslate/my-translate.service';
import { TranslateService } from '@ngx-translate/core';
import { CartService } from '../../core/services/cart/cart.service';

@Component({
  selector: 'app-nav-bar',
  imports: [RouterLink, RouterLinkActive],
templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.scss'
})
export class NavBarComponent {
  private readonly authService = inject(AuthService);
  private readonly cartService = inject(CartService);
  private readonly mTranslateService = inject(MyTranslateService);
  private readonly translateService = inject(TranslateService);
  private readonly router = inject(Router);


isLogin = input<boolean>(true);




change(lang:string):void{
this.mTranslateService.changeLangTranslate(lang)
}

checkCurrentLang(lang:string):boolean{
  return this.translateService.currentLang  === lang;
}



cartCounterNav:Signal<number> = computed(()=> this.cartService.cartCount())

ngOnInit(): void {
  this.cartService.getLoggedUserCart().subscribe({
    next: (res) => {
      if (res && typeof res.numOfCartItems === 'number') {
        this.cartService.cartCount.set(res.numOfCartItems);
      } else {
        console.error('Invalid response:', res);
      }
    },
    error: (err) => {
      console.log(err);
    },
  });

  // this.cartService.cartCount.subscribe({
  //   next: (res) => { 
  //     this.cartCounterNav = res;
  //   },
  //   error: (err) => {
  //     console.log(err);
  //   },
  // });
}






signOut():void{
this.authService.signOut()}


}
