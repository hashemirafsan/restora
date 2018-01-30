import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { GooglePlus } from '@ionic-native/google-plus';

import { CreateRestaurantPage } from '../pages/create-restaurant/create-restaurant';
import { SelectLocationPage } from '../pages/select-location/select-location';
import { SelectRestaurantCatPage } from '../pages/select-restaurant-cat/select-restaurant-cat';

import { LoginPage } from '../pages/login/login';
import { ChooseUserPage } from '../pages/choose-user/choose-user';
import { AddRegularDetailsPage } from '../pages/add-regular-details/add-regular-details';
import { ChooseRegularRestaurantCatPage } from '../pages/choose-regular-restaurant-cat/choose-regular-restaurant-cat';
import { ChooseRegularRestaurantPage } from '../pages/choose-regular-restaurant/choose-regular-restaurant';
import { ChooseRegularFoodCatPage } from '../pages/choose-regular-food-cat/choose-regular-food-cat';
import { Geolocation } from '@ionic-native/geolocation';
import {
 GoogleMaps,
 GoogleMap,
 GoogleMapsEvent,
 GoogleMapOptions,
 CameraPosition,
 MarkerOptions,
 Marker
} from '@ionic-native/google-maps';
import { NativeGeocoder, NativeGeocoderReverseResult, NativeGeocoderForwardResult } from '@ionic-native/native-geocoder';


import { HomePage } from '../pages/home/home';
import { ProfilePage } from '../pages/profile/profile';
import { RestaurantProfilePage } from '../pages/restaurant-profile/restaurant-profile';
import { FoodProfilePage } from '../pages/food-profile/food-profile';

import { FoodsPage } from '../pages/foods/foods';
import { RestaurantsPage } from '../pages/restaurants/restaurants';
import { SettingsPage } from '../pages/settings/settings';
import { RecommendedPage } from '../pages/recommended/recommended';
import { AddFoodPage } from '../pages/add-food/add-food';
import { AutocompletePage } from '../pages/autocomplete/autocomplete';

import { FoodListPage } from '../pages/food-list/food-list';
import { AllReviewsPage } from '../pages/all-reviews/all-reviews';
import { RestaurantAllReviewsPage } from '../pages/restaurant-all-reviews/restaurant-all-reviews';

import axios from 'axios';
import _ from 'lodash';
import { route } from '../assets/Auth/Auth';


@Component({
  selector: 'page-app',
  templateUrl: 'app.html'
})
export class MyApp {
  
  @ViewChild(Nav) nav: Nav;

  rootPage: any = RestaurantAllReviewsPage;

  public getData;
  map: GoogleMap;
  public notifications = [];
  public new_notification = 0;


  public location = {};

  pages: Array<{title: string, component: any}>;

  constructor( public platform: Platform, private nativeGeocoder: NativeGeocoder, private googleMaps: GoogleMaps, public statusBar: StatusBar, private googlePlus: GooglePlus, public splashScreen: SplashScreen, private geolocation: Geolocation) {
    /**
     * Background Notification add
     */

     
    this.initializeApp();



    this.geolocation.getCurrentPosition().then((position) => {
      this.getData = "Can't find you!";
      console.log(position)


      this.location = {
        lat: position.coords.latitude,
        lng: position.coords.longitude
      }

      this.nativeGeocoder.reverseGeocode(position.coords.latitude, position.coords.longitude)
        .then((result: NativeGeocoderReverseResult) => this.getData = result)
        .catch((error: any) => console.log(error));

     // resp.coords.latitude
     // resp.coords.longitude
    }).catch((error) => {
      console.log('Error getting location', error);
    });
    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'Home', component: HomePage },
      { title: 'Profile', component: ProfilePage},
      { title: 'Recommended', component: RecommendedPage},
      { title: 'Foods', component: FoodsPage},
      { title: 'Restaurant', component: RestaurantsPage },
      { title: 'Settings', component: SettingsPage }
      

    ];

  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      this.getNotification('author', 5);

     //this.rootPage = HomePage;

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

  getNotification(type, user_id) {
    axios.get(route.app_url + '/get-notifications/' + type + '/' + user_id)
         .then(res => {
          this.new_notification = res.data.new_notification
          this.notifications = res.data.notifications
          console.log(this.notifications)
            console.log(res)
         })
         .catch(err => {
            console.log(err)
         })
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(this.pages[page].component);
  }
}
