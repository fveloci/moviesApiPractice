import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ActorsFormComponent } from '../actors-form/actors-form.component';
import { ActorCreation, ActorList, ActorView } from '../../interfaces/actor';
import { ActorsService } from '../../services/actors.service';
import { parseErrorsFromApi } from '../../helpers/mappers';
import { MaterialModuleModule } from '../../material-module/material-module.module';

@Component({
  selector: 'app-edit-actor',
  standalone: true,
  imports: [ActorsFormComponent, MaterialModuleModule],
  templateUrl: './edit-actor.component.html',
  styleUrl: './edit-actor.component.scss'
})
export class EditActorComponent implements OnInit {
  model!: ActorList
  errors: string[] = []

  constructor(private router: Router, private actorService: ActorsService, private activatedRoute: ActivatedRoute) {
    this.activatedRoute.params.subscribe(params => {
      this.actorService.getById(params['id'])
        .subscribe({
          next: (actor) => {
            this.model = actor
          },
          error: () => {
            this.router.navigate(['/actores'])
          }
        })
    })
  }

  ngOnInit(): void {
    
  }

  saveChanges(actor: ActorCreation) {
    this.actorService.update(this.model.id, actor)
      .subscribe({
        next: () => {
          this.router.navigate(['/actores'])
        },
        error: (error) => {
          this.errors = parseErrorsFromApi(error)
        }
      })    
  }
}
