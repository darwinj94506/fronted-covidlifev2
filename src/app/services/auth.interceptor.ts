import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable()
export class AuthInterceptor implements HttpInterceptor {
intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = localStorage.getItem('token');
if (!token) {
      return next.handle(req);
    }
console.log(req.url);
if (req.url === 'https://fcm.googleapis.com/fcm/send'){
  const headers = req.clone({});
  return next.handle(headers);
}
const headers = req.clone({
      headers: req.headers.set('authorization', `Bearer ${token}`)
    });
return next.handle(headers);
  }
}