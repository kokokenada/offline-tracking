import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import {Store} from '@ngrx/store';
import {Observable} from 'rxjs/Observable';
import {IAppState} from '../../store/app-state';
import {CONNECT, DISCONNECT} from '../../store/connected.store';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  connected: Observable<boolean>;
  constructor(
    public navCtrl: NavController,
    private store: Store<IAppState>
  ) {
    this.connected = store.select('connected');
  }

  connect(){
    this.store.dispatch({ type: CONNECT });
  }

  disconnect(){
    this.store.dispatch({ type: DISCONNECT });
  }

}
