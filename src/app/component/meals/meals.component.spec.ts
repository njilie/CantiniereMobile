import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { MealsComponent } from './meals.component';

describe('MealsComponent', () => {
  let component: MealsComponent;
  let fixture: ComponentFixture<MealsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MealsComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(MealsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
