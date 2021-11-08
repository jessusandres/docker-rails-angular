import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { PrimeNGConfig } from 'primeng/api';
import { Subscription } from 'rxjs';

import { MainState } from '../../../store/main.reducer';
import { GetFakeData, GetUsers, IncrementCounter } from '../../../store/actions/app.actions';

@Component({
  selector: 'home',
  templateUrl: 'home.component.html',
  styleUrls: ['home.component.scss'],
})

export class HomeComponent implements OnInit {
  name = 'Angular';
  count: number = 0;
  loading: boolean = false;
  fakeData: any[] = [];
  storeSubscription: Subscription;

  constructor(
    private store: Store<MainState>,
    private primengConfig: PrimeNGConfig,
  ) {
    this.storeSubscription = this.store.subscribe((state) => {
      this.count = state.app.count;
      this.fakeData = state.app.users;
      this.loading = state.app.loading;
    });

  }

  ngOnInit() {
    this.primengConfig.ripple = true;
  }

  increment() {
    this.store.dispatch(IncrementCounter());
  }

  getFakeData() {
    this.store.dispatch(GetFakeData());
  }

  getUsers() {
    this.store.dispatch(GetUsers());
  }
}
