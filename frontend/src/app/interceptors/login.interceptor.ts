import { HttpInterceptorFn } from '@angular/common/http';

export const loginInterceptor: HttpInterceptorFn = (req, next) => {

  const accessToken = localStorage.getItem('accessToken');
  const refreshToken = localStorage.getItem('refreshToken');

    let authReq = req;

    if (accessToken) {
      authReq = req.clone({
        setHeaders: {
          Authorization: `Bearer ${accessToken}`
        }
      });
    }
    
  return next(authReq);

};
