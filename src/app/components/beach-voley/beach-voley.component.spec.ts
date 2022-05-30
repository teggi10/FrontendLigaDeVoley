import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BeachVoleyComponent } from './beach-voley.component';

describe('BeachVoleyComponent', () => {
  let component: BeachVoleyComponent;
  let fixture: ComponentFixture<BeachVoleyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BeachVoleyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BeachVoleyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
