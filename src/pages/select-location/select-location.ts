import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {
 GoogleMaps,
 GoogleMap,
 GoogleMapsEvent,
 GoogleMapOptions,
 CameraPosition,
 MarkerOptions,
 Marker
} from '@ionic-native/google-maps';

@Component({
  selector: 'page-select-location',
  templateUrl: 'select-location.html',
})
export class SelectLocationPage {
  map: GoogleMap;
  constructor(public navCtrl: NavController, public navParams: NavParams, private googleMaps: GoogleMaps) {
  	this.loadMap()
  }

  loadMap() {

  		this.map = new GoogleMap('map_canvas'); 

	    this.map.on(GoogleMapsEvent.MAP_READY).subscribe(() => {
		    console.log('Map is ready!');
		  });
	}


  ionViewDidLoad() {
    console.log('ionViewDidLoad SelectLocationPage');
  }

}
