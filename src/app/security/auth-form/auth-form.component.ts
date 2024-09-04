import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { userCredentials } from '../../interfaces/security';
import { ShowErrorsComponent } from '../../utils/show-errors/show-errors.component';
import { MaterialModuleModule } from '../../material-module/material-module.module';

@Component({
  selector: 'app-auth-form',
  standalone: true,
  imports: [ShowErrorsComponent, ReactiveFormsModule, MaterialModuleModule],
  templateUrl: './auth-form.component.html',
  styleUrl: './auth-form.component.scss'
})
export class AuthFormComponent implements OnInit {
  constructor(private formBuilder: FormBuilder) {

  }

  form!: FormGroup

  @Input()
  errors: string [] = [];

  @Input()
  action!: string;

  @Output()
  onSubmit: EventEmitter<userCredentials> = new EventEmitter<userCredentials>();
  
  ngOnInit(): void {
    this.form = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    })
  }

  getEmailErrorMessage() {
    let field = this.form.get('email')
    if(field?.hasError('required')) return 'El campo Email es requerido'
    if(field?.hasError('email')) return 'El Email no es válido'
    return '';
  }

}
