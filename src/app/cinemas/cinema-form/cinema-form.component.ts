import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MaterialModuleModule } from '../../material-module/material-module.module';
import { NgIf } from '@angular/common';
import { CinemaCreation } from '../../interfaces/cinema';
import { MapComponent } from '../../utils/map/map.component';
import { Coordinate } from '../../interfaces/coordinate';
import { ShowErrorsComponent } from '../../utils/show-errors/show-errors.component';
import { icon } from 'leaflet';

@Component({
  selector: 'app-cinema-form',
  standalone: true,
  imports: [ReactiveFormsModule, MaterialModuleModule, NgIf, MapComponent, ShowErrorsComponent],
  templateUrl: './cinema-form.component.html',
  styleUrl: './cinema-form.component.scss'
})
export class CinemaFormComponent implements OnInit {

  constructor(private formBuilder: FormBuilder) {
    this.form = this.formBuilder.group({
      name: ['', [Validators.required]],
      latitude: [null, [Validators.required]],
      longitude: [null, [Validators.required]]
    })
  }

  form: FormGroup;

  @Input() 
  model: CinemaCreation = { name: '', latitude: -32.88999843295217, longitude: -68.84312152904296 }

  @Output()
  saveChanges: EventEmitter<CinemaCreation> = new EventEmitter<CinemaCreation>();

  @Input()
  errors: string[] = []

  initialCoordinate: Coordinate[] = []

  ngOnInit(): void {
    if (this.model !== undefined) {
      this.form.patchValue(this.model)
      this.initialCoordinate.push({ latitude: this.model.latitude, longitude: this.model.longitude })
    }
  }
  onSubmit() {
    this.saveChanges.emit(this.form.value)
  }

  selectedCoordinate(coordinate: Coordinate) {
    this.form.patchValue(coordinate)
  }
}
