import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CinemaFormComponent } from './cinema-form.component';

describe('CinemaFormComponent', () => {
  let component: CinemaFormComponent;
  let fixture: ComponentFixture<CinemaFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CinemaFormComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CinemaFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
