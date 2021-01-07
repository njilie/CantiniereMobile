import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { MealsOfMenuPage } from './meals-of-menu.page';

describe('MealsOfMenuPage', () => {
  let component: MealsOfMenuPage;
  let fixture: ComponentFixture<MealsOfMenuPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MealsOfMenuPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(MealsOfMenuPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
