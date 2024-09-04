import { GenreService } from './../../services/genre.service';
import { Component } from '@angular/core';
import { GenreFormComponent } from '../genre-form/genre-form.component';
import { GenreCreation, GenreList } from '../../interfaces/genre';
import { ActivatedRoute, Router } from '@angular/router';
import { MaterialModuleModule } from '../../material-module/material-module.module';
import { parseErrorsFromApi } from '../../helpers/mappers';

@Component({
  selector: 'app-edit-genre',
  standalone: true,
  imports: [GenreFormComponent, MaterialModuleModule],
  templateUrl: './edit-genre.component.html',
  styleUrl: './edit-genre.component.scss'
})
export class EditGenreComponent {
  model!: GenreList
  errors: string[] = []

  constructor(private router: Router, private genreService: GenreService, private activatedRoute: ActivatedRoute) {
    this.activatedRoute.params.subscribe(params => {
      this.genreService.getById(params['id'])
        .subscribe({
          next: (genre) => {
            this.model = genre
          },
          error: () => {
            this.router.navigate(['/generos'])
          }
        })
    })
  }

  saveChanges(genre: GenreCreation) {
    this.genreService.update(this.model.id, genre)
      .subscribe({
        next: () => {
          this.router.navigate(['/generos'])
        },
        error: (error) => {
          this.errors = parseErrorsFromApi(error)
        }
      })    
  }
}
