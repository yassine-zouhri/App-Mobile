import { Component, OnInit } from '@angular/core';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import {File as File} from '@ionic-native/file/ngx'
import { CameraPreview, CameraPreviewPictureOptions, CameraPreviewOptions, CameraPreviewDimensions } from '@ionic-native/camera-preview/ngx';
import { Base64 } from '@ionic-native/base64/ngx';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { WebView } from '@ionic-native/ionic-webview/ngx';
import { Uid } from '@ionic-native/uid/ngx';
import { AndroidPermissions } from '@ionic-native/android-permissions/ngx';
import { UniqueDeviceID } from '@ionic-native/unique-device-id/ngx';
import { Platform } from '@ionic/angular';
import Map from 'ol/Map';
import proj from 'ol/proj/Projection';
import {transform as transform0}   from 'ol/proj';
import {Source as source}  from 'ol/source';
import {Layer as layer} from 'ol/layer';
import Vector from 'ol/layer/Vector';
import {Vector as Vector1}  from 'ol/source';
import FullScreen from 'ol/control/FullScreen';
import MousePosition from 'ol/control/MousePosition';
import Attribution from 'ol/control/Attribution';
import OverviewMap from 'ol/control/OverviewMap';
import ScaleLine from 'ol/control/ScaleLine';
import ZoomSlider from 'ol/control/ZoomSlider';
import ZoomToExtent from 'ol/control/ZoomToExtent';
import Control  from 'ol/control/Control';
import {defaults as defaultControls} from 'ol/control';
import View from 'ol/View';
import VectorLayer from 'ol/layer/Vector';
import Style from 'ol/style/Style';
import Icon from 'ol/style/Icon';
import OSM from 'ol/source/OSM';
import * as olProj from 'ol/proj';
import TileLayer from 'ol/layer/Tile';
import Tile from 'ol/layer/Tile';
import KML from 'ol/format/KML';
import {format as format1} from 'ol/coordinate';

import TileWMS from 'ol/source/TileWMS';
import OSMXML from 'ol/format/OSMXML';
import Group from 'ol/layer/Group';
import Point from 'ol/geom/Point';
import LineString from 'ol/geom/LineString';
import Circle from 'ol/style/Circle';
import Fill from 'ol/style/Fill';
import Stroke from 'ol/style/Stroke'; 
import Feature from 'ol/Feature';
import Text from 'ol/style/Text';
import Projection from 'ol/proj/Projection';
import VectorSource from 'ol/source/Vector';
import GeoJSON from 'ol/format/GeoJSON';

import * as turf1 from '@turf/turf'
import {lineString as linestring11} from '@turf/helpers/index.js';
import {point as point1} from '@turf/helpers/index.js';
import {polygon as polygon1} from '@turf/helpers/index.js';
import { FilePath } from '@ionic-native/file-path/ngx';
import { FileTransfer,FileTransferObject,FileUploadOptions} from '@ionic-native/file-transfer/ngx';
import { map } from 'rxjs/operators';
import { HttpClient, HttpClientModule, HttpEvent, HttpRequest } from '@angular/common/http';
import { ServiceMap } from 'src/app/Service/MapService';
import { IncidentService } from 'src/app/Service/IncidentService';
import { WebServer } from '@ionic-native/web-server/ngx';
import { LoginService } from 'src/app/Service/LoginService';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
@Component({
  selector: 'app-add-incidents',
  templateUrl: './add-incidents.page.html',
  styleUrls: ['./add-incidents.page.scss'],
})
export class AddIncidentsPage implements OnInit {
  picture:any;
  Base64Picture:any;
  longitude:any;
  latitude:any;
  IMEIcode:any;
  MaRegion:string;
  MaProvince:string;
  MaVille:string;
  Description:any;
  options: CameraOptions = {
    quality: 5,
    destinationType: this.camera.DestinationType.FILE_URI,
    encodingType: this.camera.EncodingType.JPEG,
    mediaType: this.camera.MediaType.PICTURE
  }

  

  Secteur=['Incident routier','Incident corporel','Incident matériel','Incident de masse']
  Type1=['collision individuelle','collision multiple','collision à dommage corporel']
  Type2=['mort','suicide','blessure','éléctrocution','brulure de 3ème degré']
  Type3=['incendie','électrique','Destruction']
  Type4=['grève importante','inondation','séisme','tsunami','épidémie','tempête']
  MyTypes=[]
  validateBT:boolean=false
  MonSecteur:string;
  MonType:string;
  MyImageData:any;
  //,private file: File
  constructor(private router: Router,private file: File,private filePath: FilePath,private transfer: FileTransfer,private LoginService: LoginService,private webServer: WebServer,private http:HttpClient,private incidentService:IncidentService,private serviceMap:ServiceMap,private uniqueDeviceID: UniqueDeviceID,private uid: Uid,private androidPermissions: AndroidPermissions,private geolocation: Geolocation,private webview: WebView,private base64: Base64,private camera: Camera) { }
 
  ngOnInit() {
    this.getPermission();
    this.getUniqueDeviceID();
  }

  
  ChangeType(secteur){
    this.MonSecteur=secteur
    if(secteur=='Incident routier'){
      this.MyTypes=this.Type1;
    }
    if(secteur=='Incident corporel'){
      this.MyTypes=this.Type2
    }
    if(secteur=='Incident matériel'){
      this.MyTypes=this.Type3
    }
    if(secteur=='Incident de masse'){
      this.MyTypes=this.Type4
    }
    console.log(this.MyTypes)
  }

  GetType(montype){
    this.MonType=montype
  }

  getCurrentCoordinates() {
    
    this.geolocation.getCurrentPosition().then((resp) => {
      this.latitude = resp.coords.latitude;
      this.longitude = resp.coords.longitude;
      this.GetRegionProvinceVille()
      console.log(this.latitude+"        "+this.longitude)
     }).catch((error) => {
       console.log('Error getting location', error);
     });
  }
  
  PrendrePhoto(){
    this.camera.getPicture(this.options).then((imageData) => {
      let base64Image = 'data:image/jpeg;base64,' + imageData;
      this.picture=this.webview.convertFileSrc(imageData);
      this.MyImageData=imageData
      this.EncodePhotoToBase64(imageData)
      console.log(imageData)
     }, (err) => {});
     this.getCurrentCoordinates()  
  }
  

  uploadIncident(MyImageData)
  {   
      const fileTransfer: FileTransferObject = this.transfer.create();
      let options1: FileUploadOptions = {
        fileKey: 'imageData',
        fileName: 'name.jpg',
        params:{'MonSecteur':this.MonSecteur,'MonType':this.MonType
        ,'longitude':this.longitude,'latitude':this.latitude,'MaRegion':this.MaRegion,'MaProvince':this.MaProvince
        ,'MaVille':this.MaVille,'Description':this.Description,'IMEIcode':this.IMEIcode},
        headers: {}
    }
    console.log(MyImageData)
    fileTransfer.upload(MyImageData, 'http://192.168.43.64:9876/AddIncident', options1).then((data) => {
      // success
      console.log(data)
      alert("success");
    }, (err) => {
      console.log(err)
      alert("error"+JSON.stringify(err));
    });
  }





  upload()
  {   
     let options = {quality: 100};
    this.camera.getPicture(options).then((imageData) => {
      const fileTransfer: FileTransferObject = this.transfer.create();
      let options1: FileUploadOptions = {
        fileKey: 'imageData',
        fileName: 'name.jpg',
        params:{'MonSecteur':this.MonSecteur,'MonType':this.MonType
        ,'longitude':this.longitude,'latitude':this.latitude,'MaRegion':this.MaRegion,'MaProvince':this.MaProvince
        ,'MaVille':this.MaVille,'Description':this.Description,'IMEIcode':this.IMEIcode},
        headers: {}
    }
    console.log(imageData)
    fileTransfer.upload(imageData, 'http://192.168.43.64:9876/photo', options1).then((data) => {
      // success
      console.log(data)
      alert("success");
    }, (err) => {
      console.log(err)
      alert("error"+JSON.stringify(err));
    });
  });

}

GetMyPhoto(){
  this.incidentService.onGetPhto().then((value) => {
    value["pipe"](map((res => res))).subscribe(result => {
      
      this.picture=this.webview.convertFileSrc('data:image/jpeg;base64,'+result['data'])
      console.log("ongetmyPHOTO")
      console.log(result['data'])      
      })
  }); 
}




  EncodePhotoToBase64(filePath: string){
    this.base64.encodeFile(filePath).then((base64File: string) => {
      console.log(base64File);
      this.Base64Picture=base64File;
    }, (err) => {
      console.log(err);
    });
  }

  getUniqueDeviceID() {
    this.uniqueDeviceID.get()
      .then((uuid: any) => {
        console.log(uuid+'   ');
        this.IMEIcode=uuid
        this.uniqueDeviceID = uuid;
      })
      .catch((error: any) => {
        console.log(error);
        //this.uniqueDeviceID = 0000000000000000;
      });
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

  GetRegionProvinceVille(){
    this.serviceMap.RetournerRegions().then((value) => {
      value["pipe"](map((res => res))).subscribe(result => {
        //console.log(result.features)
        this.RecupererRegion(result.features)
        console.log(this.MaRegion)
        })
    });
    this.serviceMap.RetournerProvinces().then((value) => {
      value["pipe"](map((res => res))).subscribe(result => {
        //console.log(result.features)
        this.RecupererProvince(result.features)
        console.log(this.MaProvince)
        })
    });
    this.serviceMap.RetournerVille().then((value) => {
      value["pipe"](map((res => res))).subscribe(result => {
        console.log(result.features)
        this.RecupererVille(result.features)
        console.log(this.MaVille)
        })
    });
  }

  RecupererRegion(Data){
    Data.forEach(layer => {
    //console.log(layer.geometry.coordinates) 
    for (let i = 0; i < layer.geometry.coordinates.length; i++) {
      var LocalisationPoint = point1([this.longitude, this.latitude]);
      //console.log(layer.geometry.coordinates[i])
      var polygon =polygon1(layer.geometry.coordinates[i], { name: 'poly11' });
      var isInside2 = turf1.inside(LocalisationPoint,polygon);
      //console.log("ggggggg           ="+isInside2 )
      if(isInside2){
        //console.log("wwwwwwwwwww           ="+ layer.properties['Nom_Region'])
        this.MaRegion=layer.properties['Nom_Region']
      }
    }});
  }

  RecupererProvince(Data){
    Data.forEach(layer => {
    //console.log(layer.geometry.coordinates) 
    for (let i = 0; i < layer.geometry.coordinates.length; i++) {
      var LocalisationPoint = point1([this.longitude,  this.latitude]);
      //console.log(layer.geometry.coordinates[i])
      var polygon =polygon1(layer.geometry.coordinates[i], { name: 'poly11' });
      var isInside2 = turf1.inside(LocalisationPoint,polygon);
      //console.log("ggggggg           ="+isInside2 )
      if(isInside2){
        //console.log("wwwwwwwwwww           ="+ layer.properties['Nom_Provin'])
        this.MaProvince=layer.properties['Nom_Provin']
      }
    }});
  }

  RecupererVille(Data){
    var LocalisationPoint = point1([this.longitude, this.latitude]);
    var listVilleDistance=[]
    Data.forEach(layer => {
      var to = point1([parseFloat(layer.geometry.coordinates[0]),parseFloat(layer.geometry.coordinates[1])]);
      
      var point = new Point([parseFloat(layer.geometry.coordinates[0]),parseFloat(layer.geometry.coordinates[1])], 'XY');
      var point_feature = new Feature (point);
      console.log(point_feature)
      
      //var options = {units: 'miles'};
      var distance = turf1.distance(LocalisationPoint, to, {units: 'miles'});
      listVilleDistance.push([layer.properties['NOM'],distance])
      //console.log(distance)
    });
    var j=0
    for (let i = 0; i < listVilleDistance.length; i++) {
      if(listVilleDistance[i][1]<=listVilleDistance[j][1]){
        j=i
      }
    }
    this.MaVille=listVilleDistance[j][0]
    console.log(listVilleDistance)
  }

  VerifierInfoIncident(){
    
    if(this.picture!=null && this.Base64Picture!=null && this.longitude!=null && this.latitude!=null
      &&this.IMEIcode!=null && this.MaRegion!=null && this.MaProvince!=null && this.MaVille!=null && this.MonType!=null && this.MonSecteur!=null&&this.IMEIcode!=null){
        console.log("trueeeeeeeeeee")
        this.validateBT=true

      }
      else{
        this.validateBT=false
      }
      
  }

  OnValidateIncident(){
    this.uploadIncident(this.MyImageData)
    this.router.navigate(['/home'])
  }

  getIncident(){
    this.incidentService.onGetIncident().then((value) => {
      value["pipe"](map((res => res))).subscribe(result => {
        console.log(result)      
        })
    });
  }

  GetDescription(value){
    this.Description=value
  }



}
