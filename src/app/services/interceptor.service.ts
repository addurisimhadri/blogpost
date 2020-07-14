import { Injectable } from '@angular/core';
    import {
    HttpInterceptor, HttpRequest,
    HttpHandler, HttpEvent, HttpErrorResponse
    } from '@angular/common/http';
    import { Observable, throwError } from 'rxjs';
    import { catchError } from 'rxjs/operators';
    @Injectable({
    providedIn: 'root'
    })
    export class InterceptorService implements HttpInterceptor{
     constructor() { }
     handleError(error: HttpErrorResponse){
        let errorMessage = '';
        if (error.error instanceof ErrorEvent) {
          // client-side error
          errorMessage = `Error: ${error.error.message}`;
        } else {         
              // server-side error
              errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;         
        }
        window.alert(errorMessage);      
      return throwError(error);
     }
    intercept(req: HttpRequest<any>, next: HttpHandler):
    Observable<HttpEvent<any>>{
      let token = sessionStorage.getItem("token");
      //alert(token);
      if (token) {
        //alert(token);
        req = req.clone({
          setHeaders: {
            Authorization: token
          }
        });
      }
     return next.handle(req);
    }
  }