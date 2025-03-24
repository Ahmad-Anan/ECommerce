import { isPlatformBrowser } from '@angular/common';
import { Inject, inject, Injectable, PLATFORM_ID, Renderer2, RendererFactory2 } from '@angular/core';
import {TranslateService,TranslatePipe,TranslateDirective} from "@ngx-translate/core";
@Injectable({
  providedIn: 'root'
})
export class MyTranslateService {

  private render2:Renderer2

  constructor(private translateService: TranslateService, @Inject(PLATFORM_ID) private PLATFORM_ID:object, private render: RendererFactory2) {

    if (isPlatformBrowser(this.PLATFORM_ID)) {
        this.translateService.setDefaultLang('en');
        const savedLanguage = sessionStorage.getItem('lang');
        if (savedLanguage) {
          this.translateService.use('en');
        }
        this.changeDirection();
      }


      this.render2 = this.render.createRenderer(null,null)
    }
    

changeDirection():void{
  if (sessionStorage.getItem('lang') === 'en') {
    this.render2.setAttribute(document.documentElement,'dir' , 'ltr');
    this.render2.setAttribute(document.documentElement,'lang' , 'en');
  }else if(sessionStorage.getItem('lang') === 'ar'){
    this.render2.setAttribute(document.documentElement,'dir' , 'rtl');
    this.render2.setAttribute(document.documentElement,'lang' , 'ar');
  }
}

changeLangTranslate(lang:string):void{
  sessionStorage.setItem('lang', lang);
  this.translateService.use(lang)
  this.changeDirection();
}

}
