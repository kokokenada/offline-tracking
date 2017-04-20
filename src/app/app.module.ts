import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { AboutPage } from '../pages/about/about';
import { ContactPage } from '../pages/contact/contact';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Action, StoreModule } from '@ngrx/store';
import { storeLogger } from "ngrx-store-logger";
import { connectReducer } from '../store/connected.store';
import { navigateReducer } from '../store/navigation.store';
import { IAppState } from '../store/app-state';

// redux-beacon
import { GoogleAnalytics, Event, PageView } from 'redux-beacon/targets/google-analytics';
import { logger } from 'redux-beacon/extensions/logger';
import { createMetaReducer } from 'redux-beacon';
import { offlineWeb } from 'redux-beacon/extensions/offline-web';


// (redux-beacon)
const eventsMap = {
  CONNECT: {
    eventFields: (action: Action): Event => ({
      hitType: 'event',
      eventCategory: 'connected',
      eventAction: action.type,
    }),
  },
  DISCONNECT: {
    eventFields: (action: Action): Event => ({
      hitType: 'event',
      eventCategory: 'disconnected',
      eventAction: action.type,
    }),
  },
  NAVIGATE: {
    eventFields: (action: Action): PageView => ({
      hitType: 'pageview',
      page: action.payload,
    }),
  },
};

// (redux-beacon)
const analyticsMetaReducer = createMetaReducer(eventsMap, GoogleAnalytics, { logger });
// A meta reducer is just a function that takes in a reducer, and spits out
// an augmented reducer

const loggerMetaReducer = storeLogger();
const isConnected = (state:IAppState) => {
  console.log('isConnected')
  console.log(state)
  return state.connected;
};

// pass in the connectivity selector as the first parameter
const offlineStorage = offlineWeb(isConnected);

@NgModule({
  declarations: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    StoreModule.provideStore({
      connected: loggerMetaReducer(analyticsMetaReducer(connectReducer, offlineStorage)),
      location: navigateReducer,
    })
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
