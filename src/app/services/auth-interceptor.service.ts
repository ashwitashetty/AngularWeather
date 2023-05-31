import {
  HttpEventType,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { tap } from 'rxjs';

export class AuthInterceptorService implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler) {
    let updatedRequest = req.clone({
      setHeaders: {
        'X-RapidAPI-Key': '2e61d5ed65msh6e1fd3b3e86180ap10576cjsn6e517a01ff1e',
        'X-RapidAPI-Host': 'weatherapi-com.p.rapidapi.com',
      },
    });
    return next.handle(updatedRequest).pipe(
      tap((event) => {
        if (event.type === HttpEventType.Response) {
        }
      })
    );
  }
}
