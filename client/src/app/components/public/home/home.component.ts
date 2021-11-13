import { Component, Inject, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { MainState } from '../../../store/main.reducer';
import { Subscription } from 'rxjs/internal/Subscription';
import { CounterIncrementAction, GetFakeData, GetStateFromApiAction } from '../../../store/actions/app.actions';
import { PrimeNGConfig } from 'primeng/api';

@Component({
  selector: 'home',
  templateUrl: 'home.component.html',
  styleUrls: ['home.component.scss']
})

export class HomeComponent implements OnInit {
  name = 'Angular';
  count: number = 0;
  loading: boolean = false;
  fakeData: any[] = [];
  storeSubscription: Subscription;

  constructor(
    @Inject(Store) private store: Store<MainState>,
    @Inject(PrimeNGConfig) private primengConfig: PrimeNGConfig,
  ) {
    console.log({ name: this.name });
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
    this.store.dispatch(new CounterIncrementAction());
  }

  getFakeData() {
    this.store.dispatch(new GetFakeData());
  }
  
  getUsers() {
    this.store.dispatch(new GetStateFromApiAction());
  }
}
