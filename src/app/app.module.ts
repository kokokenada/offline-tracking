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
import { GoogleAnalytics as GoogleAnalyticsRBGA, Event, PageView } from 'redux-beacon/targets/google-analytics';
import { CordovaGoogleAnalytics as GoogleAnalyticsRBCGA } from 'redux-beacon/targets/cordova-google-analytics';
import { logger } from 'redux-beacon/extensions/logger';
import { createMetaReducer } from 'redux-beacon';
import { offlineWeb } from 'redux-beacon/extensions/offline-web';
import { GoogleAnalytics as GA_Ionic} from '@ionic-native/google-analytics';


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

const loggerMetaReducer = storeLogger();
const isConnected = (state:boolean) => {
  return state;
};

declare let cordova;

// pass in the connectivity selector as the first parameter
const offlineStorage = offlineWeb(isConnected);
const analyticsMetaReducer = createMetaReducer(
  eventsMap, typeof cordova ===  "undefined" ? GoogleAnalyticsRBGA : GoogleAnalyticsRBCGA, { logger, offlineStorage });
// A meta reducer is just a function that takes in a reducer, and spits out
// an augmented reducer

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
      connected: loggerMetaReducer(analyticsMetaReducer(connectReducer)),
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
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    GA_Ionic
  ]
})
export class AppModule {}
