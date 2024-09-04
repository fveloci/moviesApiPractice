import { Component, OnInit } from '@angular/core';
import { GenericListComponent } from "../../utils/generic-list/generic-list.component";
import { MaterialModuleModule } from '../../material-module/material-module.module';
import { RouterLink } from '@angular/router';
import { User } from '../../interfaces/security';
import { SecurityService } from '../../services/security.service';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../../utils/confirm-dialog/confirm-dialog.component';
import { PageEvent } from '@angular/material/paginator';
import { HttpResponse } from '@angular/common/http';

@Component({
  selector: 'app-users-index',
  standalone: true,
  imports: [GenericListComponent, MaterialModuleModule, RouterLink],
  templateUrl: './users-index.component.html',
  styleUrl: './users-index.component.scss'
})
export class UsersIndexComponent implements OnInit {

  constructor(private securityService: SecurityService, private dialog: MatDialog) {

  }
  ngOnInit(): void {
    this.loadRegisters(this.actualPage, this.registersToShow)
  }

  users: User[] = []
  columnsToShow = ['email', 'actions']
  totalRegisters = 0;
  actualPage = 1;
  registersToShow = 10;

  makeAdmin(userId: string) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '350px',
      data: '¿Estás seguro de que deseas borrar el registro?'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.securityService.makeAdmin(userId)
          .subscribe({
            next: () => {
              alert('Operación exitosa')
            },
            error: (error: any) => {
              console.error(error)
            }
          })
      }
    });
  }

  loadRegisters(page: number, elementsToShow: number) {
    this.securityService.getUsers(page, elementsToShow)
      .subscribe({
        next: (response: HttpResponse<User[]>) => {
          this.users = response.body || []
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

  removeAdmin(userId: string) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '350px',
      data: '¿Estás seguro de que deseas borrar el registro?'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.securityService.removeAdmin(userId)
          .subscribe({
            next: () => {
              alert('Admin desasignado')
            },
            error: (error) => {
              console.error(error)
            }
          })
      }
    });
  }
}
