import { Injectable } from "@angular/core";
import {
    HttpInterceptor, HttpHandler, HttpRequest, HttpEvent,
} from '@angular/common/http';
import { AuthenticationService } from "src/app/service/authentication.service";
import { Observable } from "rxjs";

@Injectable()
export class MyInterceptor implements HttpInterceptor {


    constructor(private auth: AuthenticationService) {}

    intercept(
      req: HttpRequest<any>,
      next: HttpHandler
    ): Observable<HttpEvent<any>> {
      // Get the auth token from the service.
      const authToken = this.auth.getToken();
      console.log('authToken',authToken);

      

      const authReq = req.clone({
        setHeaders: { Authorization: 'Bearer ' + authToken },
      });
  
      // send cloned request with header to the next handler.
      return next.handle(authReq);
    }












    



    // intercept(request: HttpRequest<any>, next: HttpHandler) {

    //     request = request.clone({ headers: request.headers.set('Content-Type', 'application/json') });
    //     let token: string | null = localStorage.getItem("request_token");
    //     console.log('interceptor====',token);
        
    //     if (token) {
    //         request = request.clone({ headers: request.headers.set('Authorization', 'Bearer ' + token) });
    //     }
    //     return next.handle(request);
    // }

}