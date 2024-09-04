import { Component, OnInit } from '@angular/core';
import { CinemaFormComponent } from '../cinema-form/cinema-form.component';
import { CinemaCreation } from '../../interfaces/cinema';
import { Router } from '@angular/router';
import { parseErrorsFromApi } from '../../helpers/mappers';
import { CinemaService } from '../../services/cinema.service';

@Component({
  selector: 'app-create-cinema',
  standalone: true,
  imports: [CinemaFormComponent],
  templateUrl: './create-cinema.component.html',
  styleUrl: './create-cinema.component.scss'
})
export class CreateCinemaComponent {

  errors: string[] = []

  constructor(private router: Router, private cinemaService: CinemaService) {

  }
  
  saveChanges(cinema: CinemaCreation) {
    this.cinemaService.create(cinema).subscribe({
      next: () => {
        this.router.navigate(['/cines'])
      },
      error: (error) => {
        this.errors = parseErrorsFromApi(error)
      }
    })
  }
}
