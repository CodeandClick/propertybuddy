import { HttpEventType, HttpInterceptorFn } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { tap } from 'rxjs';
import { LoaderService } from '../services/loader.service';

  

export const loaderInterceptor: HttpInterceptorFn = (req, next) => {
  const loaderService = inject(LoaderService)
  return next(req).pipe(tap(event => {
    loaderService.show();
    if (event.type === HttpEventType.Response) {
      loaderService.hide()
    }
  },
  (error)=>{
  loaderService.hide()
  }));
  }