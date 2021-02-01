import { Component, Input, OnInit } from '@angular/core';
import { ServiceMap } from 'src/app/Service/MapService';
import { map } from 'rxjs/operators';
import { ModalController } from '@ionic/angular';
import { NativeStorage } from '@ionic-native/native-storage/ngx';
import { Router } from '@angular/router';
@Component({
  selector: 'app-modal-filter',
  templateUrl: './modal-filter.page.html',
  styleUrls: ['./modal-filter.page.scss'],
})
export class ModalFilterPage implements OnInit {
  MonSecteur:string;
  MonType:string;
  MyTypes=[]
  Secteur=['Incident routier','Incident corporel','Incident matériel','Incident de masse']
  Type1=['collision individuelle','collision multiple','collision à dommage corporel']
  Type2=['mort','suicide','blessure','éléctrocution','brulure de 3ème degré']
  Type3=['incendie','électrique','Destruction']
  Type4=['grève importante','inondation','séisme','tsunami','épidémie','tempête']
  NomsRegionFiltre:any=[];
  NomsProvinceFiltre:any=[];
  NomsVilleFiltre:any=[];

  FilterSecteur:boolean=false
  FilterType:boolean=false
  FilterRegion:boolean=false
  FilterProvince:boolean=false
  FilterVille:boolean=false
  IconDelete:boolean=false
  SaveValueSecteur:string;

  @Input() MonRegion: string;
  constructor(private router: Router,private nativeStorage: NativeStorage,public modalController: ModalController,private MapService:ServiceMap,) { }

  ngOnInit() {
    this.RemplirAttributFiltre()
    this.InitialiserFilter()
  }

  InitialiserFilter(){
    this.nativeStorage.getItem('secteur').then(
    data => {document.getElementsByClassName('FilterSecteur')[0]["value"]=data["secteur"];this.ChangeType(data["secteur"]);this.SaveValueSecteur=data["secteur"]},error => console.error(error));

    this.nativeStorage.getItem('type').then(
    data => {document.getElementsByClassName('FilterType')[0]["value"]=data["type"]},error => console.error(error));

    this.nativeStorage.getItem('region').then(
    data => {document.getElementsByClassName('FilterRegion')[0]["value"]=data["region"]},error => console.error(error));

    this.nativeStorage.getItem('province').then(
    data => {document.getElementsByClassName('FilterProvince')[0]["value"]=data["province"]},error => console.error(error));

    this.nativeStorage.getItem('ville').then(
    data => {document.getElementsByClassName('FilterVille')[0]["value"]=data["ville"]},error => console.error(error));
  }

  deleteFilterSecteur(){
    console.log("itsvvvvvvvvvvvv");
    this.nativeStorage.setItem('secteur', {secteur: ''})
    .then(
      () => {document.getElementsByClassName('FilterSecteur')[0]["value"]=""},
      error => console.error('Error storing item', error)
    );
  }

  deleteFilterType(){
    console.log("itsvvvvvvvvvvvv");
    this.nativeStorage.setItem('type', {type:''})
    .then(
      () => {document.getElementsByClassName('FilterType')[0]["value"]=""},
      error => console.error('Error storing item', error)
    );
  }

  deleteFilterRegion(){
    this.nativeStorage.setItem('region', {region:''})
    .then(
      () =>{document.getElementsByClassName('FilterRegion')[0]["value"]=""},
      error => console.error('Error storing item', error)
    );
  }

  deleteFilterProvince(){
    this.nativeStorage.setItem('province', {province: ''})
    .then(
      () => {document.getElementsByClassName('FilterProvince')[0]["value"]=""},
      error => console.error('Error storing item', error)
    );
  }

  deleteFilterVille(){
    this.nativeStorage.setItem('ville', {ville:''})
    .then(
      () =>{document.getElementsByClassName('FilterVille')[0]["value"]=""},
      error => console.error('Error storing item', error)
    );
  }
  

  DeleteFilter(){
    this.FilterSecteur=true
    this.FilterType=true
    this.FilterRegion=true
    this.FilterProvince=true
    this.FilterVille=true
    this.IconDelete=true
  }
  

  SaveFilterSecteur(secteur){
    this.nativeStorage.setItem('secteur', {secteur: secteur})
    .then(
      () => console.log(secteur),
      error => console.error('Error storing item', error)
    );
  }

  SaveFilterType(type){
    this.nativeStorage.setItem('type', {type:type})
    .then(
      () => console.log(type),
      error => console.error('Error storing item', error)
    );
  }

  SaveFilterProvince(province){
    this.nativeStorage.setItem('province', {province: province})
    .then(
      () => console.log(province),
      error => console.error('Error storing item', error)
    );
  }

  SaveFilterVille(ville){
    this.nativeStorage.setItem('ville', {ville:ville})
    .then(
      () => console.log(ville),
      error => console.error('Error storing item', error)
    );
  }

  SaveFilterRegion(region){
    this.nativeStorage.setItem('region', {region: region})
    .then(
      () => console.log(region),
      error => console.error('Error storing item', error)
    );
  }

  public closeModal() {
    this.modalController.dismiss({
      'dismissed': true
    });
  }

  ChangeType(secteur){
    if(secteur==null){secteur=this.SaveValueSecteur}
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


  

  RemplirAttributFiltre(){
    this.MapService.RetournerRegions().then((value) => {
      value["pipe"](map((res => res))).subscribe(result => {
        result.features.forEach(element => {
          if(element.properties.Nom_Region.length>1){
            this.NomsRegionFiltre.push(element.properties.Nom_Region)
          }
        });
        })
    });
    this.MapService.RetournerProvinces().then((value) => {
      value["pipe"](map((res => res))).subscribe(result => {
        result.features.forEach(element => {
          if(element.properties.Nom_Provin.length>1){
            this.NomsProvinceFiltre.push(element.properties.Nom_Provin)
          }
        });
        })
    });
    this.MapService.RetournerVille().then((value) => {
      value["pipe"](map((res => res))).subscribe(result => {
        //console.log(result)
        result.features.forEach(element => {
          if(element.properties.NOM.length>1){
            this.NomsVilleFiltre.push(element.properties.NOM)
          }
          
        });
        })
    });
  }
}
