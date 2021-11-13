import { Inject, Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { UsersService } from "../../services/users.service";
import { AppTypes } from "../types/app.types";
// import { catchError, mergeMap } from "rxjs/internal/operators";
import { catchError, map, mergeMap } from "rxjs/operators";
import { GetFakeDataSuccess, GetStateFromApiFailAction, GetStateFromApiSuccessAction } from "../actions/app.actions";
import { of } from "rxjs";

@Injectable()
export class AppEffects {
  constructor(
    @Inject(Actions) private actions$: Actions,
    @Inject(UsersService) private usersService: UsersService
  ) {
  }


  loadData$ = createEffect(() => this.actions$.pipe(
    ofType(AppTypes.GET_DATA),
    mergeMap(() => {
      return this.usersService.getApiUsers()
        .pipe(
          map((response) => new GetStateFromApiSuccessAction({ users: response })),
          catchError((err) => of(new GetStateFromApiFailAction(err)))
        )
    })
  ))
  
  loadFakeData$ = createEffect(() => this.actions$.pipe(
    ofType(AppTypes.GET_FAKE_DATA),
    mergeMap(() => {
      return this.usersService.getFakeUsers()
        .pipe(
          map((response) => new GetFakeDataSuccess({ users: response })),
          catchError((err) => of(new GetStateFromApiFailAction(err)))
        )
    })
  ))

}