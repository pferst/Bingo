import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KickoutDialogComponent } from './kickout-dialog.component';

describe('KickoutDialogComponent', () => {
  let component: KickoutDialogComponent;
  let fixture: ComponentFixture<KickoutDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ KickoutDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(KickoutDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
