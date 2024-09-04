import { Component, OnInit } from '@angular/core';
import { ActorsFormComponent } from '../actors-form/actors-form.component';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MaterialModuleModule } from '../../material-module/material-module.module';
import { ActorCreation } from '../../interfaces/actor';
import { ActorsService } from '../../services/actors.service';
import { Router } from '@angular/router';
import { parseErrorsFromApi } from '../../helpers/mappers';

@Component({
  selector: 'app-create-actor',
  standalone: true,
  imports: [ActorsFormComponent , ReactiveFormsModule, MaterialModuleModule],
  templateUrl: './create-actor.component.html',
  styleUrl: './create-actor.component.scss'
})
export class CreateActorComponent implements OnInit{
  
  constructor(private formBuilder: FormBuilder, private actorsService: ActorsService, private router: Router) {
    this.form = this.formBuilder.group({
      name: ['', [Validators.required]],
      birthDate: ['', []]
    })
  }
  form: FormGroup;
  errors: string[]= [];

  ngOnInit(): void {
    
  }

  saveChanges(actor: ActorCreation) {
    this.actorsService.create(actor)
      .subscribe({
        next: () => {
          this.router.navigate(['/actores'])
        },
        error: (err) => {
          this.errors = parseErrorsFromApi(err)
        }
      })
  }
}
