import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContactMakerComponent } from './contact-maker.component';

describe('ContactMakerComponent', () => {
  let component: ContactMakerComponent;
  let fixture: ComponentFixture<ContactMakerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ContactMakerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ContactMakerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
