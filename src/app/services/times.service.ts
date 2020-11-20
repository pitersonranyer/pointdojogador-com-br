import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Time } from '../interfaces/time';
import { UtilService } from './util.service';

@Injectable({
  providedIn: 'root'
})
export class TimesService {

  constructor(private http: HttpClient, private utilService: UtilService) {
  }

  listartimes(): Observable<Time[]> {
    const url = this.utilService.getUrlBackend() + '/times/todos';
    return this.http.get<Time[]>(url);
  }

}
