import { HttpClient } from '@angular/common/http';
import { Injectable, signal, WritableSignal } from '@angular/core';
import { Observable } from 'rxjs';
import { environments } from '../../../shared/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private baseUrl = environments.baseUrl; 
  

  constructor(private httpClient: HttpClient) {}

  private getAuthHeaders(): { [key: string]: string } {
    const token = sessionStorage.getItem('token');
    return token ? { Authorization: `Bearer ${token}` } : {};
  }

  /********************************************************* */
  getLoggedUserCart(): Observable<any> {
    return this.httpClient.get(`${this.baseUrl}/api/v1/cart`, {
      headers: this.getAuthHeaders()
    });
  }

  addItemCart(p_id: string): Observable<any> {
    if (!p_id) throw new Error('معرف المنتج غير صالح');
    return this.httpClient.post(
      `${this.baseUrl}/api/v1/cart`,
      { productId: p_id },
      { headers: this.getAuthHeaders() }
    );
  }

  updateItemCart(p_id: string, count: number): Observable<any> {
    if (!p_id || count === undefined) throw new Error('معرف المنتج أو الكمية غير صالحة');
    return this.httpClient.put(
      `${this.baseUrl}/api/v1/cart/${p_id}`,
      { count },
      { headers: this.getAuthHeaders() }
    );
  }

  removeItemFromCart(p_id: string): Observable<any> {
    if (!p_id) throw new Error('معرف المنتج غير صالح');
    return this.httpClient.delete(`${this.baseUrl}/api/v1/cart/${p_id}`, {
      headers: this.getAuthHeaders()
    });
  }

  removeAllCart(): Observable<any> {
    return this.httpClient.delete(`${this.baseUrl}/api/v1/cart`, {
      headers: this.getAuthHeaders()
    });
  }

  /********************************************************************************** */
  cartCount: WritableSignal<number> = signal(0); 
// cartCount!:number;                                           ===> property in service to be global to hold number of cart item but it's static
// cartCount:BehaviorSubject<number> = new BehaviorSubject(0)  // ===> property in service to be global to hold number of cart item it's dynamic

}
