import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink } from '@angular/router';
import { MaterialModuleModule } from '../../material-module/material-module.module';
import { ConfirmDialogComponent } from '../../utils/confirm-dialog/confirm-dialog.component';
import { PageEvent } from '@angular/material/paginator';
import { HttpResponse } from '@angular/common/http';
import { CinemaList } from '../../interfaces/cinema';
import { MatDialog } from '@angular/material/dialog';
import { GenericListComponent } from '../../utils/generic-list/generic-list.component';
import { CinemaService } from '../../services/cinema.service';

@Component({
  selector: 'app-cinema-index',
  standalone: true,
  imports: [MatButtonModule, RouterLink, MaterialModuleModule, GenericListComponent],
  templateUrl: './cinema-index.component.html',
  styleUrl: './cinema-index.component.scss'
})
export class CinemaIndexComponent {
  constructor(private cinemaService: CinemaService, private dialog: MatDialog) {

  }

  cinemas: CinemaList[] = [];
  columnsToShow = ['id', 'name', 'actions']
  totalRegisters = 0;
  actualPage = 1;
  registersToShow = 10;

  ngOnInit(): void {
    this.loadRegisters(this.actualPage, this.registersToShow)
  }

  loadRegisters(page: number, elementsToShow: number) {
    this.cinemaService.getAll(page, elementsToShow)
      .subscribe({
        next: (response: HttpResponse<CinemaList[]>) => {
          this.cinemas = response.body || []
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
        this.cinemaService.delete(id)
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
