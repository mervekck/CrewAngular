import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrewCeritificatesPopupComponent } from './crew-ceritificates-popup.component';

describe('CrewCeritificatesPopupComponent', () => {
  let component: CrewCeritificatesPopupComponent;
  let fixture: ComponentFixture<CrewCeritificatesPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CrewCeritificatesPopupComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CrewCeritificatesPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
