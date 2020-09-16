import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';

import { BehaviorSubject, Observable } from 'rxjs';

import { Time } from '../interfaces/time';
import { environment } from '../../environments/environment';
import { UtilService } from './util.service';

@Injectable({
  providedIn: 'root'
})
export class TimesService {
  private _timesArray: BehaviorSubject<Time[]>;
  private _times: BehaviorSubject<Time>;
  public readonly times$: Observable<Time>;

  constructor(private http: HttpClient, private utilService: UtilService) {
    this._times = new BehaviorSubject({} as Time);
    this._timesArray = new BehaviorSubject([]);
    this.times$ = this._times.asObservable();
  }

  cadastrar(times: Time) {
    const url = this.utilService.getUrlBackend() + '/times';
   // const url = `${environment.pointdojogadorApiUrl}/times`;
    return this.http.post(url, times);
  }

  listartimes(): Observable<Time[]> {
    return this.getListatimes().pipe(
      tap((timesArray: Time[]) => {
        this._timesArray.next(timesArray);
      })
    );
  }

  getListatimes(): Observable<Time[]> {
    const url = this.utilService.getUrlBackend() + '/times/todos';
  //  const url = `${environment.pointdojogadorApiUrl}/times/todos`;
    return this.http.get<Time[]>(url);
  }


  consutaTimePorId(id: number): Observable<Time> {
    const url = this.utilService.getUrlBackend() + `/times/${id}`;
    // const url = `${environment.pointdojogadorApiUrl}/times/${id}`;
    return this.http.get<Time>(url);
  }


}
