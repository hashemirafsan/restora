import { Component,ViewChild} from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Slides } from 'ionic-angular';
import { route } from '../../assets/Auth/Auth';
import axios from 'axios';
import { ToastController } from 'ionic-angular';
import { AllReviewsPage } from '../all-reviews/all-reviews';
import { RestaurantAllReviewsPage } from '../restaurant-all-reviews/restaurant-all-reviews';
import { FoodListPage } from '../food-list/food-list';

@Component({
  selector: 'page-restaurant-profile',
  templateUrl: 'restaurant-profile.html',
})

export class RestaurantProfilePage {
   @ViewChild(Slides) slides: Slides;


   public restaurant_details = {};
   public review_status_for_current_user = true;

  constructor(public toastCtrl: ToastController, public navCtrl: NavController, public navParams: NavParams) {  
    console.log(this.navParams)
    this.getRestaurantByID(this.navParams.data.restaurant_id);
    this.getRestaurantReviewStatusForCurrentUser(1, this.navParams.data.restaurant_id);
  }

  getRestaurantReviewStatusForCurrentUser(user_id, restaurant_id) {
      let data = {
          user_id,
          restaurant_id
      }

      axios
          .post(route.app_url + '/restaurant-review-status/', data)
          .then((response) => {

              this.review_status_for_current_user = response.data.restaurant_status;
          })
          .catch((err) => {
            console.log(err)
          })
  }

  multipleStar(n) {
    let arr = []
    for(let i = 0; i < n; i++ ) {
      arr.push(i)
    }
    return arr
  }

  getRestaurantByID(id) {
    axios
        .get(route.app_url + '/get-restaurant-by-id/' + id + '/' + 1)
        .then(({data}) => {
            console.log(data)
            this.restaurant_details = data[0];
        })
        .catch((err) => {
          console.log(err)
        })
  }

  changeToggle() {
    axios
        .get(route.app_url + '/restaurant-follow-unfollow/' + this.navParams.data.restaurant_id + '/' + 1)
        .then(({data : { message }}) => {
          this.presentToast(message);
          this.getRestaurantByID(this.navParams.data.restaurant_id);
        })
        .catch((err) => {
          console.log(err)
        })

  }

  changeToogleForVisitor() {
    axios
        .get(route.app_url + '/restaurant-visited-unvisited/' + this.navParams.data.restaurant_id + '/' + 1)
        .then(({data : { message }}) => {
          this.presentToast(message);
          this.getRestaurantByID(this.navParams.data.restaurant_id);
        })
        .catch((err) => {
          console.log(err)
        })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RestaurantProfilePage');
    this.slides.lockSwipes(true);	
  }

  // Ate option

    disbutton: string = "disabledbtn";
      
      togglebtn(getbtn: string) {
        
      if (this.disbutton === 'activebtn') {
        this.disbutton = "disabledbtn";
      }
      else if (this.disbutton === 'disabledbtn') {
        this.disbutton = "activebtn";
      }
      
    }


   //rating
    margin = "-15%";
    expresions = null;
    rate = null;
    onModelChange(rate){
        this.margin = "0";  
        let button = rate;
        this.expresions = ["","Hated it!","Disliked it!","It's ok","Liked it!","Loved it!"] ; 
            
    }

    submitbutton1(){
      // slide
      this.slides.lockSwipes(false);
      this.slides.slideNext();
      this.slides.lockSwipeToNext(true);
    }


    submitbutton2(rate,title,desc){
      // update review
      console.log("done "+rate+" "+title+" "+desc);
      this.rate = rate;
      // slide
        let data = {
            rate,
            title,
            type_id: 1,
            restaurant_review: desc,
            user_id: 1,
            restaurant_id: this.navParams.data.restaurant_id
        };

        axios
            .post(route.app_url + '/restaurant-review', data)
            .then((response) => {
                this.getRestaurantByID(this.navParams.data.restaurant_id);
                console.log(response)
            })
            .catch((err) => {
                console.log(err)
            })

        console.log(data)
      this.slides.lockSwipes(false);
      this.slides.slideNext(); 
      this.slides.lockSwipes(true);   
    }

     //rate edit
    edit(){
        this.slides.slideTo(1);
    }

      //rate delete
    delete(){
        this.rate = null;
        this.slides.slideTo(1);
    }

    //tiast  
  presentToast(message) {
    let toast = this.toastCtrl.create({
      message: message,
      duration: 2000,
      position: 'down'
    });
    toast.present();
  }

   
 

  //allreview
  allreview(){
    this.navCtrl.push(RestaurantAllReviewsPage);
  }

  //allfoods
  allfood(){
    this.navCtrl.push(FoodListPage);
  }

}
