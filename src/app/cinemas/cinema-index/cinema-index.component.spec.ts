import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CinemaIndexComponent } from './cinema-index.component';

describe('CinemaIndexComponent', () => {
  let component: CinemaIndexComponent;
  let fixture: ComponentFixture<CinemaIndexComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CinemaIndexComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CinemaIndexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
