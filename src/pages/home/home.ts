import { Component } from '@angular/core';
import { NavController, AlertController } from 'ionic-angular';
import { ChatPage } from '../chat/chat';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
   username: string ='';
  constructor(public navCtrl: NavController,private alertController: AlertController) {

  }

  loginUser(){
    if(/^[a-z\sA-Z\s0-9\s]+$/.test(this.username)){
        this.navCtrl.push(ChatPage,{
          username: this.username
        })
    }else{
     const alert =  this.alertController.create({
        title: 'ERROR',
        subTitle: 'Invalid Username',
        buttons: ['OK']
      }
      );

      alert.present();
    }
  }

}
