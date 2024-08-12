import { Injectable } from '@angular/core';
import { Subject, Observable, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoaderService {
  private isLoadingSubject = new BehaviorSubject<boolean>(false);
  isLoading: Observable<boolean> = this.isLoadingSubject.asObservable();

  constructor() {}

  show() {
    this.isLoadingSubject.next(true);
  }

  hide() {
    this.isLoadingSubject.next(false);
  }
}
