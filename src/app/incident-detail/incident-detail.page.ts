import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { WebView } from '@ionic-native/ionic-webview/ngx';
import { IncidentService } from '../Service/IncidentService';
import { map } from 'rxjs/operators';
import 'ol/ol.css';
import * as Leaflet from 'leaflet';
import { antPath } from 'leaflet-ant-path';
import { icon, Marker} from 'leaflet';
import * as proj4leaflet from "proj4leaflet";
import 'proj4leaflet';

@Component({
  selector: 'app-incident-detail',
  templateUrl: './incident-detail.page.html',
  styleUrls: ['./incident-detail.page.scss'],
})
export class IncidentDetailPage implements OnInit {

  Secteur:any;
  Type:any;
  Region:any;
  Province:any;
  Ville:any;
  Etet_Validation:any;
  Description:any;
  Id_Incident:any;
  MyPhoto:any;
  map:any;
  longitude:any;
  latitude:any;
  constructor(private route: ActivatedRoute,private webview: WebView,private incidentService:IncidentService) { }

  ngOnInit() {
    console.log(this.route.snapshot.params)
    this.GetInfo()

  }
  ionViewDidEnter() { this.leafletMap(); }

  GetInfo(){
    this.Secteur=this.route.snapshot.params.Secteur
    this.Type=this.route.snapshot.params.Type
    this.Region=this.route.snapshot.params.Region
    this.Province=this.route.snapshot.params.Province
    this.Ville=this.route.snapshot.params.Ville
    this.Etet_Validation=this.route.snapshot.params.Etet_Validation
    if(this.Etet_Validation=="undefined"){
      this.Etet_Validation="En cours de validation"
    }
    this.Description=this.route.snapshot.params.Description
    this.Id_Incident=this.route.snapshot.params.Id_Incident
    this.MyPhoto=this.route.snapshot.params.MyPhoto
    this.longitude=this.route.snapshot.params.IncidentLongitude
    this.latitude=this.route.snapshot.params.IncidentLatitude
  }

  leafletMap() {

    var crs = new Leaflet.Proj.CRS('EPSG:4326',
  '+proj=utm +zone=33 +ellps=GRS80 +towgs84=0,0,0,0,0,0,0 +units=m +no_defs',
  {
    resolutions: [
      8192, 4096, 2048, 1024, 512, 256, 128
    ],
    origin: [0, 0]
  })
this.map = Leaflet.map('mapId',).setView([ this.latitude,this.longitude], 5);
    Leaflet.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: 'edupala.com © Angular LeafLet',
    }).addTo(this.map);

    Leaflet.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 20,
      minZoom: 0,
      continuousWorld: true,
      attribution: ''
    }).addTo(this.map);
    const iconUrl = 'assets/marker-icon.png';
    const iconDefault = icon({
      iconUrl,
    });
    Marker.prototype.options.icon = iconDefault;
    const markPoint = Leaflet.marker([32.7726298,-6.4094618]).bindPopup("Secteur :"+this.Secteur+'<br/> Type : '+this.Type+'<br/> Description : '+this.Description);
    this.map.addLayer(markPoint);


    

    
  }



}
