import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MaterialModuleModule } from '../../material-module/material-module.module';
import { ImageInputComponent } from '../../utils/image-input/image-input.component';
import { InputMarkdownComponent } from '../../utils/input-markdown/input-markdown.component';
import { RouterLink } from '@angular/router';
import { MovieCreation, MovieView } from '../../interfaces/movie';
import { MultiSelectorComponent } from '../../utils/multi-selector/multi-selector.component';
import { GenreList } from '../../interfaces/genre';
import { MultiSelector } from '../../interfaces/multi-selector';
import { ActorAutocompleteComponent } from '../../actors/actor-autocomplete/actor-autocomplete.component';
import { ActorMovie } from '../../interfaces/actor';
import { ShowErrorsComponent } from "../../utils/show-errors/show-errors.component";

@Component({
  selector: 'app-movie-form',
  standalone: true,
  imports: [MaterialModuleModule, ReactiveFormsModule, ImageInputComponent, InputMarkdownComponent, RouterLink, MultiSelectorComponent, ActorAutocompleteComponent, ShowErrorsComponent],
  templateUrl: './movie-form.component.html',
  styleUrl: './movie-form.component.scss'
})
export class MovieFormComponent implements OnInit {
  form: FormGroup;

  @Input()
  errors: string[] = []

  constructor(private formBuilder: FormBuilder) {
    this.form = this.formBuilder.group({
      title: ['', [Validators.required]],
      resume: ['', []],
      onCinema: ['',[]],
      trailer: '',
      releaseDate: '',
      poster: '',
      genreIds: '',
      cinemaIds: '',
      actors: ''
    })
  }

  @Input()
  notSelectedGenres: MultiSelector[] = []

  @Input()
  selectedGenres: MultiSelector[] = []

  @Input()
  selectedCinemas: MultiSelector[] = []

  @Input()
  notSelectedCinemas: MultiSelector[] = []

  @Input()
  model: MovieView = {} as MovieView;

  @Output()
  onSubmit: EventEmitter<MovieCreation> = new EventEmitter<MovieCreation>()

  @Input()
  selectedActors: ActorMovie[] = []

  changedImage: boolean = false

  ngOnInit() {
    if(this.model !== undefined) {
      this.form.patchValue(this.model)
    }
  }

  saveChanges() {
    const genreIds = this.selectedGenres.map(genre => genre.key)
    this.form.get('genreIds')?.setValue(genreIds)  

    const cinemaIds = this.selectedCinemas.map(cinema => cinema.key)
    this.form.get('cinemaIds')?.setValue(cinemaIds)

    const actors = this.selectedActors.map(val => {
      return { id: val.id, character: val.character }
    })
    this.form.get('actors')?.setValue(actors)

    if(!this.changedImage) {
      this.form.patchValue({ 'poster': null })
    }

    this.form.get('onCinema')?.setValue(this.form.get('onCinema')?.value === true ? 'true' : 'false')

    this.onSubmit.emit(this.form.value)
  }

  selectedFile(file: File) {
    this.form.get('poster')?.setValue(file)
    this.changedImage = true
  }

  markdownText(text: string) {
    this.form.get('resume')?.setValue(text)
  }
}
