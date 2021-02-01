import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy, MenuController, NavParams } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import {IncidentService} from 'src/app/Service/IncidentService';
import { Camera } from '@ionic-native/camera/ngx';
import { CameraPreview} from '@ionic-native/camera-preview/ngx';
import {File} from '@ionic-native/file/ngx'
import { WebView } from '@ionic-native/ionic-webview/ngx';
import { Base64 } from '@ionic-native/base64/ngx';
import { UniqueDeviceID } from '@ionic-native/unique-device-id/ngx';
import { Uid } from '@ionic-native/uid/ngx';
import { AndroidPermissions } from '@ionic-native/android-permissions/ngx';
import { ServiceMap } from 'src/app/Service/MapService';
import { LoginService } from 'src/app/Service/LoginService';
import { WebServer } from '@ionic-native/web-server/ngx';
import { FileTransfer} from '@ionic-native/file-transfer/ngx';
import { FilePath } from '@ionic-native/file-path/ngx';
import { NativeStorage } from '@ionic-native/native-storage/ngx';
@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule,HttpClientModule],
  providers: [
    StatusBar,Geolocation,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },MenuController,IncidentService,Camera,
    CameraPreview,File,WebView,Base64,
    UniqueDeviceID,
    Uid,NavParams,
    AndroidPermissions,ServiceMap,LoginService,WebServer,File,FileTransfer,FilePath,NativeStorage
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
