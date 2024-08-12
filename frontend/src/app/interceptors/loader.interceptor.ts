import { HttpEventType, HttpInterceptorFn } from '@angular/common/http';
import { tap } from 'rxjs';

export const loaderInterceptor: HttpInterceptorFn = (req, next) => {
  return next(req)
}