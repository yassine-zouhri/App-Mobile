import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { IncidentsOnMapPage } from './incidents-on-map.page';

describe('IncidentsOnMapPage', () => {
  let component: IncidentsOnMapPage;
  let fixture: ComponentFixture<IncidentsOnMapPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IncidentsOnMapPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(IncidentsOnMapPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
