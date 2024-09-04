import { Component } from '@angular/core';
import { CinemaFormComponent } from '../cinema-form/cinema-form.component';
import { CinemaCreation, CinemaList, CinemaView } from '../../interfaces/cinema';
import { ActivatedRoute, Router } from '@angular/router';
import { CinemaService } from '../../services/cinema.service';
import { parseErrorsFromApi } from '../../helpers/mappers';
import { MaterialModuleModule } from '../../material-module/material-module.module';

@Component({
  selector: 'app-edit-cinema',
  standalone: true,
  imports: [CinemaFormComponent, MaterialModuleModule],
  templateUrl: './edit-cinema.component.html',
  styleUrl: './edit-cinema.component.scss'
})
export class EditCinemaComponent {
  model!: CinemaList
  errors: string[] = []

  constructor(private router: Router, private cinemaService: CinemaService, private activatedRoute: ActivatedRoute) {
    this.activatedRoute.params.subscribe(params => {
      this.cinemaService.getById(params['id'])
        .subscribe({
          next: (cinema) => {
            this.model = cinema
          },
          error: () => {
            this.router.navigate(['/cines'])
          }
        })
    })
  }

  saveChanges(cinema: CinemaCreation) {
    this.cinemaService.update(this.model.id, cinema)
      .subscribe({
        next: () => {
          this.router.navigate(['/cines'])
        },
        error: (error) => {
          this.errors = parseErrorsFromApi(error)
        }
      })    
  }

}
