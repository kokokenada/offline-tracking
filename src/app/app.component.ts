import {Component, ViewChild} from '@angular/core';
import {Nav, Platform} from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { TabsPage } from '../pages/tabs/tabs';
import {NAVIGATE} from '../store/navigation.store';
import {IAppState} from '../store/app-state';
import {Store} from '@ngrx/store';
import {CONNECT, DISCONNECT} from '../store/connected.store';

import { GoogleAnalytics } from '@ionic-native/google-analytics';

declare let window;

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any = TabsPage;
  @ViewChild(Nav) nav:Nav;

  constructor(
    platform: Platform,
    statusBar: StatusBar,
    splashScreen: SplashScreen,
    private store: Store<IAppState>,
    private ga: GoogleAnalytics)
  {
    platform.ready().then(() => {

      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();

      this.ga.startTrackerWithId('UA-98191266-1')
        .then(() => {
          console.log('Google Analytics plugin is ready now');
          // Tracker is ready
          // You can now track pages or set additional information such as AppVersion or UserId
        })
        .catch(e => console.log('Error starting GoogleAnalytics Plugin', e));


      this.nav.viewDidEnter.subscribe(
        view => {
          this.store.dispatch({type: NAVIGATE, payload: view.name});
        }
      )

      window.addEventListener('offline', () => {
        this.store.dispatch({
          type: DISCONNECT
        });
      });
      window.addEventListener('online', () => {
        this.store.dispatch({
          type: CONNECT
        });
      });

    });
  }
}
