import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { MaterialModuleModule } from '../../material-module/material-module.module';
import { NgIf } from '@angular/common';
import { firstCharacterUppercase } from '../../validators/toUpperFirst';
import { GenreFormComponent } from '../genre-form/genre-form.component';
import { GenreCreation } from '../../interfaces/genre';
import { GenreService } from '../../services/genre.service';
import { parseErrorsFromApi } from '../../helpers/mappers';

@Component({
  selector: 'app-create-gender',
  standalone: true,
  imports: [ReactiveFormsModule, MaterialModuleModule, NgIf, RouterLink, GenreFormComponent],
  templateUrl: './create-gender.component.html',
  styleUrl: './create-gender.component.scss'
})
export class CreateGenderComponent {
  
  errors: string[] = [];

  constructor(private router: Router, private genreService: GenreService) {
  }  

  ngOnInit(): void {

  }

  saveChanges(genre: GenreCreation) {
    this.genreService.create(genre).subscribe({
      next: () => {
        this.router.navigate(['/generos'])
      },
      error: (error) => {
        this.errors = parseErrorsFromApi(error)
      }
    })    
  }
}
