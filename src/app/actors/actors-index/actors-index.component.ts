import { ActorsService } from './../../services/actors.service';
import { Component, OnInit } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ConfirmDialogComponent } from '../../utils/confirm-dialog/confirm-dialog.component';
import { PageEvent } from '@angular/material/paginator';
import { HttpResponse } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';
import { MaterialModuleModule } from '../../material-module/material-module.module';
import { GenericListComponent } from '../../utils/generic-list/generic-list.component';
import { ActorList, ActorView } from '../../interfaces/actor';

@Component({
  selector: 'app-actors-index',
  standalone: true,
  imports: [MatButton, RouterLink, MaterialModuleModule, GenericListComponent, ConfirmDialogComponent],
  templateUrl: './actors-index.component.html',
  styleUrl: './actors-index.component.scss'
})
export class ActorsIndexComponent {
  constructor(private actorsService: ActorsService, private dialog: MatDialog) {

  }

  actors: ActorView[] = [];
  columnsToShow = ['id', 'name', 'actions']
  totalRegisters = 0;
  actualPage = 1;
  registersToShow = 10;

  ngOnInit(): void {
    this.loadRegisters(this.actualPage, this.registersToShow)
  }

  loadRegisters(page: number, elementsToShow: number) {
    this.actorsService.getAll(page, elementsToShow)
      .subscribe({
        next: (response: HttpResponse<ActorList[]>) => {
          this.actors = response.body || []
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
        this.actorsService.delete(id)
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
