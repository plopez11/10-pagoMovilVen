import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { Page01Page } from './page01.page';

describe('Page01Page', () => {
  let component: Page01Page;
  let fixture: ComponentFixture<Page01Page>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Page01Page ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(Page01Page);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
