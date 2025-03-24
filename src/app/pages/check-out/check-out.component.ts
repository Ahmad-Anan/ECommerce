import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { PaymentsService } from '../../core/services/payments/payments.service';

@Component({
  selector: 'app-check-out',
  imports: [ReactiveFormsModule],
  templateUrl: './check-out.component.html',
  styleUrl: './check-out.component.scss'
})
export class CheckoutComponent implements OnInit{

  constructor(private formBuilder:FormBuilder,
      private activatedRoute:ActivatedRoute,
      private paymentsService:PaymentsService,
    ){}
  cartId!:string | null
  shippingAddress!:FormGroup ;
  checkOutForm():void{
    this.shippingAddress = this.formBuilder.group({
      details: [null,[Validators.required,Validators.minLength(3),Validators.maxLength(20)]],
      phone: [null,[Validators.required,Validators.pattern(/^01[0125][0-9]{8}$/)]],
      city: [null, [Validators.required]]
    })
  }

getCartId():void{
  this.activatedRoute.paramMap.subscribe({
    next: (param)=>{this.cartId = param.get('cart_id')}
  })
}
payOrder():void{
  console.log( this.shippingAddress.value)
  this.paymentsService.checkoutSession(this.cartId, this.shippingAddress.value).subscribe({
    next : (res)=> 
      {
        if(res.status === 'success'){window.open(res.session.url, '_self')}
      }
  })
}



  ngOnInit(): void {
    this.checkOutForm();
    this.getCartId();
  }



  }
