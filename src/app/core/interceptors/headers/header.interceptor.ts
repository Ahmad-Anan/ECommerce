import { isPlatformBrowser } from '@angular/common';
import { HttpInterceptorFn } from '@angular/common/http';
import { inject, PLATFORM_ID } from '@angular/core';

export const headerInterceptor: HttpInterceptorFn = (req, next) => {


  // const _PLATFORM_ID= inject(PLATFORM_ID);
  // if(isPlatformBrowser(_PLATFORM_ID)){
  //   if(req.url.includes('cart') || req.url.includes('wishlist') || req.url.includes('orders')){
  //     if(sessionStorage.getItem('token') ){
  //       req = req.clone({setHeaders : {token : sessionStorage.getItem('token') !}})
  //     }
  //   }
  // }
  if(sessionStorage.getItem('token')){
    if(req.url.includes('cart') || req.url.includes('wishlist') || req.url.includes('orders')){
      req = req.clone({
        setHeaders : {token : sessionStorage.getItem('token') !},
        
    })
    }
  }

  return next(req);
};
