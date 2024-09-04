import { DatePipe, NgFor } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { GenericListComponent } from '../../utils/generic-list/generic-list.component';
import { MaterialModuleModule } from '../../material-module/material-module.module';
import { RouterLink } from '@angular/router';
import { MovieView } from '../../interfaces/movie';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../../utils/confirm-dialog/confirm-dialog.component';
import { MoviesService } from '../../services/movies.service';
import { AuthorizedComponent } from "../../security/authorized/authorized.component";

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [DatePipe, GenericListComponent, NgFor, MaterialModuleModule, RouterLink, AuthorizedComponent],
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss'
})
export class ListComponent {
  constructor(private dialog: MatDialog, private movieService: MoviesService) {

  }

  @Input() movies: MovieView[] = [];
  @Input() title: string = '';
  @Output() deleted: EventEmitter<void> = new EventEmitter<void>();

  ngOnInit(): void {
    
  }

  remove(index: number) {
    this.movies.splice(index, 1);
  }

  delete(id: number) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '350px',
      data: '¿Estás seguro de que deseas borrar el registro?'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.movieService.delete(id)
          .subscribe({
            next: () => {
              this.deleted.emit()
            },
            error: (error) => {
              console.error(error)
            }
          })
      }
    });
    
  }
}
