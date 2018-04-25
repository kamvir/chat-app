import { Component, ViewChild} from '@angular/core';
import { NavController, NavParams, Content } from 'ionic-angular';
import { AngularFireDatabase } from 'angularfire2/database-deprecated';
import { Camera } from '@ionic-native/camera';


@Component({
  selector: 'page-chat',
  templateUrl: 'chat.html',
})

export class ChatPage{
  @ViewChild(Content) private content: Content;

  username: string = '';
  message: string = '';
  s;
  messages: object[]=[];
  offStatus: boolean = false;
  imageUrl: string;
  isClicked=true;

  constructor(public navCtrl: NavController, public navParams: NavParams, public db: AngularFireDatabase, private camera: Camera) {
  this.username = this.navParams.get('username');
  this.s = this.db.list('/chat').subscribe( data =>{
    this.messages = data;
  });
}

ionViewDidLoad(){
  this.db.list('/chat').push({
    specialMessage: true,
    message: this.username+' has joined the chat',
    });  
    setTimeout(() => {
      this.content.scrollToBottom(1);
    }, 800);
}



sendMessage(){
  
  this.db.list('/chat').push({
    username: this.username,
    message: this.message,
    date: Date(),
    
  })
  .then(()=>{
    //message is sent
  });
  this.message = '';
    this.content.scrollToBottom(1)
}

ionViewWillLeave(){
this.s.unsubscribe();
this.db.list('/chat').push({
  specialMessage: true,
  message: this.username+' has left'
  });
}


getImage(){
  // let loader = this.loadingCtrl.create({
  //   content: 'Please wait...'
  // });
  // loader.present();
  this.camera.getPicture({
    quality: 100,
    sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
    correctOrientation: true,
    encodingType: this.camera.EncodingType.JPEG
  });
}

}
