import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SpinnerService {

  isLoading$ = new Subject<boolean>();

  constructor() { }

  show(): void {

    setTimeout(() => {
      this.isLoading$.next(true);
    }, 0)
  }

  hide(): void {
    this.isLoading$.next(false);
  }
}
