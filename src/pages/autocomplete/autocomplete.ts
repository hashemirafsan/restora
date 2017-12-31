import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {ViewController} from 'ionic-angular';
import axios from 'axios';
import _ from 'lodash';
import { route } from '../../assets/Auth/Auth';



@Component({
  selector: 'page-autocomplete',
  templateUrl: 'autocomplete.html',
})
export class AutocompletePage {
  public inputs;
  public restCatId = [];
  public updatedRestName = [];
  public restName = [];
  private stmt = true;

  constructor (public viewCtrl: ViewController,private params: NavParams) {
     axios
      .get(route.app_url + '/all-restaurant')
      .then(res => {
        _.map(res.data, (item) => {
          item.status = false;
        })
        this.restCatId = res.data;
        this.restCatId.forEach(key=>{
          this.restName.push(key.restaurant_name);
        })
      })
      .catch(err => {
        console.log(err)
      })
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }

  chooseItem(item: any) {
    this.viewCtrl.dismiss(item);
  }
  
  updateSearch(inputs) {
    this.updatedRestName = [];
    if (inputs == '') {
       this.updatedRestName = [];
       this.stmt = true;
       return;
    }

    this.restName.filter((item) => {
       if (item.toString().toLowerCase().indexOf(inputs.toLowerCase()) > -1){
         this.restCatId.forEach(key=>{
          if(key.restaurant_name == item){

   
              this.updatedRestName.forEach(search =>{
                if(search.restaurant_name == item)
                {
                  this.stmt = false;
                }
                else{
                  this.stmt = true;
                }
              })
            

            if(this.stmt == true){
                this.updatedRestName.push(key);
            }
          }
         })
       }
    })


  }


}