import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AllIncidentsPage } from './all-incidents.page';

describe('AllIncidentsPage', () => {
  let component: AllIncidentsPage;
  let fixture: ComponentFixture<AllIncidentsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AllIncidentsPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AllIncidentsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
