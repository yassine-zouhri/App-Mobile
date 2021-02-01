import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { HttpClient, HttpClientModule } from '@angular/common/http';


@Injectable()
export class ServiceMap{
    constructor(private http:HttpClient){}
   localhostGeoServer:string="http://localhost:8080"

RetournerRegions(){
    return new Promise(
      (resolve, reject) => {
        setTimeout(
          () => {
            resolve(this.http.get(this.localhostGeoServer+"/geoserver/cite/ows?service=WFS&request=GetFeature&typeName=cite:Regions&outputFormat=application/json",
            ));
          }, 1000
        );
      }
    );
  }
RetournerProvinces(){
    return new Promise(
      (resolve, reject) => {
        setTimeout(
          () => {
            resolve(this.http.get(this.localhostGeoServer+"/geoserver/cite/ows?service=WFS&request=GetFeature&typeName=cite:Province&outputFormat=application/json",
            ));
          }, 1000
        );
      }
    );
  }
RetournerVille(){
    return new Promise(
      (resolve, reject) => {
        setTimeout(
          () => {
            resolve(this.http.get(this.localhostGeoServer+"/geoserver/cite/ows?service=WFS&request=GetFeature&typeName=cite:MonVille&outputFormat=application/json",
            ));
          }, 1000
        );
      }
    );
  }




}