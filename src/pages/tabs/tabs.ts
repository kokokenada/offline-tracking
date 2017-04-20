import { Component } from '@angular/core';

import { AboutPage } from '../about/about';
import { ContactPage } from '../contact/contact';
import { HomePage } from '../home/home';
import {IAppState} from '../../store/app-state';
import {Store} from '@ngrx/store';
import {NAVIGATE} from '../../store/navigation.store';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = HomePage;
  tab2Root = AboutPage;
  tab3Root = ContactPage;

  constructor(
    private store: Store<IAppState>
  ) {

  }

  captureTabChange(event) {
    this.store.dispatch({type: NAVIGATE, payload: event.tabTitle});
  }
}
