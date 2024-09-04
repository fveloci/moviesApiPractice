import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink } from '@angular/router';
import { GenreService } from '../../services/genre.service';
import { GenreList } from '../../interfaces/genre';
import { MaterialModuleModule } from '../../material-module/material-module.module';
import { GenericListComponent } from '../../utils/generic-list/generic-list.component';
import { HttpResponse } from '@angular/common/http';
import { PageEvent } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../../utils/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-genres-index',
  standalone: true,
  imports: [RouterLink, MaterialModuleModule, GenericListComponent, ConfirmDialogComponent],
  templateUrl: './genres-index.component.html',
  styleUrl: './genres-index.component.scss'
})
export class GenresIndexComponent implements OnInit {
  constructor(private genreService: GenreService, private dialog: MatDialog) {

  }

  genres: GenreList[] = [];
  columnsToShow = ['id', 'name', 'actions']
  totalRegisters = 0;
  actualPage = 1;
  registersToShow = 10;

  ngOnInit(): void {
    this.loadRegisters(this.actualPage, this.registersToShow)
  }

  loadRegisters(page: number, elementsToShow: number) {
    this.genreService.getAll(page, elementsToShow)
      .subscribe({
        next: (response: HttpResponse<GenreList[]>) => {
          this.genres = response.body || []
          this.totalRegisters = Number(response.headers.get("totalRegistersQuantity"))
        },
        error: (error) => {
          console.error(error)
        }
      })
  }

  updatePagination(data: PageEvent) {
    this.actualPage = data.pageIndex + 1;
    this.registersToShow = data.pageSize;
    this.loadRegisters(this.actualPage, this.registersToShow)
  }

  delete(id: number) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '350px',
      data: '¿Estás seguro de que deseas borrar el registro?'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.genreService.delete(id)
          .subscribe({
            next: () => {
              this.loadRegisters(this.actualPage, this.registersToShow)
            },
            error: (error) => {
              console.error(error)
            }
          })
      }
    });
    
  }
}
