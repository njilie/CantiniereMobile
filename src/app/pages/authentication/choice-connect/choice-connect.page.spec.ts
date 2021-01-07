import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ChoiceConnectPage } from './choice-connect.page';

describe('ChoiceConnectPage', () => {
  let component: ChoiceConnectPage;
  let fixture: ComponentFixture<ChoiceConnectPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChoiceConnectPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ChoiceConnectPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
