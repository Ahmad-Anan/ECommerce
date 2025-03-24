import { Component } from '@angular/core';
import { BrandService } from '../../core/services/brands/brand.service';
import { Subscription } from 'rxjs';
import { ICategory } from '../../shared/interfaces/icategory';

@Component({
  selector: 'app-brands',
  imports: [],
  templateUrl: './brands.component.html',
  styleUrl: './brands.component.scss'
})
export class BrandsComponent {
  constructor(private brandService:BrandService){}
  brandSubscripe:Subscription = new Subscription();
  data:ICategory[] = []
  ngOnInit(): void {
    this.brandSubscripe = this.brandService.getAllbrands().subscribe({
      next:(respo)=>{this.data = respo.data},
      error:(err)=>{console.log(err);}
    })
  }


}
