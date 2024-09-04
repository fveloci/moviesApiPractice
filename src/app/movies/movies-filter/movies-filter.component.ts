import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { MaterialModuleModule } from '../../material-module/material-module.module';
import { Location, NgFor, NgIf } from '@angular/common';
import { GenreList } from '../../interfaces/genre';
import { ListComponent } from '../list/list.component';
import { ActivatedRoute } from '@angular/router';
import { MovieView } from '../../interfaces/movie';
import { GenreService } from '../../services/genre.service';
import { MoviesService } from '../../services/movies.service';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-movies-filter',
  standalone: true,
  imports: [ReactiveFormsModule, MaterialModuleModule, NgFor, ListComponent, NgIf],
  templateUrl: './movies-filter.component.html',
  styleUrl: './movies-filter.component.scss'
})
export class MoviesFilterComponent implements OnInit {
  constructor(
    private formBuilder: FormBuilder, 
    private location: Location, 
    private activatedRoute: ActivatedRoute,
    private genreService: GenreService,
    private movieService: MoviesService
  ) {
    this.form = this.formBuilder.group({
      title: [''],
      genreId: [0],
      comingSoon: [false],
      onCinema: [false]
    })
  }

  genres: GenreList[] = []

  movies!: MovieView[]
  baseMovies = this.movies;

  form: FormGroup;

  actualPage: number = 1
  elementsToShow: number = 10
  elementsQuantity: number = 0

  ngOnInit(): void {
    this.genreService.getAll()
      .subscribe({
        next: (response) => {
          const genresResponse = response.body
          this.genres = genresResponse != null ? genresResponse : []

          this.readValuesFromURL()
          this.searchMovies(this.form.value)
          this.form.valueChanges.subscribe(values => {
            this.searchMovies(values)
            this.writeSearchParamsInURL()
          })
        },
        error: (err) => {
          console.log(err)
        } 
      })
  }

  private writeSearchParamsInURL() {    
    let queryStrings = []
    let formValues = this.form.value;

    if(formValues.title) {
      queryStrings.push(`title=${formValues.title}`)
    }
    if(formValues.genreId) queryStrings.push(`genreId=${formValues.genreId}`)
    if(formValues.comingSoon) queryStrings.push(`comingSoon=${formValues.comingSoon}`)
    if(formValues.onCinema) queryStrings.push(`onCinema=${formValues.onCinema}`)
    this.location.replaceState('peliculas/buscar', queryStrings.join('&'))
  }

  private readValuesFromURL() {
    this.activatedRoute.queryParams.subscribe(params => {
      let object: any = {}
      if(params['title']) {
        object.title = params['title']
      }
      if(params['genreId']) object.genreId = Number(params['genreId'])
      if(params['comingSoon']) object.comingSoon = params['comingSoon']
      if(params['onCinema']) object.onCinema = params['onCinema']

      this.form.patchValue(object)
    })
  }

  searchMovies(values: any) {
    values.page = this.actualPage
    values.recordsPerPage = this.elementsToShow
    this.movieService.filter(values).subscribe(response => {
      this.movies = response.body
      this.writeSearchParamsInURL()
      this.elementsQuantity = response.headers.get('totalRegistersQuantity')
    })
  }
  clear() {
    this.form.reset({
      title: '',
      genreId: 0,
      comingSoon: false,
      onCinema: false
    })
  }

  paginatorUpdate(data: PageEvent) {
    this.actualPage = data.pageIndex + 1;
    this.elementsToShow = data.pageSize;
    this.searchMovies(this.form.value)
  }
}
