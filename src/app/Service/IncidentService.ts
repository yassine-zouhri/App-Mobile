import { Injectable } from '@angular/core';
import { catchError, map } from 'rxjs/operators';
import {  HttpClientModule, HttpHeaders } from '@angular/common/http';
import { LoginService } from './LoginService';
import { Observable, throwError } from 'rxjs';
import { HttpClient } from '@angular/common/http';


@Injectable()
export class IncidentService{
  USER_NAME_SESSION_ATTRIBUTE_NAME = 'authenticatedUser'
  username: string="yassine@gmail.com";
  password : string="admin1";
  localhost:string="http://localhost:9876"
  localhostGeoServer:string="http://localhost:8080"
    constructor(private http:HttpClient,private authenticationService: LoginService){}

    


      onGetIncident(){
        return new Promise(
          (resolve, reject) => {
            setTimeout(
              () => {
                resolve(this.http.get("http://192.168.43.64:9876/listIncident",
                ));
              }, 1000
            );
          }
        );
      }
      myFunc(){

        let http: HttpClient;
    
        return this.http.get(
          'http://localhost:9876/listIncident',
          {
            headers:
              new HttpHeaders(
                {
                  'Content-Type': 'application/json',
                  'X-Requested-With': 'XMLHttpRequest',
                  'MyClientCert': '',        // This is empty
                  'MyToken': ''              // This is empty
                }
              )
          }
        ).pipe( map(res => res), catchError(err => throwError(err)) );
      }
     AddIncident(newIncident:Object){
        return this.http.post("http://192.168.43.64:9876/AddIncident",newIncident).pipe(map((res => res))).subscribe(result => {
            console.log(result);
            })
      }

      AddIncidentTest(newIncident){
        console.log(newIncident)
        return this.http.post("http://192.168.43.64:9876/photo",newIncident).pipe(map((res => res))).subscribe(result => {
            console.log(result);
            })
      }

      onGetPhto(){
        return new Promise(
          (resolve, reject) => {
            setTimeout(
              () => {
                resolve(this.http.get("http://192.168.43.64:9876/GetPhoto",
                ));
              }, 2000
            );
          }
        );
      }

      onGetAllPhotoBy(){
        return new Promise(
          (resolve, reject) => {
            setTimeout(
              () => {
                resolve(this.http.get("http://192.168.43.64:9876/onGetAllPhotoBy",
                ));
              }, 2000
            );
          }
        );
      }
      

}