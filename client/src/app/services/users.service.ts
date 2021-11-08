import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable  } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  constructor(private httpClient:HttpClient) {
  }

  getFakeUsers(): Observable<any> {
    return this.httpClient.get('https://jsonplaceholder.typicode.com/users')
  }

  getApiUsers(): Observable<any> {
    return this.httpClient.get('/api/v1/users')
  }
}
