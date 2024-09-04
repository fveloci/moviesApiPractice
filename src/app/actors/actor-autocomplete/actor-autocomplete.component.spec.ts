import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActorAutocompleteComponent } from './actor-autocomplete.component';

describe('ActorAutocompleteComponent', () => {
  let component: ActorAutocompleteComponent;
  let fixture: ComponentFixture<ActorAutocompleteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ActorAutocompleteComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ActorAutocompleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
