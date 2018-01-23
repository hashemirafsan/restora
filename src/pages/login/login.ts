import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { ChooseUserPage } from '../choose-user/choose-user';

import { Sim } from '@ionic-native/sim';
import { GooglePlus } from '@ionic-native/google-plus';
import { NativeStorage } from '@ionic-native/native-storage';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import axios from 'axios';

import {oauth_credentials, route} from '../../assets/Auth/Auth';

@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {
  selectedItem: any;

  constructor(public http:Http, public navCtrl: NavController, private sim: Sim, private googlePlus: GooglePlus, public nativeStorage: NativeStorage) {

  }

  	getSimData(event) {

  		this.sim.getSimInfo().then(
		  (info) => {
		  	this.selectedItem = info
		  },
		  (err) => console.log('Unable to get sim info: ', err)
		);

		this.sim.hasReadPermission().then(
		  (info) => console.log('Has permission: ', info)
		);
  	}

  	getLogin(event) {
  			// this.http.get('http://server.dev/hello')
  			// 	.map( res => res.json())
  			// 	.subscribe(
  			// 		data => {
  			// 			this.selectedItem = data
  			// 		},
  			// 		err => {
  			// 			this.selectedItem = err
  			// 		}
  			// 	)
  				
  			// axios.get('http://server.dev/api/v1/all-restaurant')
  			// 	.then( res => {
  			// 		this.selectedItem = res.data
  			// 	})
  			// 	.catch( err => {
  			// 		this.selectedItem = err
  			// 	})

  			
  	// 	this.googlePlus.login({
  	// 		webClientId: '594029952654-45s1j3995chh2jj7ogq3fdj4vbuqogv1.apps.googleusercontent.com'
  	// 	})
		 // .then(
		 //  (info) => {

		  	axios.post(route.app_url + '/check-user', {email:'rafsanhashemi@gmail.com'})
		  	     .then((res) => {



		  	     	this.nativeStorage.setItem('user', res.data)
					  .then(
					    () => console.log('Stored item!'),
					    error => console.error('Error storing item', error)
					  );
					  this.navCtrl.setRoot(ChooseUserPage, res.data);
		  	     })
		  	console.log()
		  	
		  	// let header = {
		  	// 	'Content-Type': 'application/json'
		  	// };
		  	// oauth_credentials.username = info.email;
		  	// oauth_credentials.password = 'secret';
		  	// axios
		  	// 	.post(route.oauth_token, oauth_credentials, {headers: header})
		  	// 	.then( res => {
		  	// 		console.log(res)
		  			
		  	// 		let res = {
		  	// 			name : "Rashemi Jani",
		  	// 			email : "Jani@gmail.com"
		  	// 		}
		  	// 		this.navCtrl.setRoot(ChooseUserPage,res);

		  	// 	})
		  	// 	.catch( err => {
		  			
		
		  	// 		this.selectedItem = err;
		  	// 	})


		  	
		//  },
		  
		// );
    }

}
