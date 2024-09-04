import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GenresIndexComponent } from './genres-index.component';

describe('GenresIndexComponent', () => {
  let component: GenresIndexComponent;
  let fixture: ComponentFixture<GenresIndexComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GenresIndexComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GenresIndexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
