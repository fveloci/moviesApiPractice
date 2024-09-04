import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateGenderComponent } from './create-gender.component';

describe('CreateGenderComponent', () => {
  let component: CreateGenderComponent;
  let fixture: ComponentFixture<CreateGenderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateGenderComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CreateGenderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
