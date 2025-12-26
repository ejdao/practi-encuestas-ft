import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable()
export class ObservableUpdated {
  private _observable = new BehaviorSubject<number>(0);
  private _observable$ = this._observable.asObservable();

  public async update(): Promise<void> {
    this._observable.next(Math.random());
  }

  public observable(): Observable<number> {
    return this._observable$;
  }
}
