import { HttpEventType, HttpInterceptorFn } from '@angular/common/http';
import { tap } from 'rxjs';

export const loaderInterceptor: HttpInterceptorFn = (req, next) => {
  console.log('hello')
  return next(req)
}