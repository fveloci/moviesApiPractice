import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowErrorsComponent } from './show-errors.component';

describe('ShowErrorsComponent', () => {
  let component: ShowErrorsComponent;
  let fixture: ComponentFixture<ShowErrorsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ShowErrorsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ShowErrorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
