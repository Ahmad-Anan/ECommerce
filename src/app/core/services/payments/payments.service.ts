import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environments } from '../../../shared/environments/environment';
import { Observable } from 'rxjs';
import { IOrder } from '../../../shared/interfaces/iorder';

@Injectable({
  providedIn: 'root'
})
export class PaymentsService {

  constructor(private httpClient:HttpClient) { }
  clientToken: any = {token : sessionStorage.getItem('token')}

checkoutSession(cartId:string|null,shippingData:object):Observable<any>
  {
    return this.httpClient.post(
      `${environments.baseUrl}/api/v1/orders/checkout-session/${cartId}?url=${environments.url}`, //http://localhost:4200
      {'shippingAddress' : shippingData},
      {headers: this.clientToken}
    )
  }
  getUserOrders(userId: string | null): Observable<IOrder[]> {
    return this.httpClient.get<IOrder[]>(`${environments.baseUrl}/api/v1/orders/user/${userId}`);
}

}