import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteDatabaseComponent } from './delete-database.component';

describe('DeleteDatabaseComponent', () => {
  let component: DeleteDatabaseComponent;
  let fixture: ComponentFixture<DeleteDatabaseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeleteDatabaseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteDatabaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
