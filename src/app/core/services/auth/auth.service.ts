import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environments } from '../../../shared/environments/environment';
import { jwtDecode } from "jwt-decode";
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private httpClient:HttpClient , private router:Router) { }
  userData:any = null;


sendRegisterForm(data:object):Observable<any>{
  return this.httpClient.post(`${environments.baseUrl}/api/v1/auth/signup`, data)
}
sendLoginForm(data:object):Observable<any>{
  return this.httpClient.post(`${environments.baseUrl}/api/v1/auth/signin`, data)
}

saveDataUser():void{     //Save Token
  if(sessionStorage.getItem('token') !== null){
    this.userData = jwtDecode(sessionStorage.getItem('token')!)
  }
}
/****************************************************************************** */
setVerifyEmaiL(userData :object) :Observable<any>{
  return this.httpClient.post(`${environments.baseUrl}/api/v1/auth/forgotPasswords`, userData)
}
setResetCode(userData :object) :Observable<any>{
  return this.httpClient.post(`${environments.baseUrl}/api/v1/auth/verifyResetCode`, userData)
}
setNewPassword(userData :object) :Observable<any>{
  return this.httpClient.put(`${environments.baseUrl}/api/v1/auth/resetPassword`, userData)
}


//****************************************************************************** */


signOut():void{
sessionStorage.removeItem('token');
this.userData = null;
this.router.navigate(['/login']) 

}




}