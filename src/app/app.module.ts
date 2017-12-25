import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';


import { LoginPage } from '../pages/login/login';
import { ChooseUserPage } from '../pages/choose-user/choose-user';
import { AddRegularDetailsPage } from '../pages/add-regular-details/add-regular-details';
import { ChooseRegularRestaurantCatPage } from '../pages/choose-regular-restaurant-cat/choose-regular-restaurant-cat';
import { ChooseRegularRestaurantPage } from '../pages/choose-regular-restaurant/choose-regular-restaurant';
import { ChooseRegularFoodCatPage } from '../pages/choose-regular-food-cat/choose-regular-food-cat';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';
import { TabsPage } from '../pages/tabs/tabs';
import { ProfilePage } from '../pages/profile/profile';
import { RestaurantProfilePage } from '../pages/restaurant-profile/restaurant-profile';
import { FoodProfilePage } from '../pages/food-profile/food-profile';
import { FoodsPage } from '../pages/foods/foods';
import { RestaurantsPage } from '../pages/restaurants/restaurants';
import { SettingsPage } from '../pages/settings/settings';
import { RecommendedPage } from '../pages/recommended/recommended';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Sim } from '@ionic-native/sim';
import { GooglePlus } from '@ionic-native/google-plus';
import { NativeStorage } from '@ionic-native/native-storage';
import {HttpModule} from '@angular/http';
import { Ionic2RatingModule } from 'ionic2-rating';
import { Geolocation } from '@ionic-native/geolocation';
import { NativeGeocoder } from '@ionic-native/native-geocoder';
import { GoogleMaps } from '@ionic-native/google-maps';
import { PhotoViewer } from '@ionic-native/photo-viewer';
// import { IonicImageViewerModule } from 'ionic-img-viewer';

@NgModule({
  declarations: [    
    LoginPage,
    ChooseUserPage,
    AddRegularDetailsPage,
    ChooseRegularRestaurantCatPage,
    ChooseRegularRestaurantPage,
    ChooseRegularFoodCatPage,
    MyApp,
    HomePage,
    ListPage,
    TabsPage,
    ProfilePage,
    RestaurantProfilePage,
    FoodProfilePage,
    FoodProfilePage,
    FoodsPage,
    RestaurantsPage,
    SettingsPage,
    RecommendedPage
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MyApp),
    Ionic2RatingModule,
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    LoginPage,
    ChooseUserPage,
    AddRegularDetailsPage,
    ChooseRegularRestaurantCatPage,
    ChooseRegularRestaurantPage,
    ChooseRegularFoodCatPage,
    MyApp,
    HomePage,
    ListPage,
    TabsPage,
    ProfilePage,
    RestaurantProfilePage,
    FoodProfilePage,
    FoodsPage,
    RestaurantsPage,
    SettingsPage,
    RecommendedPage

  ],
  providers: [
    StatusBar,
    SplashScreen,
    Sim,
    GooglePlus,
    NativeStorage,
    Geolocation,
    NativeGeocoder,
    GoogleMaps,
    PhotoViewer,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
