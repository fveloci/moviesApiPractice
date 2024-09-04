import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MaterialModuleModule } from '../../material-module/material-module.module';
import { NgFor, NgIf } from '@angular/common';
import { ActorCreation, ActorView } from '../../interfaces/actor';
import { ImageInputComponent } from '../../utils/image-input/image-input.component';
import { InputMarkdownComponent } from '../../utils/input-markdown/input-markdown.component';
import { ShowErrorsComponent } from '../../utils/show-errors/show-errors.component';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-actors-form',
  standalone: true,
  imports: [RouterLink, ReactiveFormsModule, MaterialModuleModule, NgIf, NgFor, ShowErrorsComponent, ImageInputComponent, InputMarkdownComponent],
  templateUrl: './actors-form.component.html',
  styleUrl: './actors-form.component.scss'
})
export class ActorsFormComponent implements OnInit {
    
  constructor(private formBuilder: FormBuilder) {
    this.form = this.formBuilder.group({
      name: ['', [Validators.required]],
      birthDate: ['', []],
      photo: '',
      biography: ''
    })
  }
  form: FormGroup;
  changedImage = false;

  @Output() onSubmit: EventEmitter<ActorCreation> = new EventEmitter<ActorCreation>();
  @Input() model: ActorView = { name: '', birthDate: new Date(), photo: '', biography: '' }
  @Input() errors: string[] = []

  ngOnInit(): void {
    if(this.model !== undefined) {
      this.form.patchValue(this.model)
    }
  }

  submitForm() {
    if(!this.changedImage) {
      this.form.patchValue({'photo': null})
    }    
    this.onSubmit.emit(this.form.value)
  }

  selectedFile(file: File) {
    this.changedImage = true
    this.form.get('photo')?.setValue(file);
  }

  markdownChange(text: string) {
    this.form.get('biography')?.setValue(text);
  }
}
