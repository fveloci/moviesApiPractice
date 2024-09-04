import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RutaSecundariaComponent } from './ruta-secundaria.component';

describe('RutaSecundariaComponent', () => {
  let component: RutaSecundariaComponent;
  let fixture: ComponentFixture<RutaSecundariaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RutaSecundariaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RutaSecundariaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
