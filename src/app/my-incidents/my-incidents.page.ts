import { Component, Input, OnInit } from '@angular/core';
import { NativeStorage } from '@ionic-native/native-storage/ngx';
import { IncidentService } from 'src/app/Service/IncidentService';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { WebView } from '@ionic-native/ionic-webview/ngx';
import { ModalController, NavParams } from '@ionic/angular';
import { ModalFilterPage} from '../modal-filter/modal-filter.page';
@Component({
  selector: 'app-my-incidents',
  templateUrl: './my-incidents.page.html',
  styleUrls: ['./my-incidents.page.scss'],
})
export class MyIncidentsPage implements OnInit {
  IMEIcode:any;
  MyIncidentList:any=[];
  ListImage:any=[];

  SecteurFilter:any;
  TypeFilter:any;
  RegionFilter:any;
  ProvinceFilter:any;
  VilleFilter:any;
  ListeIncidentApresFiltre:any=[]

  MonRegion: string="yassine";

  constructor(public navParams: NavParams,public modalController: ModalController,private webview: WebView,
    private router: Router,private nativeStorage: NativeStorage,
    private incidentService:IncidentService) { }

  ngOnInit() {
    //this.GetIMEIcode()
    this.getIncident()
    
  }

  FiltreIncident(){
    this.nativeStorage.getItem('secteur').then(
      data => {this.SecteurFilter=data["secteur"];console.log((this.SecteurFilter));},error => console.error(error));
    this.nativeStorage.getItem('type').then(
      data => {this.TypeFilter=data["type"];console.log(this.TypeFilter)},error => console.error(error));
    this.nativeStorage.getItem('region').then(
      data => {this.RegionFilter=data["region"];console.log(this.RegionFilter)},error => console.error(error));
    this.nativeStorage.getItem('province').then(
      data => {this.ProvinceFilter=data["province"];console.log(this.ProvinceFilter)},error => console.error(error));
    this.nativeStorage.getItem('ville').then( data => {this.VilleFilter=data["ville"];console.log(this.VilleFilter.lenght)},error => console.error(error));
    setTimeout(
      () => {
    
    
    console.log("innnnnnnnnnnnn taillle ="+this.MyIncidentList.length)

    console.log("innnnnnnnnnnnn taillle afetrrrrrrrer   time="+this.MyIncidentList.length)
        for(var f=0;f<this.MyIncidentList.length;f++){
          console.log("innnnnnnnnnnnn boucle ="+this.MyIncidentList.length+"       "+f)
          console.log(this.ListeIncidentApresFiltre)
          var checkFilter=true
          console.log("onnnnnn")
          console.log(this.MyIncidentList[f])
          console.log(this.SecteurFilter)
          console.log("onnnnnn")
          if(this.SecteurFilter!='' && this.MyIncidentList[f].secteur!=this.SecteurFilter){console.log('fffffffffffff');checkFilter=false}
          if(this.TypeFilter!='' && this.MyIncidentList[f].type!=this.TypeFilter){console.log('fffffffffffff');checkFilter=false}
          if(this.RegionFilter!='' && this.MyIncidentList[f].region!=this.RegionFilter){console.log('fffffffffffff');checkFilter=false}
          if(this.ProvinceFilter!='' && this.MyIncidentList[f].province!=this.ProvinceFilter){console.log('fffffffffffff');checkFilter=false}
          if(this.VilleFilter!='' && this.MyIncidentList[f].ville!=this.VilleFilter){console.log('fffffffffffff');checkFilter=false}
          if(checkFilter==true){this.ListeIncidentApresFiltre.push(this.MyIncidentList[f])}
          console.log(this.ListeIncidentApresFiltre)
        }
        this.MyIncidentList=this.ListeIncidentApresFiltre
    console.log("innnnnnnnnnnnn filtre")
    console.log(this.MyIncidentList)
      }, 3000
    );

    /*for(var f=0;f<this.MyIncidentList.length;f++){
      var checkFilter=true
      console.log("onnnnnn")
      console.log(this.MyIncidentList[f])
      console.log(this.SecteurFilter)
      console.log("onnnnnn")
      if(this.SecteurFilter!='' && this.MyIncidentList[f].secteur==this.SecteurFilter){console.log('fffffffffffff');checkFilter=false}
      if(this.TypeFilter!='' && this.MyIncidentList[f].type==this.TypeFilter){console.log('fffffffffffff');checkFilter=false}
      if(this.RegionFilter!='' && this.MyIncidentList[f].region==this.RegionFilter){console.log('fffffffffffff');checkFilter=false}
      if(this.ProvinceFilter!='' && this.MyIncidentList[f].province==this.ProvinceFilter){console.log('fffffffffffff');checkFilter=false}
      if(this.VilleFilter!='' && this.MyIncidentList[f].ville==this.VilleFilter){console.log('fffffffffffff');checkFilter=false}
      if(checkFilter==true){this.ListeIncidentApresFiltre.push(this.MyIncidentList[f])}
    }*/
    
    /*this.MyIncidentList.forEach(element => {
      var checkFilter=true
      
    });*/
    
  }


  GetIMEIcode(){
    this.nativeStorage.getItem('IMEIcode').then((data)=>{this.IMEIcode=data['IMEIcode']});
  }

  getIncident(){
    this.IMEIcode='a260ba09-5fba-48d1-a4a9-19ecd3c8e4ff'
    this.incidentService.onGetIncident().then((value) => {
      value["pipe"](map((res => res))).subscribe(result => {
        result.forEach(element => {
          if(element['ime_declarant']==this.IMEIcode){
            element['date']=element['date'].split('.')[0]
            this.MyIncidentList.push(element)

            setTimeout(
              () => {
                this.incidentService.onGetAllPhotoBy().then((value) => {
                  value["pipe"](map((res => res))).subscribe(result => {
                    console.log('innnnnnnnnnnnnnnnnnnnnnnnn')
                    console.log(result)
                    result.forEach(element1 => {
                      if(element1['id_Incident']==element['id']){
                        this.ListImage.push(this.webview.convertFileSrc('data:image/jpeg;base64,'+element1['data']))
                      }
                      
                      console.log(this.ListImage)
                    });
                    })
                     
                });
              }, 1000
            );
            
 
          }
        }); 
        console.log(this.MyIncidentList)     
        })
    });
    //this.FiltreIncident()  

    /*this.incidentService.onGetAllPhotoBy().then((value) => {
      value["pipe"](map((res => res))).subscribe(result => {
        console.log('innnnnnnnnnnnnnnnnnnnnnnnn')
        console.log(result)
        result.forEach(element => {
          this.ListImage.push(this.webview.convertFileSrc('data:image/jpeg;base64,'+element['data']))
          console.log(this.ListImage)
        });
        })
         
    });*/
     
  }
  

  GetDetailonIncident(Mincident,index){
    this.router.navigate(['/incident-detail',{ Secteur: Mincident.secteur,Type:Mincident.type,Region:Mincident.region
    ,Province:Mincident.province,Ville:Mincident.ville,Etet_Validation:Mincident.etat_validatoin,
    Description:Mincident.description,Id_Incident:Mincident.id,MyPhoto:this.ListImage[index],
    IncidentLongitude:Mincident.longitude,IncidentLatitude:Mincident.latitude}])
    console.log(Mincident)
  }


  async presentModal() {
    /*const modal = await this.modalController.create({
      component: ModalFilterPage,
      cssClass: 'my-custom-class',
      componentProps: {MonRegion: 'Douglas',}
    });
    return await modal.present();*/

    this.modalController.create({
      component: ModalFilterPage,
      backdropDismiss: true, // <-- enable backdrop dismiss
      swipeToClose: true, // <-- enable swipe to close
      cssClass: 'my-custom-class',
      presentingElement: await this.modalController.getTop()
    }).then(modal => {
      modal.onWillDismiss().then(data => {
        console.log('rrrrrrrrrrrrrrrrrrrrrr');
        this.router.navigate(['/my-incidents'])
      });
      modal.present();
    });

  }

}
