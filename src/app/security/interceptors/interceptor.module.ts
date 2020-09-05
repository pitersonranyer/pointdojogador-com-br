import { UtilService } from '../../services/util.service';
import { Injectable, NgModule } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpClient } from '@angular/common/http';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
@Injectable()
export class HttpsRequestInterceptor implements HttpInterceptor {
  constructor(private http: HttpClient,
    private util: UtilService) { }

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler,
  ): Observable<HttpEvent<any>> {

    // atob = decriptografa base 64
    // btoa = encriptografa base 64
    const token = sessionStorage.getItem(btoa('tokenAuth')) === null ? '' : atob(sessionStorage.getItem(btoa('tokenAuth')));

    const dupReq = req.clone({
      headers: req.headers.set('Authorization', token),
    });
    return next.handle(dupReq);
  }
}
@NgModule({
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpsRequestInterceptor,
      multi: true,
    },
  ],
})
export class InterceptorModule { }
