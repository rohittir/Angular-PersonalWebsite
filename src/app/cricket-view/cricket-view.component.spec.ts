import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CricketViewComponent } from './cricket-view.component';

describe('CricketViewComponent', () => {
  let component: CricketViewComponent;
  let fixture: ComponentFixture<CricketViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CricketViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CricketViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
