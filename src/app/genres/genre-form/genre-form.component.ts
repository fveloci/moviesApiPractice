import { GenreCreation } from './../../interfaces/genre';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { firstCharacterUppercase } from '../../validators/toUpperFirst';
import { MaterialModuleModule } from '../../material-module/material-module.module';
import { NgIf } from '@angular/common';
import { ShowErrorsComponent } from '../../utils/show-errors/show-errors.component';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-genre-form',
  standalone: true,
  imports: [MaterialModuleModule, ReactiveFormsModule, NgIf, ShowErrorsComponent, RouterLink],
  templateUrl: './genre-form.component.html',
  styleUrl: './genre-form.component.scss'
})
export class GenreFormComponent implements OnInit {
  form: FormGroup;

  @Output()
  onSubmit: EventEmitter<GenreCreation> = new EventEmitter<GenreCreation>();

  @Input()
  model: GenreCreation = { name: '' }

  @Input()
  errors: string[] = []

  constructor(private formBuilder: FormBuilder) {
    this.form = this.formBuilder.group({
      name: ['', [Validators.maxLength(10), Validators.required, firstCharacterUppercase()]]
    })
  }  

  ngOnInit(): void {
    if(this.model !== undefined) {
      this.form.patchValue(this.model)
    }
  }

  saveChanges() {
    this.onSubmit.emit(this.form.value);
  }

  getInputError(input: string) {
    const formInput = this.form.get(input)
    if(formInput?.hasError('required')) return 'El campo es requerido'
    if(formInput?.hasError('firstCharacterUppercase')) return formInput.getError('firstCharacterUppercase').message
    return ''
  }
}
