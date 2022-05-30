import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LigaInternaComponent } from './liga-interna.component';

describe('LigaInternaComponent', () => {
  let component: LigaInternaComponent;
  let fixture: ComponentFixture<LigaInternaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LigaInternaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LigaInternaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
