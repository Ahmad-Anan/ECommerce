import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environments } from '../../../shared/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(private httpClient:HttpClient) { }

getAllProduct():Observable<any>{
  return this.httpClient.get(`${environments.baseUrl}/api/v1/products`)
}
getSpecificProduct(id:string|null):Observable<any>{
  return this.httpClient.get(`${environments.baseUrl}/api/v1/products/${id}`)
}

}
