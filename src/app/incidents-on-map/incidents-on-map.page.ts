import { Component, OnInit } from '@angular/core';
import * as Leaflet from 'leaflet';
import { antPath } from 'leaflet-ant-path';
import { icon, Marker} from 'leaflet';
import * as proj4leaflet from "proj4leaflet";
import 'proj4leaflet';
import { map } from 'rxjs/operators';
@Component({
  selector: 'app-incidents-on-map',
  templateUrl: './incidents-on-map.page.html',
  styleUrls: ['./incidents-on-map.page.scss'],
})
export class IncidentsOnMapPage implements OnInit {

  map: Leaflet.Map;
  constructor() { }

  ngOnInit() {

  }

  ionViewDidEnter() { this.leafletMap();     this.map.on('click', this.onMapClick);}

  leafletMap() {


    /*this.map = Leaflet.map('mapId').setView([-7.63, 33.56], 5);
    Leaflet.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: 'edupala.com © Angular LeafLet',
    }).addTo(this.map);
    const iconUrl = 'assets/marker-icon.png';
    const iconDefault = icon({
      iconUrl,
      iconSize: [25, 41],
      iconAnchor: [12, 41],
      popupAnchor: [1, -34],
      tooltipAnchor: [16, -28],
      shadowSize: [41, 41]
    });
    Marker.prototype.options.icon = iconDefault;
    const markPoint = Leaflet.marker([-6.4094618,32.7726298]);
    markPoint.bindPopup('<p>Tashi Delek - Bangalore.</p>');
    this.map.addLayer(markPoint);*/

    var crs = new Leaflet.Proj.CRS('EPSG:4326',
  '+proj=utm +zone=33 +ellps=GRS80 +towgs84=0,0,0,0,0,0,0 +units=m +no_defs',
  {
    resolutions: [
      8192, 4096, 2048, 1024, 512, 256, 128
    ],
    origin: [0, 0]
  })
this.map = Leaflet.map('mapId',).setView([ 33.56,-7.63], 5);
    Leaflet.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: 'edupala.com © Angular LeafLet',
    }).addTo(this.map);
  
   /* var map = Leaflet.map('mapId', {
      crs: proj,
      continuousWorld: true,
    worldCopyJump: false
    }).setView([-6.4094618,32.7726298], 2);*/

    Leaflet.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 20,
      minZoom: 0,
      continuousWorld: true,
      attribution: ''
    }).addTo(this.map);

/*const iconUrl = 'assets/marker-icon.png';
    const iconDefault = icon({
      iconUrl,
      iconSize: [25, 41],
      iconAnchor: [12, 41],
      popupAnchor: [1, -34],
      tooltipAnchor: [16, -28],
      shadowSize: [41, 41]
    });*/
    const iconUrl = 'assets/marker-icon.png';
    const iconDefault = icon({
      iconUrl,
    });
    Marker.prototype.options.icon = iconDefault;
    const markPoint = Leaflet.marker([32.7726298,-6.4094618]);
    this.map.addLayer(markPoint);


    

    
  }
  onMapClick(e) {
    alert("You clicked the map at " + e.latlng);
}
}



  

