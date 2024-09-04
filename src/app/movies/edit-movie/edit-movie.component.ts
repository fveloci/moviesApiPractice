import { Component, OnInit } from '@angular/core';
import { MovieFormComponent } from '../movie-form/movie-form.component';
import { MovieCreation, MovieView } from '../../interfaces/movie';
import { MaterialModuleModule } from '../../material-module/material-module.module';
import { MoviesService } from '../../services/movies.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MultiSelector } from '../../interfaces/multi-selector';
import { ActorMovie } from '../../interfaces/actor';

@Component({
  selector: 'app-edit-movie',
  standalone: true,
  imports: [MovieFormComponent, MaterialModuleModule],
  templateUrl: './edit-movie.component.html',
  styleUrl: './edit-movie.component.scss'
})
export class EditMovieComponent implements OnInit {
  model!: MovieView;
  notSelectedGenres: MultiSelector[] = []
  notSelectedCinemas: MultiSelector[] = []
  selectedGenres: MultiSelector[] = []
  selectedCinemas: MultiSelector[] = []
  selectedActors: ActorMovie[] = []

  constructor(private moviesServices: MoviesService, private activatedRoute: ActivatedRoute, private router: Router) {

  }

  ngOnInit() {
    this.activatedRoute.params.subscribe(params => {
      this.moviesServices.putGet(params['id'])
        .subscribe(moviePutGet => {
          this.model = moviePutGet.movie

          this.notSelectedGenres = moviePutGet.notSelectedGenres.map(genre => {
            return <MultiSelector>{key: genre.id, value: genre.name}
          })
          this.selectedGenres = moviePutGet.selectedGenres.map(genre => {
            return <MultiSelector>{key: genre.id, value: genre.name}
          })

          this.notSelectedCinemas = moviePutGet.notSelectedCinemas.map(cinema => {
            return <MultiSelector>{key: cinema.id, value: cinema.name}
          })
          this.selectedCinemas = moviePutGet.selectedCinemas.map(cinema => {
            return <MultiSelector>{key: cinema.id, value: cinema.name}
          })

          this.selectedActors = moviePutGet.actors
        })
    })
  }

  saveChanges(movie: MovieCreation) {
    this.moviesServices.update(this.model.id, movie)
      .subscribe(({
        next: () => {
          this.router.navigate(['/pelicula/' + this.model.id])
        },
        error: (err: any) => {
          console.log(err)
        }
      }))
  }
}
