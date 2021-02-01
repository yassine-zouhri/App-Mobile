import { Component } from '@angular/core';
import * as Leaflet from 'leaflet';
import { MenuController,Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
	/* menu=[
    {title:'Gallery', component:GalleryPage,link:'/gallery'},
    {title:'Weather', component:MeteoPage,link:'/meteo'},
    {title:'Places', component:PlacesPage,link:'/places'},
    {title:'Home', component:HomePage,link:'/home'}
    ];*/
	menu=[
    {title:'Gallery',link:'/gallery'},
    {title:'Weather',link:'/meteo'},
    {title:'Places',link:'/places'},
    {title:'Home',link:'/home'}
    ];

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
	private menuCtrl: MenuController
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }
  closeMenu() {
    this.menuCtrl.close();
  }
}
