import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LookWhatIDidComponent } from './look-what-i-did.component';

describe('LookWhatIDidComponent', () => {
  let component: LookWhatIDidComponent;
  let fixture: ComponentFixture<LookWhatIDidComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LookWhatIDidComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LookWhatIDidComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
