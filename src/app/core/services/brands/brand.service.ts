import { Injectable } from '@angular/core';
import { environments } from '../../../shared/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BrandService {

  constructor(private htpClient:HttpClient) { }
  getAllbrands():Observable<any>{
    return this.htpClient.get(`${environments.baseUrl}/api/v1/brands`)
  }
}
