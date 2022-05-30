import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KickboardComponent } from './kickboard.component';

describe('KickboardComponent', () => {
  let component: KickboardComponent;
  let fixture: ComponentFixture<KickboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ KickboardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(KickboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
