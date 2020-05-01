import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpErrorResponse, HttpHandler, HttpEvent } from '@angular/common/http'
import { Observable, throwError } from 'rxjs'
import { catchError } from 'rxjs/operators'

import { MessageSnackBarService } from './message-snack-bar.service';

interface Error{
  message: string
} 



@Injectable({
  providedIn: 'root'
})
export class InterceptorService implements HttpInterceptor {

  error: Error
  errorMessage: string;
  constructor( private errorSnackBar: MessageSnackBarService ) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>>{    
    return next.handle(req)
    .pipe(
      catchError((err: HttpErrorResponse) => {
        this.error = err.error;
        if (this.error.message) {
          this.errorSnackBar.openSnackBar(this.error.message,'OK');
        } else {          
          this.errorSnackBar.openSnackBar(err.message,'OK');
        }
       
        
        return throwError(err);        
      })
    )
  };
}
