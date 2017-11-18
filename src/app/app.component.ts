import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { GooglePlus } from '@ionic-native/google-plus';


import { LoginPage } from '../pages/login/login';
import { ChooseUserPage } from '../pages/choose-user/choose-user';
import { AddRegularDetailsPage } from '../pages/add-regular-details/add-regular-details';
import { ChooseRegularRestaurantCatPage } from '../pages/choose-regular-restaurant-cat/choose-regular-restaurant-cat';
import { ChooseRegularRestaurantPage } from '../pages/choose-regular-restaurant/choose-regular-restaurant';
import { ChooseRegularFoodCatPage } from '../pages/choose-regular-food-cat/choose-regular-food-cat';

import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';
import { TabsPage } from '../pages/tabs/tabs';
import { ProfilePage } from '../pages/profile/profile';
import { RestaurantProfilePage } from '../pages/restaurant-profile/restaurant-profile';

import axios from 'axios';
import _ from 'lodash';
import { route } from '../assets/Auth/Auth';


@Component({
  selector: 'page-app',
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = LoginPage;

  pages: Array<{title: string, component: any}>;

  constructor(public platform: Platform, public statusBar: StatusBar, private googlePlus: GooglePlus, public splashScreen: SplashScreen) {
    this.initializeApp();

    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'Home', component: HomePage },
      { title: 'Tabs', component:TabsPage },
      { title: 'Profile', component: ProfilePage},
    ];

  }


  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      // this.googlePlus.trySilentLogin({
      //   webClientId: '594029952654-45s1j3995chh2jj7ogq3fdj4vbuqogv1.apps.googleusercontent.com'
      // })
      //  .then(
      //   (info) => {
      //     this.rootPage = HomePage;
      //   },
      //    (err) => {
      //     this.rootPage = LoginPage;
      //   }
      // );
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(this.pages[page].component);
  }
}
