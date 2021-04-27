import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http:HttpClient) { }
   
   path="http://localhost:5000/api/user/login"

   login(userObject:object){

    return this.http.post(this.path, userObject)
    
   }

}
