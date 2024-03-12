import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Observable, from, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient, private auth: AngularFireAuth) { }

  login(user: any): Observable<any>{
    return from(this.auth.signInWithEmailAndPassword(
      user.email, user.password
    ))
  }

  register(user: any) {
    // return this.auth.createUserWithEmailAndPassword()
  }

  recoverPassword(email: string): Observable<any> {
    return from(this.auth.sendPasswordResetEmail(email))
  }
}
