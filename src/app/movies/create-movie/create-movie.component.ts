import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { Router, RouterLink } from '@angular/router';
import { MovieFormComponent } from '../movie-form/movie-form.component';
import { MovieCreation } from '../../interfaces/movie';
import { MoviesService } from '../../services/movies.service';
import { MultiSelector } from '../../interfaces/multi-selector';
import { MaterialModuleModule } from '../../material-module/material-module.module';

@Component({
  selector: 'app-create-movie',
  standalone: true,
  imports: [MatButtonModule, RouterLink, MovieFormComponent, MaterialModuleModule],
  templateUrl: './create-movie.component.html',
  styleUrl: './create-movie.component.scss'
})
export class CreateMovieComponent implements OnInit {

  constructor(private moviesServices: MoviesService, private router: Router) {

  }

  errors: string[] = []
  notSelectedGenres: MultiSelector[] = []
  notSelectedCinemas: MultiSelector[] = []

  ngOnInit(): void {
    this.moviesServices.postGet()
      .subscribe({
        next: (result) => {
          this.notSelectedGenres = result.genres.map(genre => {
            return <MultiSelector>{key: genre.id, value: genre.name}
          })
          this.notSelectedCinemas = result.cinemas.map(cinema => {
            return <MultiSelector>{key: cinema.id, value: cinema.name}
          })
        },
        error: (err) => {
          console.error(err)
        }
      })
  }

  saveChanges(movie: MovieCreation) {
    this.moviesServices.create(movie)
      .subscribe({
        next: (id: number) => {
          this.router.navigate(['/pelicula/'+ id])
        },
        error: (err) => {
          console.error(err)
        }
      })
  }
}
