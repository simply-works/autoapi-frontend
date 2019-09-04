import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewTableDetailsComponent } from './view-table-details.component';

describe('ViewTableDetailsComponent', () => {
  let component: ViewTableDetailsComponent;
  let fixture: ComponentFixture<ViewTableDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewTableDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewTableDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
