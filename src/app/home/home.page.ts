import { Component, NgZone } from '@angular/core';
import { AndroidPermissions } from '@ionic-native/android-permissions/ngx';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { Uid } from '@ionic-native/uid/ngx';
import { UniqueDeviceID } from '@ionic-native/unique-device-id/ngx';
import { MenuController } from '@ionic/angular';
import { NativeStorage } from '@ionic-native/native-storage/ngx'
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
	latitude: any = 0; //latitude
  longitude: any = 0; //longitude
  IMEIcode:any;
  constructor(private nativeStorage: NativeStorage,private geolocation: Geolocation,private menuCtrl: MenuController,private uniqueDeviceID: UniqueDeviceID,private uid: Uid,private androidPermissions: AndroidPermissions) {
    this.getPermission();
    this.GetMyIEMIcode();
  }
options = {
    timeout: 10000, 
    enableHighAccuracy: true, 
    maximumAge: 3600
  }
 
  // use geolocation to get user's device coordinates
  getCurrentCoordinates() {
    this.geolocation.getCurrentPosition().then((resp) => {
      this.latitude = resp.coords.latitude;
      this.longitude = resp.coords.longitude;
      console.log(this.latitude+"        "+this.longitude)
     }).catch((error) => {
       console.log('Error getting location', error);
     });
  }

  OpenMenu(){
    this.menuCtrl.open('first')
  }

  getUniqueDeviceID() {
    this.uniqueDeviceID.get()
      .then((uuid: any) => {
        console.log(uuid+'   ');
        this.IMEIcode=uuid
        this.uniqueDeviceID = uuid;
        this.nativeStorage.setItem('IMEIcode', {IMEIcode: this.IMEIcode}).then(() => console.log('Stored item!'),
          error => console.error('Error storing item', error));
      })
      .catch((error: any) => {
        console.log(error);
      });
  }

  GetMyIEMIcode(){
    this.nativeStorage.getItem('IMEIcode').then((data)=>{this.IMEIcode=data['IMEIcode']});
    if(this.IMEIcode==null){
      this.getUniqueDeviceID()
    }
  }

  getPermission(){
    this.androidPermissions.checkPermission(
      this.androidPermissions.PERMISSION.READ_PHONE_STATE
    ).then(res => {
      if(res.hasPermission){
        
      }else{
        this.androidPermissions.requestPermission(this.androidPermissions.PERMISSION.READ_PHONE_STATE).then(res => {
          alert("Persmission Granted Please Restart App!");
        }).catch(error => {
          alert("Error! "+error);
        });
      }
    }).catch(error => {
      alert("Error! "+error);
    });
  }

}
