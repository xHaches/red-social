import { Injectable } from '@angular/core';
import { BehaviorSubject, Subscription } from 'rxjs';
import { State, Action } from '../../interfaces/state.interface';
import { LocalStorageService } from '../../shared/services/local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class StateService {

  
  private _inicialState: State = {
    user: {
      id: 0,
      img: '',
      name: '',
      email: '',
      age: 0,
      studies: '',
      linkedin: '',
      hobbies: '',
      status: '',
      role: ''
    },
    token: ''
  }

  model: State = this._inicialState;

  state: BehaviorSubject<State> = new BehaviorSubject(this._inicialState);

  constructor(
    private localStorageService: LocalStorageService
  ) {
    this.dispatchAction('setUser', this.localStorageService.getItem('user'));
    this.dispatchAction('setToken', this.localStorageService.getItem('token'));
  }

  public subscribe(callback: (state: State) => void): Subscription {
    return this.state.subscribe(callback);
  }

  public dispatchAction(action: Action, payload: any | null): void {

    switch (action) {
      case 'setUser':
        this.model.user = payload;
        this.state.next(this.model);
        break;
      case 'setToken':
        this.model.token = payload;
        this.state.next(this.model);
        break;
    }
  }
}
