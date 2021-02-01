import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AddIncidentsPage } from './add-incidents.page';

describe('AddIncidentsPage', () => {
  let component: AddIncidentsPage;
  let fixture: ComponentFixture<AddIncidentsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddIncidentsPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AddIncidentsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
